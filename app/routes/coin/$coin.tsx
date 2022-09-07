import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { getApiKey, baseUrl } from "~/api.server";

import coinSpecificStyleUrl from "../../styles/coinSpecific.css";

// Step 6 - Add coinSpecific.css as the styling for this page using a links export

export const loader: LoaderFunction = async ({ params, request }) => {
  const coinSymbol = params.coin as string;
  const currencyResponse = await fetch(
    `${baseUrl}/quotes/latest?convert=USD&symbol=${coinSymbol}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": getApiKey(),
      },
    }
  );
  const currencyJson = await currencyResponse.json();
  const currency = Object.values(currencyJson.data)[0];
  return json({ currency });
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
