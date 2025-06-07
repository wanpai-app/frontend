import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
  }),
  getters: {
    totalQty: (s) => s.items.reduce((a, b) => a + b.qty, 0),
    totalPrice: (s) => s.items.reduce((a, b) => a + b.qty * b.price, 0),
  },
  actions: {
    add(product) {
      const e = this.items.find((i) => i.id === product.id)
      if (e) e.qty++
      else this.items.push({ ...product, qty: 1 })
      this.saveToLocalStorage()
    },
    updateQty(id, qty) {
      const i = this.items.find((x) => x.id === id)
      if (i) i.qty = qty < 1 ? 1 : qty
      this.saveToLocalStorage()
    },
    remove(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.saveToLocalStorage()
    },
    clear() {
      this.items = []
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
  },
})
