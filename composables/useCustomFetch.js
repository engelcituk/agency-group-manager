export default function (endpoint, options = {}) {
  return  useLazyFetch(endpoint, {
    ...options,
    server: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    },
    timeout: 45000
  })
}
