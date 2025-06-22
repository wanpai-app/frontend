import axios from '@/utils/axiosInstance'

export async function fetchOrders(filters = {}) {
  const res = await axios.get('/orders', {
    params: filters,
  })
  return res.data
}

export async function fetchOrderDetail(orderId) {
  const res = await axios.get(`/orders/${orderId}`)
  return res.data
}

export async function createOrder(orderData) {
  const res = await axios.post('/orders', orderData)
  return res.data
}

export async function updateOrder(orderId, updateData) {
  const res = await axios.put(`/orders/${orderId}`, updateData)
  return res.data
}

export async function deleteOrder(orderId) {
  const res = await axios.delete(`/orders/${orderId}`)
  return res.data
}

export function calculateOrdersWithTotal(orders) {
  return orders.map((order) => {
    const items = order.items || []
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    return { ...order, total }
  })
}
