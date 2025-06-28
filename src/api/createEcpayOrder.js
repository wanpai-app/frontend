import axios from '@/utils/axiosInstance'
import { showToast } from '@/utils/toast'

export async function createEcpayOrder(payload) {
  try {
    const response = await axios.post('/create-order', payload)

    if (response.data && response.data.includes('<form id="_form_aiochk"')) {
      const div = document.createElement('div')
      div.innerHTML = response.data
      document.body.appendChild(div)

      const form = document.getElementById('_form_aiochk')
      if (form) {
        form.submit()
        return { success: true }
      } else {
        showToast({
          severity: 'error',
          summary: '警告',
          detail: '結帳失敗：無法找到綠界表單。',
        })

        return { success: false, message: '結帳失敗：無法找到綠界表單。' }
      }
    } else {
      showToast({
        severity: 'error',
        summary: '警告',
        detail: '結帳失敗：後端回應格式不正確。',
      })

      return { success: false, message: '結帳失敗：後端回應格式不正確。' }
    }
  } catch {
    showToast({
      severity: 'error',
      summary: '警告',
      detail: '結帳失敗，請稍後再試。',
    })

    return { success: false, message: '結帳失敗，請稍後再試。' }
  }
}
