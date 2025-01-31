const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Classification Data Validation Rules
  * ********************************* */
validate.classificationRules = () => {
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
    const { classification } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification,
      })
      return
    }
    next()
  }
  

  validate.inventoryRules = () => {
    console.log("I am getting to the inventory rules")
    return [
        body("inv_make")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Make cannot be empty"),
  
        body("inv_model")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Model cannot be empty"),
  
        body("inv_year")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 4, max: 4 })
          .isNumeric()
          .withMessage("Please enter the year as a 4 digit number: xxxx"),
  
        body("inv_description")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Description cannot be empty"),
  
          body("inv_image")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Image cannot be null. If you do not have one, use the default /images/no-image.png")
          .customSanitizer(value => {
            return value.replace(/\//g, '\\');
          }),
  
        body("inv_thumbnail")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Thumbnail cannot be null. If you do not have one, use the default /images/no-image-tn.png")
          .customSanitizer(value => {
            return value.replace(/\//g, '\\');
          }),
  
        body("inv_price")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ max: 9 })
          .isNumeric()
          .withMessage("Must contain a price for the vehicle with no decimals."),
  
        body("inv_miles")
          .trim()
          .escape()
          .notEmpty()
          .isInt({ min: 0 })
          .withMessage("Miles must be a positive integer with no commas or spaces"),
  
        body("inv_color")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Color cannot be empty"),
      ];
  }

  validate.checkInvData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let classDropdown = await utilities.buildClassificationList()
      res.render("inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classDropdown,
      })
      return
    }
    next()
  }


  module.exports = validate