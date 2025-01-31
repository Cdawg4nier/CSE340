const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Classification Data Validation Rules
  * ********************************* */
validate.classificationRules = () => {
    console.log("I am getting to the classification rules")
    return [
      // Classification is required and must not contain any spaces or special characters
      body("classification")
        .trim()
        .escape()
        .notEmpty()
        .isAlpha('en-US')
        .withMessage("Classification must contain only letters.")
        .isLength({ min: 1 })
         .withMessage("Classification cannot be empty."),
    ]
  }

  validate.checkClassData = async (req, res, next) => {
    console.log("I am calling checkClassData")
    const { classification } = req.body
    console.log(`Here is the classification I am working with: ${classification}`)
    let errors = []
    errors = validationResult(req)
    console.log(`I have just checked for errors. Here is what I found: ${errors}`)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inv/classification", {
        errors,
        title: "Add Classification",
        nav,
        classification,
      })
      return
    }
    next()
  }
  


  module.exports = validate