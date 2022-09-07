import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getApiKey, baseUrl } from "~/api.server";

// Step 5 - Implement an API call to load detailed data for a single currency
// See examples/apiExamples -> Specific currency loader
// For sample API code
export const loader: LoaderFunction = async ({ params, request }) => {
  const coinSymbol = params.coin as string;
  return json({
    currency: {
      name: "" + Math.random() * 10000,
      symbol: "BTC",
      quote: {
        USD: {
          price: "2.57",
        },
      },
    },
  });
};

export default function CoinDetails() {
  const { currency } = useLoaderData();
  const { quote } = currency;
  const price = Number(quote.USD.price);
  return (
    <div className="coin-text">
      <h3>
        {currency.name} ({currency.symbol})
      </h3>
      <div>${price.toFixed(2)}</div>
    </div>
  );
}
