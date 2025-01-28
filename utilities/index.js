const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

/* **************************************
* Build the vehicleDetails view HTML
* ************************************ */
Util.buildVehicleDetails = async function(data){
    let vehicle
    if(data){
    let vehicleTitle = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
    vehicle =  '<div id="vehicleDetailsMain">'
    vehicle += '<div id="vehicleDetailsImg">'
    vehicle += `<img src="${data.inv_image}" alt= "${vehicleTitle}">`        
    vehicle += '</div>'
    vehicle += '<div id="vehicleDetailsText">'   
    vehicle += `<h2 id="vehiclePrice">$${new Intl.NumberFormat('en-US').format(data.inv_price)}</h2>`         
    vehicle += '<ul id="vehicleStats">'       
    vehicle += `<li>Mileage: ${new Intl.NumberFormat('en-US').format(data.inv_miles)}</li>`            
    vehicle += `<li>Color: ${data.inv_color}</li>`         
    vehicle += '</ul>'        
    vehicle += `<p id="vehicleDescription">Description: ${data.inv_description}</p>`  
    vehicle += '</div>'    
    vehicle += '</div>'
    } else { 
      vehicle = '<p class="notice">Sorry, that vehicle is no longer in our inventory.</p>'
    }
    return vehicle
  }

Util.buildLogin = async function(){
  let html
  html = `
  <form action="/account/login" method="post">
        <label for="email">Email:</label>
        <input type="email" id="email" name="account_email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="account_password" pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{12,}$" required>
        <p>Passwords must be at least 12 characters and contain at least 1 number, 1 capital letter and 1 special character</p>

        <button type="submit" id="loginButton">Login</button>
        <p>No Account? <a href="/account/register">Sign-up</a></p>
    </form>
    <script src="/js/script.js"></script>
  `
  return html
}

Util.buildRegister = async function(){
  let html
  html = `
  <form action="/account/register" method="post">
    <label for="account_firstname">First Name:</label>
        <input type="text" id="account_firstname" name="account_firstname" required>

        <label for="account_lastname">Last Name:</label>
        <input type="text" id="account_lastname" name="account_lastname" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="account_email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="account_password" pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{12,}$" required>
        <p>Passwords must be at least 12 characters and contain at least 1 number, 1 capital letter and 1 special character</p>

        <button type="submit" id="registerButton">Register</button>
    </form>
    <script src="/js/script.js"></script>
  `
  return html
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util