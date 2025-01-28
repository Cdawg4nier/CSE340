const utilities = require('../utilities')
const accountModel = require('../models/account-model.js')

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    let loginHTML = await utilities.buildLogin()
    res.render("account/login", {
        title: "Login",
        nav,
        loginHTML,
        errors: null,
    })
}

async function buildRegister (req, res, next) {
    let nav = await utilities.getNav()
    let registerHTML = await utilities.buildRegister()
    res.render("account/register", {
        title: "Register",
        nav,
        registerHTML,
        errors: null,
    })
}

async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    let loginHTML = await utilities.buildLogin()
    let registerHTML = await utilities.buildRegister()
    const { account_firstname, account_lastname, account_email, account_password } = req.body
  
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    )
  
    if (regResult) {
      
      res.status(201).render("account/login", { 
        title: "Login",
        nav,
        loginHTML,
        errors: null,
      })
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        registerHTML,
        errors: null,
      })
    }
  }

module.exports = {buildLogin, buildRegister, registerAccount}