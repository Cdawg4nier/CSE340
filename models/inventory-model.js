const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
  }
  
/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get the specific item by inv_id
 * ************************** */
async function getInventoryItemByInvID(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryItemByInvID error " + error)
  }
} 

async function addClassification(classification) {
  try {
    const checkQuery = 'SELECT 1 FROM classification WHERE classification_name = $1';
    const checkResult = await pool.query(checkQuery, [classification]);

    if (checkResult.rows.length === 0) {
      const insertQuery = 'INSERT INTO classification (classification_name) VALUES ($1)';
      await pool.query(insertQuery, [classification]);
    } else {
    }
  } catch (error) {
    console.error("addClassification error" + error)
  }

}

async function addInventoryItem(lotsaStuff) {

}
module.exports = {getClassifications, getInventoryByClassificationId, getInventoryItemByInvID, addClassification, addInventoryItem};