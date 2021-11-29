/* Management of cart:
 retrive cart from localStorage, 
 add article to cart, 
 delete article from cart, 
 update article quantity
*/

/**
 * Gets cart from localStorage
 * @returns {object[]}
 */
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

/**
 * Replaces cart item in localStorage by function array parameter
 * @param {object[]} array
 */
const saveCart = (array) => {
  var linearCart = JSON.stringify(array)
  localStorage.setItem("cart", linearCart)
}

/**
 * Updates cart with new quantity selected
 * @param {string} prodId
 * @param {number} prodQty
 * @param {string} prodColor
 */
const updateQtyInCart = (prodId, prodQty, prodColor) => {
  var cart = getCart()
  if (prodQty == 0) {
    removeFromCart(prodId, prodColor)
  } else {
    cart.forEach((element, index, array) => {
      if (element.id == prodId && element.color == prodColor) {
        array[index].qty = prodQty
      }
    })
    saveCart(cart)
  }
}

/**
 * Add product to cart on Local Storage (checks also if product is already in cart to ensure one index per item in cart)
 * @param {string} prodId
 * @param {number} prodQty
 * @param {string} prodColor
 */
const addToCart = (prodId, prodQty, prodColor) => {
  var cart = getCart()
  var newItem = true // used to check weather the item is already in the cart
  cart.forEach((element, index, array) => {
    if (element.id == prodId && element.color == prodColor) {
      //array[index].qty = parseInt(array[index].qty) + prodQty
      array[index].qty += prodQty
      newItem = false
    }
  })
  var productToAdd = {
    id: prodId,
    qty: prodQty,
    color: prodColor,
  }
  if (newItem == true) {
    cart.push(productToAdd)
  }
  saveCart(cart)
}

/**
 * Removes item from cart in localStorage
 * @param {string} prodId
 * @param {string} prodColor
 */
const removeFromCart = (prodId, prodColor) => {
  console.log(`remove from cart:${prodId}${prodColor}`)
  var cart = getCart()
  cart = cart.filter(
    (element) => element.id != prodId && element.color != prodColor
  )
  saveCart(cart)
}

/** Sort cart to gather same articles (different colors) together
 * @param {object[]} cart
 * @returns {object[]} cart sorted
 */

const sortCart = (cart) => {
  return cart.sort((a, b) => {
    if (a.id < b.id) return 1
    else if (a.id > b.id) return -1
    else return 0
  })
}

/**
 * Calculates cart total
 * @returns {number} cartTotal
 */
const calculateCartTotal = async () => {
  var cart = getCart()
  var cartTotal = 0
  for (article of cart) {
    var APIProduct = await retrieveProductById(article.id)
    cartTotal += article.qty * APIProduct.price
  }
  return cartTotal
}

/**
 * Calculates number of articles in cart
 * @returns {number}
 */

const calculateArticlesInCart = () => {
  var cart = getCart()
  var count = 0
  for (article of cart) {
    count += parseInt(article.qty)
  }
  return count
}

/******* ONLY FOR TESTING PURPOSE ******/

// REFRESHES CART
const cleanCart = () => {
  saveCart([])
}

//PRINT CART IN CONSOLE
const printCart = () => {
  var cart = getCart()
  console.log("nr of items in the cart ;" + cart.length)
  cart.forEach(function (item, index) {
    console.log(`[${index}]: ${item.id} ${item.qty} ${item.color}`)
  })
}
