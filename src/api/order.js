// src/api/order.js
import axios from 'axios'

// 查詢訂單列表（可帶條件）
export async function fetchOrders(filters = {}) {
  const res = await axios.get('/api/orders', { params: filters })
  return res.data
}

// 查詢單一訂單（含明細）
export async function fetchOrderDetail(orderId) {
  const res = await axios.get(`/api/orders/${orderId}`)
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
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    return { ...order, total }
  })
}
