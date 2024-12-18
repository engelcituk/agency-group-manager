import { createGlobalState, useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export default createGlobalState(() => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')
  const showSidebar = breakpoints.greaterOrEqual('lg')

  return { isMobile, showSidebar }
})
