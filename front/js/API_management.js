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
 * retrieves product Object from product ID using the API
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
 * Posts user contact infos in API and returns order nr
 * @returns {Promise} order nr
 */
const postUserInput = (jsonBody) =>
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  })
    .then((response) => response.json())
    .then((json) => {
      return json.orderId
    })
    .catch(function (error) {
      console.log("ho something went wrong in POST request" + error.message)
    })
