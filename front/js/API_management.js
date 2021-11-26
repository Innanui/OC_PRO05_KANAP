/**
 * Récuperer le catalogue complet de canapés en utilisant l'API fetch
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
