const sectionCartItems = document.getElementsByClassName("cart__items")[0]

/**
 * Creates and appends one product card in cart checkup HTML page
 * @param {string} id
 * @param {number} qty
 * @param {string} color
 * @returns {htmlElement}
 */
const newProductCard = async (id, qty, color) => {
  var product = await retrieveProductById(id)

  var sectionCart = document.getElementById("cart__items")

  var article = document.createElement("article")
  article.setAttribute("data-id", id)
  article.classList.add("cart__item")

  sectionCart.appendChild(article)

  var divImg = document.createElement("div")
  divImg.classList.add("cart__item__img")

  article.appendChild(divImg)

  var img = document.createElement("img")
  img.setAttribute("src", product.imageUrl)
  img.setAttribute("alt", product.altTxt)

  divImg.appendChild(img)

  var divContent = document.createElement("div")
  divContent.classList.add("cart__item__content")

  article.appendChild(divContent)

  var divTitle = document.createElement("div")
  divTitle.classList.add("cart__item__content__titlePrice")

  divContent.appendChild(divTitle)

  var h2 = document.createElement("h2")
  h2.textContent = product.name

  divTitle.appendChild(h2)

  var price = document.createElement("p")
  price.textContent = product.price + ",00 \u20AC"

  divTitle.appendChild(price)

  var divSettings = document.createElement("div")
  divSettings.classList.add("cart__item__content__settings")

  divTitle.appendChild(divSettings)

  var divQty = document.createElement("div")
  divQty.classList.add("cart__item__content__settings__quantity")

  divSettings.appendChild(divQty)

  var quantite = document.createElement("p")
  quantite.textContent = "Qté: "

  divQty.appendChild(quantite)

  var input = document.createElement("input")
  input.classList.add("itemQuantity")
  input.setAttribute("type", "number")
  input.setAttribute("name", "itemQuantity")
  input.setAttribute("min", "1")
  input.setAttribute("max", "100")
  input.setAttribute("value", qty)

  divQty.appendChild(input)

  var divDeleteItem = document.createElement("div")
  divDeleteItem.classList.add("cart__item__content__settings__delete")

  divSettings.appendChild(divDeleteItem)

  var paraDeleteItem = document.createElement("p")
  paraDeleteItem.classList.add("deleteItem")
  paraDeleteItem.textContent = "supprimer"

  divDeleteItem.appendChild(paraDeleteItem)

  input.addEventListener("change", updateQtyInCart(id, input.value, color))
  paraDeleteItem.addEventListener("click", removeFromCart(id, color))
}

/**
 * Fills cart checkup table using infos in localStorage
 * @returns {htmlElement}
 */
const fillCartTable = () => {
  var cart = getCart()
  cart.forEach((element) => {
    newProductCard(element.id, element.qty, element.color)
  })
}

// supprimer la carte de l'article si la quantite est a 0 ou si click sur supprimer
// probleme lorsque l'on modifie la quantite ou supprime, le cart se vide ...
fillCartTable()
