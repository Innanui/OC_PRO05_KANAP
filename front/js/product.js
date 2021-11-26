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
 * Creates HTML elements to show product informations on page
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
 * Checks if input informations have been selected and add choice to card
 */
const updateCart = () => {
  if (selectColors.value && selectQty.value != "0") {
    addToCart(productId, parseInt(selectQty.value), selectColors.value)
    printCart()
  } else {
    alert("Please select product options")
  }
}

async function main() {
  let article = await retrieveProductById(productId)
  fillProductInformation(article)
  addToCartBtn.addEventListener("click", updateCart)
}

main()
