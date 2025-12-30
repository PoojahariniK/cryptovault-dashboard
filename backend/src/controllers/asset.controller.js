const assetService = require("../services/asset.service");

const addAsset = async (req, res) => {
  try {
    await assetService.addAsset(req.user.id, req.body);
    res.status(201).json({ message: "Asset added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAssets = async (req, res) => {
  try {
    const assets = await assetService.fetchAssets(req.user.id);
    res.json(assets);
  } catch {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
};

const updateAsset = async (req, res) => {
    try {
      const { quantity } = req.body;
      await assetService.updateAsset(
        req.user.id,
        req.params.id,
        quantity
      );
      res.json({ message: "Asset updated successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const deleteAsset = async (req, res) => {
    try {
      await assetService.removeAsset(req.user.id, req.params.id);
      res.json({ message: "Asset deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  module.exports = {
    addAsset,
    getAssets,
    updateAsset,
    deleteAsset,
  };
  
