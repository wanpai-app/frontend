const TOAST_LIFE = 2000

let toastInstance = null

function setGlobalToast(toast) {
  toastInstance = toast
}

function showToast({
  severity = 'info',
  summary = '',
  detail = '',
  position = 'top-right',
}) {
  toastInstance.add({
    severity,
    summary,
    detail,
    life: TOAST_LIFE,
    position,
  })
}

export { TOAST_LIFE, setGlobalToast, showToast }
