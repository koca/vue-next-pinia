<template>
  <div id="app">
    <img src="./logo.png" />
    <h1>Hello Vue 3 and Pinia!</h1>

    <h2>Hello {{ user.state.name }}</h2>

    <span>{{ app.state.theme }}</span>
    <button @click="toggleTheme">toggle theme</button>
    <form @submit.prevent="addItemToCart">
      <input type="text" v-model="itemName" />
      <button>Add</button>
    </form>

    <form @submit.prevent="buy">
      <ul>
        <li v-for="item in cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!user.state.name">Buy</button>
      <button :disabled="!cart.items.length" @click="clearCart" type="button">
        Clear the cart
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useApp, toggleTheme } from './stores/app'
import { useUserStore } from './stores/user'
import { useCartStore, removeItem, addItem, purchaseItems } from './stores/cart'

export default {
  setup() {
    const user = useUserStore()
    const cart = useCartStore()
    const app = useApp()

    const itemName = ref('')

    function addItemToCart() {
      if (!itemName.value) return
      addItem(itemName.value)
      itemName.value = ''
    }

    function clearCart() {
      if (window.confirm('Are you sure you want to clear the cart?')) {
        cart.state.rawItems = []
      }
    }

    async function buy() {
      const n = await purchaseItems()

      console.log(`Bought ${n} items`)

      cart.state.rawItems = []
    }

    window.stores = { user, cart, addItem, removeItem, addItemToCart }

    return {
      itemName,
      addItemToCart,
      removeItem,
      cart,

      user,
      buy,
      clearCart,
      app,
      toggleTheme
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
