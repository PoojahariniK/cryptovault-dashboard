import React, { useState } from "react";
import { addAsset } from "../services/asset.service";
import toast from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";

const COINS = [
  { name: "Bitcoin", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "Solana", symbol: "SOL" },
  { name: "Cardano", symbol: "ADA" },
];

function AddAssetModal({ onClose, onAssetAdded }) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [assetName, setAssetName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredCoins = COINS.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const selectCoin = (coin) => {
    setAssetName(coin.name);
    setSymbol(coin.symbol);
    setSearch("");
    setShowSuggestions(false);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setAmount("");
      return;
    }

    if (Number(value) > 0) {
      setAmount(value);
    }
  };

  const handleSubmit = async () => {
    if (!assetName || !symbol || Number(amount) <= 0) {
      return;
    }

    try {
      setLoading(true);

      await addAsset({
        name: assetName,
        symbol: symbol,
        quantity: Number(amount),
      });

      toast.success("Asset added successfully");

      await onAssetAdded();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Asset</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-muted hover:text-white hover:bg-background transition"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Search Cryptocurrency
          </label>
          <input
            type="text"
            placeholder="Search by name or symbol..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          />

          {showSuggestions && search && filteredCoins.length > 0 && (
            <div className="mt-2 bg-background border border-border rounded-lg max-h-48 overflow-y-auto">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  onClick={() => selectCoin(coin)}
                  className="px-4 py-2 hover:bg-card cursor-pointer flex justify-between"
                >
                  <span>{coin.name}</span>
                  <span className="text-muted text-sm">{coin.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Asset Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Asset Name</label>
          <input
            type="text"
            value={assetName}
            readOnly
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Symbol */}
        <div>
          <label className="block text-sm font-medium mb-2">Symbol</label>
          <input
            type="text"
            value={symbol}
            readOnly
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Amount Held</label>
          <input
            type="number"
            placeholder="0.5"
            min="0"
            step="any"
            value={amount}
            onChange={handleAmountChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          />
          {amount !== "" && Number(amount) <= 0 && (
            <p className="text-red-500 text-xs mt-2">
              Amount must be greater than 0
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !assetName || !symbol || Number(amount) <= 0}
            className="px-4 py-2 bg-primary text-background rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Asset"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAssetModal;
