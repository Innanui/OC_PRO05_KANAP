const sectionCartItems = document.getElementsByClassName("cart__items")[0]

/**
 * Creates and appends one product card in cart summary HTML page
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
  h2.textContent = `${product.name} ${color}`

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

  input.addEventListener("change", async (e) => {
    //console.log("input event listener fired") // FOR DEVELOPEMENT ONLY
    updateQtyInCart(id, input.value, color)
    updateCartTotal(await calculateCartTotal())
  })
  paraDeleteItem.addEventListener("click", async (e) => {
    //console.log("delete Item event listener fired") //FOR DEVELOPEMENT ONLY
    removeFromCart(id, color)
    article.remove() //delete article in HTML
    updateCartTotal(await calculateCartTotal())
  })
}

/**
 * Modifies total and nr of article informations in HTML
 * @param {number} total
 */
const updateCartTotal = (total) => {
  var totalQuantity = document.getElementById("totalQuantity")
  var totalPrice = document.getElementById("totalPrice")
  totalPrice.textContent = `${total},00`
  totalQuantity.textContent = calculateArticlesInCart()
}

/**
 * Fills cart checkup table using infos in localStorage
 * @returns {htmlElement}
 */
const fillCartTable = async () => {
  var sortedCart = sortCart(getCart())
  sortedCart.forEach((element) => {
    newProductCard(element.id, element.qty, element.color)
  })
  updateCartTotal(await calculateCartTotal())
}

fillCartTable()

/*--------------------------------------------------------*/
/*-------------------- FORM MANAGEMENT -------------------*/
/*--------------------------------------------------------*/

let form = document.querySelector("form")

/**
 * Prevents default behavior of submit event and creates a formData object
 * @param {event} event
 */
const manageSubmit = (event) => {
  event.preventDefault()
  new FormData(form)
}

/**
 * checks user input validity
 * @returns boolean
 */
const isDataValid = () => {
  return (
    allLetter(form.firstName) &&
    lengthRange(form.firstName) &&
    allLetter(form.lastName) &&
    lengthRange(form.lastName) &&
    allLetterOrNumber(form.address) &&
    lengthRange(form.address) &&
    allLetter(form.city) &&
    lengthRange(form.city) &&
    validateEmail(form.email)
  )
}

/**
 * Creates contact object and product array if input is valid
 * calls post request
 * redirects to confirmation page
 * @param {event} e
 */
const manageFormData = async (e) => {
  var data = e.formData
  if (isDataValid()) {
    var contactObj = {}
    var productsArr = []
    data.forEach((value, key) => (contactObj[key] = value))
    getCart().forEach((element, index) => (productsArr[index] = element.id))
    let orderId = await postUserInput({
      contact: contactObj,
      products: productsArr,
    })
    window.location = `./confirmation.html?id=${orderId}`
  }
}

form.addEventListener("submit", manageSubmit)
form.addEventListener("formdata", manageFormData)
