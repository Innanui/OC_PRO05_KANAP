let url = new URL(document.location.href)
let productId = url.searchParams.get("id")

const divImage = document.getElementsByClassName("item__img")[0]
const h1Title = document.getElementById("title")
const spanPrice = document.getElementById("price")
const pDescription = document.getElementById("description")
const selectColors = document.getElementById("colors")

/**
 * returns product Object using the API and the product id
 * @param {string} productId
 * @returns {Promise}
 */
const retrieveProductById = (productId) =>
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((data) => data.json())
    .catch((err) =>
      console.log(
        "oh no, unable to load catalogue in retrieveProductById" + err
      )
    )
/**
 * Renseigne les informations relative au produit
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

const main = async () => {
  let article = await retrieveProductById(productId)
  fillProductInformation(article)
}

main()
