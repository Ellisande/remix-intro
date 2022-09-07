import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { getApiKey, baseUrl } from "~/api.server";

import coinSpecificStyleUrl from "../../styles/coinSpecific.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: coinSpecificStyleUrl }];
};

export const action: ActionFunction = async ({ request }) => {
  let body = Object.fromEntries(new URLSearchParams(await request.text()));
  const price = Number(body.price);
  const name = body.name;
  const unitsPurchased = 100 / price;
  // Step 8 - if the coin name is Bitcoin return an error message
  // by returning a json object with an error field using the json() function
  const url = new URL(request.url);
  url.searchParams.set("unitsPurchased", String(unitsPurchased));
  return redirect(url.toString());
};

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
  const url = new URL(request.url);
  const unitsPurchased = url.searchParams.get("unitsPurchased");
  return json({ currency, unitsPurchased });
};

export default function CoinDetails() {
  const { currency, unitsPurchased } = useLoaderData();
  // Step 8 - determine if there is any validation errors by using useActionData to fetch
  // any information returned from the action function
  const { quote } = currency;
  const price = Number(quote.USD.price);
  return (
    <div className="coin-text">
      {/*
        Step 8 - if an error is present show it on the screen up here at the top
      */}
      {unitsPurchased && (
        <h2>You bought {Number(unitsPurchased).toFixed(2)} units</h2>
      )}
      <h3>
        {currency.name} ({currency.symbol})
      </h3>
      <div>${price.toFixed(2)}</div>
      <form method="post">
        <input type="hidden" name="price" value={quote.USD.price} />
        <input type="hidden" name="name" value={currency.name} />
        <button>Buy $100</button>
      </form>
    </div>
  );
}
