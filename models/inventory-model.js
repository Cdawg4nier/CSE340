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

async function addInventoryItem(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
  const insertQuery = `
    INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  let sanitized_inv_image = '/images/no-image.png';
  let sanitized_inv_thumbnail = '/images/no-image-tn.png'

  try {
    const checkResult = await pool.query(insertQuery, [inv_make, inv_model, inv_year, inv_description, sanitized_inv_image, sanitized_inv_thumbnail, inv_price, inv_miles, inv_color, classification_id]);
    return checkResult;
  } catch (error) {
    console.error("addInventoryItem error:", error.message);
  }
}
module.exports = {getClassifications, getInventoryByClassificationId, getInventoryItemByInvID, addClassification, addInventoryItem};