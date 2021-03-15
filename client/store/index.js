/* eslint-disable array-callback-return */
export const state = () => ({
  // state

  cart: [],
  cartLength: 0
})

export const actions = {
  addProductToCart ({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id)

    if (!cartProduct) {
      commit('pushProductToCart', product)
    } else {
      commit('incrementProductQty', cartProduct)
    }

    commit('incrementCartLength')
  }
}

export const mutations = {
  pushProductToCart (state, product) {
    product.quantity = 1
    state.cart.push(product)
  },

  incrementProductQty (state, product) {
    product.quantity++

    const indexOfProduct = state.cart.indexOf(product)
    state.cart.splice(indexOfProduct, 1, product)
  },

  incrementCartLength (state) {
    state.cartLength = 0

    if (state.cart.length > 0) {
      // eslint-disable-next-line array-callback-return
      state.cart.map((product) => {
        state.cartLength += product.quantity
      })
    }
  },

  /*
  1. Find product in cart
  2. Change the quantity of the product
  3. Update the length of cart
  4. Replace old product with updated product
  */
  changeQty (state, { product, qty }) {
    const cartProduct = state.cart.find(prod => prod._id === product._id)
    cartProduct.quantity = qty

    state.cartLength = 0

    if (state.cart.length > 0) {
      // eslint-disable-next-line array-callback-return
      state.cart.map((product) => {
        state.cartLength += product.quantity
      })
    }

    const indexOfProduct = state.cart.indexOf(cartProduct)
    state.cart.splice(indexOfProduct, 1, cartProduct)
  }
}

export const getters = {
  getCartLength (state) {
    return state.cartLength
  },

  getCart (state) {
    return state.cart
  },

  getCartTotalPrice (state) {
    let total = 0
    state.cart.map((product) => {
      total += product.price * product.quantity
    })

    return total
  }
}
