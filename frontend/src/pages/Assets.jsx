import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddAssetModal from "../components/AddAssetModal";
import EditAssetModal from "../components/EditAssetModal";
import { getAssets, deleteAsset } from "../services/asset.service";
import toast from "react-hot-toast";
import { COIN_ID_MAP } from "../utils/coinMap";
import { getMarketPrices } from "../services/market.service";
import { getMe } from "../services/auth.service";
import {HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";


function Assets() {
  const [assets, setAssets] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [search, setSearch] = useState("");
  const [coinFilter, setCoinFilter] = useState("ALL");
  const [username,setUsername] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  /*  Fetch Assets */
  const refreshAssets = async () => {
    try {
      const res = await getAssets();
      setAssets(res.data);
    } catch {
      toast.error("Failed to fetch assets");
    }
  };
  useEffect(()=>{
    const fetchUser = async () =>{
        try{
            const data= await getMe();
            setUsername(data.username);
        }
        catch{
            setUsername("");
        }
    }
    fetchUser();
  },[]);

  useEffect(() => {
    refreshAssets();
  }, []);

  /* Fetch Market Prices  */
  useEffect(() => {
    if (assets.length === 0) return;

    const fetchPrices = async () => {
      try {
        const ids = assets
          .map(a => COIN_ID_MAP[a.symbol])
          .filter(Boolean);

        if (ids.length === 0) return;

        const data = await getMarketPrices(ids);
        setMarketData(data);
      } catch {
        toast.error("Failed to fetch market data");
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [assets]);

  /* Delete Asset */
  const handleDelete = async (id) => {
    try {
      await deleteAsset(id);
      toast.success("Asset deleted");
      refreshAssets();
    } catch {
      toast.error("Delete failed");
    }
  };

  /*Filters  */
  const filteredAssets = assets.filter(asset => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase());

    const matchesCoin =
      coinFilter === "ALL" || asset.symbol === coinFilter;

    return matchesSearch && matchesCoin;
  });

  /*  Enrich Assets*/
  const enrichedAssets = filteredAssets.map(asset => {
    const coinId = COIN_ID_MAP[asset.symbol];
    const price = marketData[coinId]?.usd || 0;
    const change24h = marketData[coinId]?.usd_24h_change || 0;

    return {
      ...asset,
      price,
      change24h,
      value: asset.quantity * price,
    };
  });

  /* Portfolio Calculations */
  const totalValue = enrichedAssets.reduce(
    (sum, a) => sum + a.value,
    0
  );

  const total24hChangeValue = enrichedAssets.reduce(
    (sum, a) => sum + (a.value * a.change24h) / 100,
    0
  );

  const total24hPercent =
    totalValue > 0
      ? (total24hChangeValue / totalValue) * 100
      : 0;

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <main className="px-8 py-8 space-y-8">

        {/* Welcome */}
        <section>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="text-primary">{username}</span>
          </h1>
          <p className="text-muted mt-2">
            Track your crypto holdings and monitor real-time performance.
          </p>
        </section>

        {/* Portfolio Summary */}
        <section className="bg-card border border-border rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-muted text-sm">Total Portfolio Value</p>
            <h2 className="text-4xl font-mono mt-2">
              ${totalValue.toFixed(2)}
            </h2>
            <span
              className={`text-sm mt-2 inline-block ${
                total24hPercent >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {total24hPercent.toFixed(2)}%
            </span>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-muted text-sm">Assets</p>
              <p className="text-xl font-semibold">{assets.length}</p>
            </div>
            <div>
              <p className="text-muted text-sm">24h Change</p>
              <p
                className={`font-semibold ${
                  total24hChangeValue >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${total24hChangeValue.toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Assets</h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-primary"
            />

            <select
              value={coinFilter}
              onChange={(e) => setCoinFilter(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="ALL">All Coins</option>
              {[...new Set(assets.map(a => a.symbol))].map(symbol => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-opacity-90 transition"
            >
              Add Asset
            </button>
          </div>
        </section>

        {/* Assets Table */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-muted">
              <tr>
                <th className="text-left px-6 py-4">Asset</th>
                <th className="text-left px-6 py-4">Amount</th>
                <th className="text-left px-6 py-4">Price</th>
                <th className="text-left px-6 py-4">24h</th>
                <th className="text-left px-6 py-4">Value</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {enrichedAssets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-10">
                    No assets found
                  </td>
                </tr>
              ) : (
                enrichedAssets.map(asset => (
                  <tr
                    key={asset.id}
                    className="border-b border-border hover:bg-background transition"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-muted text-xs">{asset.symbol}</div>
                    </td>
                    <td className="px-6 py-4">{asset.quantity}</td>
                    <td className="px-6 py-4">${asset.price.toFixed(2)}</td>
                    <td
                      className={`px-6 py-4 ${
                        asset.change24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {asset.change24h.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${asset.value.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button
                        onClick={() => setEditingAsset(asset)}
                        className="text-muted hover:text-primary transition"
                      >
                        <HiOutlinePencil className="text-lg"/>
                      </button>
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="text-muted hover:text-red-500 transition"
                      >
                        <HiOutlineTrash className="text-lg"/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

      </main>

      {showAddModal && (
        <AddAssetModal
          onClose={() => setShowAddModal(false)}
          onAssetAdded={refreshAssets}
        />
      )}

      {editingAsset && (
        <EditAssetModal
          asset={editingAsset}
          onClose={() => setEditingAsset(null)}
          onUpdated={refreshAssets}
        />
      )}
    </div>
  );
}

export default Assets;
