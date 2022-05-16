/**
 * tests if string is a valid email expression retruns true or false + error message
 * @param {HTMLElement} mail
 * @returns boolean
 */
const validateEmail = (mail) => {
  var mailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (mail.value.match(mailRegex)) {
    mail.nextElementSibling.textContent = ""
    return true
  }
  mail.nextElementSibling.textContent = "Please enter a valid email adress"
  return false
}

/**
 * tests if input contains only letters, returns true or false + alert message
 * @param {HTMLElement} inputtxt
 * @returns boolean
 */
const allLetter = (inputtxt) => {
  var letters = /^[a-zA-Z_\-\s\é\è\ê\ë\ï\î\û\ü\à\ô\ö]+$/ // alpha (min or maj) + spaces, -, and accents
  if (inputtxt.value.match(letters)) {
    inputtxt.nextElementSibling.textContent = ""
    return true
  }
  inputtxt.nextElementSibling.textContent = "Please enter a letter only value"
  return false
}

/**
 * tests if input contains only letters and digits, returns true or false + alert message
 * @param {HTMLElement} inputtxt
 * @returns boolean
 */
const allLetterOrNumber = (inputtxt) => {
  var letters = /^[0-9a-zA-Z_\-\s\é\è\ê\ë\ï\î\û\ü\à\ô\ö]+$/ // alpha numeric (min or maj) + spaces, -, and accents
  if (inputtxt.value.match(letters)) {
    inputtxt.nextElementSibling.textContent = ""
    return true
  }
  inputtxt.nextElementSibling.textContent =
    "Please enter a letter or number only value"
  return false
}

/**
 * Validates input lenght
 * @param {HTMLElement} inputtxt
 * @param {number} minlength
 * @param {number} maxlength
 * @returns boolean
 */
const lengthRange = (inputtxt) => {
  var userInput = inputtxt.value
  if (userInput.length >= 2 && userInput.length <= 30) {
    return true
  }
  inputtxt.nextElementSibling.textContent +=
    "Please enter a value between 2 and 30 caracters"
  return false
}
