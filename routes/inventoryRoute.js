// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require('../utilities/inv-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build vehicle details view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

//Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement));

router.get("/newclass", utilities.handleErrors(invController.buildNewClassification))

router.get("/newinv", utilities.handleErrors(invController.buildNewInventoryItem))


router.post(
    "/newclass",
    invValidate.classificationRules(),
    invValidate.checkClassData,
    utilities.handleErrors(invController.createClassification)
  )

module.exports = router;