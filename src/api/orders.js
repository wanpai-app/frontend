import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// 查詢訂單列表（可帶條件）

export async function fetchOrders(filters = {}) {
  const authStore = useAuthStore()
  const token = authStore.token

  const res = await axios.get('/api/orders', {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export async function fetchOrderDetail(orderId) {
  const authStore = useAuthStore()
  const token = authStore.token

  const res = await axios.get(`/api/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

// 建立新訂單
export async function createOrder(orderData) {
  // orderData 結構範例：
  // {
  //   recipientName, recipientPhone, shippingAddress,
  //   items: [{ productId, productName, productImage, price, quantity, subtotal }, ...]
  // }
  const res = await axios.post('/api/orders', orderData)
  return res.data
}

// 更新訂單狀態（如出貨、取消）
export async function updateOrder(orderId, updateData) {
  const res = await axios.put(`/api/orders/${orderId}`, updateData)
  return res.data
}

// 軟刪除訂單
export async function deleteOrder(orderId) {
  const res = await axios.delete(`/api/orders/${orderId}`)
  return res.data
}

export function calculateOrdersWithTotal(orders) {
  return orders.map((order) => {
    const items = order.items || [] // 如果沒有 items 就給空陣列
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    return { ...order, total }
  })
}
