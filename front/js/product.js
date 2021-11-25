let url = new URL(document.location.href)
let productId = url.searchParams.get("id")

const divImage = document.getElementsByClassName("item__img")[0]
const h1Title = document.getElementById("title")
const spanPrice = document.getElementById("price")
const pDescription = document.getElementById("description")
const selectColors = document.getElementById("colors")
const selectQty = document.getElementById("quantity")
const addToCartBtn = document.getElementById("addToCart")

/**
 * retrieves product Object from its ID using the API
 * @param {string} productId
 * @returns {Promise}
 */
const retrieveProductById = (productId) =>
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((data) => data.json())
    .catch((err) =>
      console.log(
        `oh no, unable to load catalogue in retrieveProductById${err}`
      )
    )
/**
 * Affiche sur la page les informations relative au produit
 * @param {Object} jsonProduct
 * @param {string} jsonProduct.imageURL
 * @param {string} jsonProduct.altTxt
 * @param {string} jsonProduct.name
 * @param {string} jsonProduct.price
 * @param {string} jsonProduct.description
 * @param {Array.<String>} jsonProduct.colors
 * @returns {HTMLElement}
 */
const fillProductInformation = (jsonProduct) => {
  itemImg = document.createElement("img")
  itemImg.setAttribute("src", jsonProduct.imageUrl)
  itemImg.setAttribute("alt", jsonProduct.altTxt)
  divImage.appendChild(itemImg)

  h1Title.textContent = jsonProduct.name

  spanPrice.textContent = jsonProduct.price

  pDescription.textContent = jsonProduct.description

  for (color of jsonProduct.colors) {
    let optionColor = document.createElement("option")
    optionColor.setAttribute("value", color)
    optionColor.textContent = color
    selectColors.appendChild(optionColor)
  }
}
/**
 * Check if Product is already in cart and updates cart on Local Storage
 * @param {string} prodId
 * @param {number} prodQty
 * @param {string} prodColor
 */
const addToCart = (prodId, prodQty, prodColor) => {
  var cart = JSON.parse(localStorage.getItem("cart") || "[]")

  var newItem = true // used to check weather the item is already in the cart
  cart.forEach((element, index, array) => {
    if (element.id == prodId && element.color == prodColor) {
      console.log(typeof array[index].qty)
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

  let linearCart = JSON.stringify(cart)
  localStorage.setItem("cart", linearCart)
}

/**
 * Checks if input informations have been selected and add choice to card
 */
const updateCart = () => {
  console.log("on est entré dans la fonction updateCart")
  if (selectColors.value && selectQty.value != "0") {
    addToCart(productId, parseInt(selectQty.value), selectColors.value)
    printCart()
  } else {
    alert("Please select product options")
    console.log("on est dans le else")
  }
}

async function main() {
  let article = await retrieveProductById(productId)
  fillProductInformation(article)
  addToCartBtn.addEventListener("click", updateCart)
}

main()

//printCart in console for testing purpose
const printCart = () => {
  var cart = JSON.parse(localStorage.getItem("cart") || "[]")
  console.log("nr of items in the cart ;" + cart.length)
  cart.forEach(function (item, index) {
    console.log(`[${index}]: ${item.id} ${item.qty} ${item.color}`)
  })
}
