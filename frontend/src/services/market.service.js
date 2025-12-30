import axios from "axios";

export async function getMarketPrices(coinIds) {
  const ids = coinIds.join(",");

  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids,
        vs_currencies: "usd",
        include_24hr_change: true,
      },
    }
  );

  return res.data;
}
