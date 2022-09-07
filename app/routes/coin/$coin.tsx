import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getApiKey, baseUrl } from "~/api.server";

import coinSpecificStyleUrl from "../../styles/coinSpecific.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: coinSpecificStyleUrl }];
};

// Step 7 - Do something on form submit by exporting an action function
// Have it redirect back to the current url at the end
export const action: ActionFunction = async ({ request }) => {
  let body = Object.fromEntries(new URLSearchParams(await request.text()));
  const price = Number(body.price);
  return redirect("/");
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
      {/*
        Step 7 -- Add an html form with method="post"
        Include two hidden inputs
          1. name: price, value: quote USD price
          2. name: name, value: currency name
        Include one button
      */}
    </div>
  );
}
