import { formatCurrency } from '~/server/api/utils/currency.js'
import { getAgencies } from '~/server/api/agenciesLegacy.js'

const paymentMethods = {
  1: 'Credit Card',
  30: 'Transfer',
}

const orderStatus = {
  1: 'Reserved',
  2: 'Cancelled',
  3: 'Booked',
  4: 'Operated',
  5: 'Requested',
  6: 'No Show',
  7: 'Audited',
  9: 'Modified',
  10: 'Annulled',
  11: 'Blocked',
}

const productTypes = {
  1: 'hotel',
  2: 'experience',
  3: 'transfer',
}

export default defineEventHandler(async (event) => {
  const agencies = await getAgencies(event)

  const config = useRuntimeConfig(event)
  const query = getQuery(event)

  const allowedAgency = agencies.find(agency => agency.id === Number(query.agency_id))
  if (!allowedAgency) {
    console.log('Suspicious activity: Access to unauthorized agency')
    return new Response('Unauthorized', { status: 401 })
  }

  let params = {
    'BookingId': query.id,
    'AgencyId': query.agency_id,
    'StartBookerDate': query.reservation_start,
    'EndBookerDate': query.reservation_end,
    'StartOperationDate': query.operation_start,
    'EndOperationDate': query.operation_end,
    'Name': query.name,
    'Email': query.email,
    'ProductType': query.product_type,
    'OrderStatusId': query.status,
    'AgentId': query.agent_id,
    'PageSize': query.limit,
    'PageNumber': query.page,
    'PaymentMethodId': query.payment_method,
    'PaymentStatusId': query.payment_status,
    'IsPaid': query.is_paid,
    'IsConfirmed': query.is_confirmed,
    'CustomerName': query.customer_name,
  }

  params = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined))

  const data = await $fetch('Reservation/Book/GetReservationsPaged', {
    baseURL: config.bookUrl,
    params
  })

  const reservations = data.items.map((agency) => {
    const currencyCode = agency.currencyId === 1 ? 'USD' : 'MXN'
    const exchangeRate = parseFloat(agency.currencyExchangeRate) || 1
    const commission = parseFloat(agency.agentCommission) || 0
    const total = parseFloat(agency.totalSale) || 0
    const paid = parseFloat(agency.totalPaid) || 0
    const pending = parseFloat(agency.balance) || 0
    const confirmationPending = agency.totalServices - agency.totalConfirmed

    return {
      id: agency.bookingId,
      date: agency.orderDate,
      operation_date: agency.operationDate,
      customer_name: agency.customerName,
      customer_email: agency.customerEmail,
      currency_code: currencyCode,
      commission: formatCurrency(commission, exchangeRate, currencyCode),
      total: formatCurrency(total, exchangeRate, currencyCode),
      paid: formatCurrency(paid, exchangeRate, currencyCode),
      pending: formatCurrency(pending, exchangeRate, currencyCode),
      payment_status: pending === 0 ? 1 : 0,
      total_services: agency.totalServices,
      confirmed_services: agency.totalConfirmed,
      confirmed_services_text: `${agency.totalConfirmed} of ${agency.totalServices}`,
      agent_name: agency.agentName || '',
      product_type: productTypes[agency.productTypeId],
      status: orderStatus[agency.orderStatusId],
      confirm_status: confirmationPending === 0 ? 1 : 0,
      payment_method: paymentMethods[agency.paymentmethodId]
    }
  })

  return { reservations, total: data.totalCount }
})
