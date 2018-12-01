/* eslint-disable no-console */

if (console.groupCollapsed && console.group)
  console.group = console.groupCollapsed

// Disable debug
try {
  if (window.localStorage.getItem('debug_opt') == 1) {
    window.localStorage.setItem('debug', 'app*,game*')
    // window.localStorage.setItem('debug', 'app*,pt*')
  } else {
    window.localStorage.removeItem('debug')
  }
} catch (e) {
  /* eslint-disable */
}
