import React, { useState } from "react";
import { updateAsset } from "../services/asset.service";
import toast from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";

function EditAssetModal({ asset, onClose, onUpdated }) {
  const [quantity, setQuantity] = useState(asset.quantity);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (Number(quantity) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      await updateAsset(asset.id, quantity);
      toast.success("Asset updated successfully");
      await onUpdated();
      onClose();
    } catch {
      toast.error("Failed to update asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Asset</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-muted hover:text-white hover:bg-background transition"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Asset</label>
          <input
            type="text"
            value={`${asset.name} (${asset.symbol})`}
            readOnly
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-primary text-background rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAssetModal;
