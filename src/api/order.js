import axios from '@/utils/axiosInstance'

const fetchOrders = async (filters = {}) => {
  const res = await axios.get('/orders', {
    params: filters,
  })
  return res.data
}

const fetchOrderDetail = async (orderId) => {
  const res = await axios.get(`/orders/${orderId}`)
  return res.data
}

const createOrder = async (orderData) => {
  const res = await axios.post('/orders', orderData)
  return res.data
}

const updateOrder = async (orderId, updateData) => {
  const res = await axios.put(`/orders/${orderId}`, updateData)
  return res.data
}

const deleteOrder = async (orderId) => {
  const res = await axios.delete(`/orders/${orderId}`)
  return res.data
}

const fetchAllOrders = async (status = '') => {
  const res = await axios.get('/admin/orders', {
    params: status ? { status } : {},
  })
  return res.data
}

const applyOrderReturn = async (orderId, returnData) => {
  const res = await axios.post(`/orders/${orderId}/return`, returnData)
  return res.data
}

const calculateOrdersWithTotal = (orders) => {
  return orders.map((order) => {
    const items = order.items || []
    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    )
    return { ...order, total }
  })
}

export {
  fetchOrders,
  fetchOrderDetail,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
  applyOrderReturn,
  calculateOrdersWithTotal,
}
