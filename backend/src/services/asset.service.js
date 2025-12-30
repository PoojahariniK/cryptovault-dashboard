const assetModel = require("../models/asset.model");

const addAsset = async (userId, data) => {
  const { name, symbol, quantity } = data;

  if (!name || !symbol || quantity <= 0) {
    throw new Error("Invalid asset data");
  }

  return await assetModel.createAsset(
    userId,
    name,
    symbol,
    quantity
  );
};

const fetchAssets = async (userId) => {
  return await assetModel.getAssetsByUser(userId);
};

const updateAsset = async (userId, assetId, quantity) => {
    if (!quantity || quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  
    const updated = await assetModel.updateAssetQuantity(
      assetId,
      userId,
      quantity
    );
  
    if (!updated) {
      throw new Error("Asset not found");
    }
  };
  
  const removeAsset = async (userId, assetId) => {
    const deleted = await assetModel.deleteAsset(assetId, userId);
  
    if (!deleted) {
      throw new Error("Asset not found");
    }
  };
  
  module.exports = {
    addAsset,
    fetchAssets,
    updateAsset,
    removeAsset,
  };
  
