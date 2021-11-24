/* recupere les donnees concernant les canapés et les utilise pour remplir la page d'accueil */

const sectionItems = document.getElementById("items")

/**
 * Récuperer le catalogue de canapés en utilisant l'API fetch
 * @return {Promise}
 * */
const retrieveFullCatalogue = () =>
  fetch("http://localhost:3000/api/products")
    .then((data) => data.json())
    .catch((err) =>
      console.log(
        "oh no, unable to load full catalogue in getFullCatalogue" + err
      )
    )

/**
 * Créer une carte produit à partir d'un objet kanap et l'ajoute a la section items
 * @param {Object} kanap
 * @param {string} kanap.colors
 * @param {string} kanap._id
 * @param {string} kanap.name
 * @param {string} kanap.price
 * @param {string} kanap.imageUrl
 * @param {string} kanap.description
 * @param {string} kanap.altTxt
 * @returns { HTML Element }
 */
const createOneProductCard = (kanap) => {
  let kanapId = kanap._id
  let kanapName = kanap.name
  let kanapDescription = kanap.description
  let kanapImageURL = kanap.imageUrl
  let kanapAltTxt = kanap.altTxt

  let anchor = document.createElement("a")
  let article = document.createElement("article")
  let img = document.createElement("img")
  let h3 = document.createElement("h3")
  let p = document.createElement("p")

  anchor.setAttribute("src", `./product.html?id=${kanapId}`)
  img.setAttribute("src", kanapImageURL)
  img.setAttribute("alt", kanapAltTxt)
  h3.classList.add("productName")
  h3.innerHTML = kanapName
  p.classList.add("productDescription")
  p.innerHTML = kanapDescription

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(p)
  anchor.appendChild(article)
  sectionItems.appendChild(anchor)
}

/**
 * Crée les cartes produits a partir d'un tableau de produits
 * @param {Array.<Object>} jsonListProducts
 * @returns { HTML Element }
 */
const createProductCards = (jsonListProducts) => {
  for (let jsonProduct of jsonListProducts) {
    createOneProductCard(jsonProduct)
  }
}

const main = async () => {
  const fullCatalogue = await retrieveFullCatalogue()
  createProductCards(fullCatalogue)
}

main()
