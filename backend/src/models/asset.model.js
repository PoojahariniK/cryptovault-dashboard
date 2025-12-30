const db = require('../config/db')
const createAsset = async (userId,name,symbol,quantity)=>{
    const [result]= await db.query(
        'INSERT INTO assets (user_id,name,symbol,quantity) VALUES (?,?,?,?)',
        [userId,name,symbol,quantity]
    )
    return result.insertId;
};

const getAssetsByUser = async (userId) => {
    const [rows] = await db.execute(
      `SELECT id, name, symbol, quantity, created_at
       FROM assets
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );
  
    return rows;
  };
  const updateAssetQuantity = async (assetId, userId, quantity) => {
    const [result] = await db.execute(
      `UPDATE assets
       SET quantity = ?
       WHERE id = ? AND user_id = ?`,
      [quantity, assetId, userId]
    );
  
    return result.affectedRows;
  };
  
  const deleteAsset = async (assetId, userId) => {
    const [result] = await db.execute(
      `DELETE FROM assets
       WHERE id = ? AND user_id = ?`,
      [assetId, userId]
    );
  
    return result.affectedRows;
  };
  
  module.exports = {
    createAsset,
    getAssetsByUser,
    updateAssetQuantity,
    deleteAsset,
  };
  
  
 