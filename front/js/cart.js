const sectionCartItems = document.getElementsByClassName("cart__items")[0]

/**
 * Creates and appends one product card in cart summary HTML page
 * @param {string} id
 * @param {number} qty
 * @param {string} color
 * @returns {htmlElement}
 */
const newProductCard = async (id, qty, color) => {
  try {
    let product = await retrieveProductById(id)

    let sectionCart = document.getElementById("cart__items")

    let article = document.createElement("article")
    article.setAttribute("data-id", id)
    article.classList.add("cart__item")

    sectionCart.appendChild(article)

    let divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")

    article.appendChild(divImg)

    let img = document.createElement("img")
    img.setAttribute("src", product.imageUrl)
    img.setAttribute("alt", product.altTxt)

    divImg.appendChild(img)

    let divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")

    article.appendChild(divContent)

    let divTitle = document.createElement("div")
    divTitle.classList.add("cart__item__content__titlePrice")

    divContent.appendChild(divTitle)

    let h2 = document.createElement("h2")
    h2.textContent = `${product.name} ${color}`

    divTitle.appendChild(h2)

    let price = document.createElement("p")
    price.textContent = product.price + ",00 \u20AC"

    divTitle.appendChild(price)

    let divSettings = document.createElement("div")
    divSettings.classList.add("cart__item__content__settings")

    divTitle.appendChild(divSettings)

    let divQty = document.createElement("div")
    divQty.classList.add("cart__item__content__settings__quantity")

    divSettings.appendChild(divQty)

    let quantite = document.createElement("p")
    quantite.textContent = "Qté: "

    divQty.appendChild(quantite)

    let input = document.createElement("input")
    input.classList.add("itemQuantity")
    input.setAttribute("type", "number")
    input.setAttribute("name", "itemQuantity")
    input.setAttribute("min", "1")
    input.setAttribute("max", "100")
    input.setAttribute("value", qty)

    divQty.appendChild(input)

    let divDeleteItem = document.createElement("div")
    divDeleteItem.classList.add("cart__item__content__settings__delete")

    divSettings.appendChild(divDeleteItem)

    let paraDeleteItem = document.createElement("p")
    paraDeleteItem.classList.add("deleteItem")
    paraDeleteItem.textContent = "supprimer"

    divDeleteItem.appendChild(paraDeleteItem)

    input.addEventListener("change", async (e) => {
      updateQtyInCart(id, input.value, color)
      try {
        updateCartTotal(await calculateCartTotal())
      } catch (e) {
        console.log(e)
      }
    })
    paraDeleteItem.addEventListener("click", async (e) => {
      removeFromCart(id, color)
      article.remove() //delete article in HTML
      try {
        updateCartTotal(await calculateCartTotal())
      } catch (e) {
        console.log(e)
      }
    })
  } catch (e) {
    console.log(e)
  }
}

/**
 * Modifies total and nr of article informations in HTML
 * @param {number} total
 */
const updateCartTotal = (total) => {
  let totalQuantity = document.getElementById("totalQuantity")
  let totalPrice = document.getElementById("totalPrice")
  totalPrice.textContent = `${total},00`
  totalQuantity.textContent = calculateArticlesInCart()
}

/**
 * Fills cart checkup table using infos in localStorage
 * @returns {htmlElement}
 */
const fillCartTable = async () => {
  let sortedCart = sortCart(getCart())
  sortedCart.forEach((element) => {
    newProductCard(element.id, element.qty, element.color)
  })
  try {
    updateCartTotal(await calculateCartTotal())
  } catch (e) {
    console.log(e)
  }
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
  let data = e.formData
  if (isDataValid()) {
    let contactObj = {}
    let productsArr = []
    data.forEach((value, key) => (contactObj[key] = value))
    getCart().forEach((element, index) => (productsArr[index] = element.id))
    try {
      let orderId = await postUserInput({
        contact: contactObj,
        products: productsArr,
      })
      window.location = `./confirmation.html?id=${orderId}`
    } catch (e) {
      console.log(e)
    }
  }
}

form.addEventListener("submit", manageSubmit)
form.addEventListener("formdata", manageFormData)
