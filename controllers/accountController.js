const utilities = require('../utilities')
const accountModel = require('../models/account-model.js')
const bcrypt = require('bcryptjs')

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
        errors: null,
    })
}

async function buildRegister (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
    })
}

async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body
  
    let hashedPassword
    try {
      // regular password and cost (salt is generated automatically)
      hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
      req.flash("notice", 'Sorry, there was an error processing the registration.')
      res.status(500).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
      })
    }

    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )
  
    if (regResult) {
      
      res.status(201).render("account/login", { 
        title: "Login",
        nav,
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
        errors: null,
      })
    }
  }

  async function loginAccount(req, res) {
    let nav = await utilities.getNav()
    const {account_email, account_password } = req.body
  
    const logResult = await accountModel.loginAccount(
      account_email,
      account_password
    )
  
    if (logResult) {
      
      res.status(201).render("account/login", { 
        title: "Login",
        nav,
        errors: null,
      })
      req.flash(
        "notice",
        `Congratulations, you\'re logged in.`
      )
    } else {
      req.flash("notice", "Sorry, the login failed.")
      res.status(501).render("account/login", {
        title: "Login",
        nav,
        errors: null,
      })
    }
  }

module.exports = {buildLogin, buildRegister, registerAccount, loginAccount}