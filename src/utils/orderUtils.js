/**
 * 從訂單編號中提取時間戳
 * @param {string} orderNumber - 訂單編號 (格式: ORDER-時間戳-隨機字串)
 * @returns {number} 時間戳，如果無法解析則返回 0
 */
export const getOrderTimestamp = (orderNumber) => {
  const match = orderNumber.match(/ORDER-(\d+)-/)
  return match ? parseInt(match[1]) : 0
}

/**
 * 按訂單編號中的時間戳進行降冪排序
 * @param {Array} orders - 訂單陣列
 * @returns {Array} 排序後的訂單陣列（最新的在前面）
 */
export const sortOrdersByTimestamp = (orders) => {
  return orders.sort(
    (a, b) =>
      getOrderTimestamp(b.orderNumber) - getOrderTimestamp(a.orderNumber)
  )
}
