import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ApiKey, baseUrl } from "~/api.server";

export const action: ActionFunction = async ({ request }) => {
  let body = Object.fromEntries(new URLSearchParams(await request.text()));
  const price = Number(body.price);
  const name = body.name;
  const unitsPurchased = 100 / price;
  // --- Talk to my API or Database, or whatever! --- //
  console.log(`Bought ${unitsPurchased} units of ${name}`);
  return redirect(request.url);
};

export const loader: LoaderFunction = async ({ params }) => {
  const coinSymbol = params.coin as string;
  const currencyResponse = await fetch(
    `${baseUrl}/quotes/latest?convert=USD&symbol=${coinSymbol}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": ApiKey,
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
  return (
    <div>
      <h3>
        {currency.name} ({currency.symbol})
      </h3>
      <div>${quote.USD.price}</div>
      <form method="post">
        <input type="hidden" name="price" value={quote.USD.price} />
        <input type="hidden" name="name" value={currency.name} />
        <button>Buy $100</button>
      </form>
    </div>
  );
}
