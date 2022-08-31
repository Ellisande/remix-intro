import { json, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getApiKey, baseUrl } from "~/api.server";

export const loader: LoaderFunction = async () => {
  const currencyResponse = await fetch(`${baseUrl}/map?start=1&limit=20`, {
    headers: {
      "X-CMC_PRO_API_KEY": getApiKey(),
    },
  });
  const currencies = await currencyResponse.json();
  return json({ currencies });
};

export default function Index() {
  const { currencies } = useLoaderData();
  const nameSymbol = currencies.data.map((currency: any) => ({
    name: currency.name,
    symbol: currency.symbol,
  }));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
      <nav>
        <ul>
          {nameSymbol.map((pair: any) => {
            return (
              <li key={pair.symbol}>
                <Link to={`/coin/${pair.symbol}`} prefetch="intent">
                  {pair.name}({pair.symbol})
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
