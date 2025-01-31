const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

/* ***************************
 *  Build vehicle details view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
    const invId = req.params.invId
    const data = await invModel.getInventoryItemByInvID(invId)
    const vehicleDetail = await utilities.buildVehicleDetails(data)
    let nav = await utilities.getNav()
   const vehicleTitle = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
    res.render("./inventory/vehicleDetails", {
      title: vehicleTitle,
      nav,
      vehicleDetail,
      errors: null,
    })
  }

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null,
  })
}


invCont.buildNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

invCont.buildNewInventoryItem = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory Item",
    nav,
    errors: null,
  })
}

invCont.createClassification = async function(req, res) {
    
    const { classification } = req.body

    const classResult = await invModel.addClassification(
      classification
    )
  
    let nav = await utilities.getNav()
    if (classResult) {
      
      res.status(201).render("./inventory/add-classification", { 
        title: "Add Classification",
        nav,
        errors: null,
      })
      req.flash(
        "notice",
        `Congratulations, you\'ve created the  ${classification} classification.`
      )
    } else {
      req.flash("notice", "Sorry, the process failed.")
      res.status(501).render("./inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
      })
    }
  }

module.exports = invCont