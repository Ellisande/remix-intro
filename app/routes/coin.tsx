import { json, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getApiKey, baseUrl } from "~/api.server";
import { fakeData } from "../examples/fakeApi";

// Step 2 - Implement an API call to load data
// See examples/apiExamples.js -> Loader for sample api data
export const loader: LoaderFunction = async () => {
  return json({ currencies: fakeData });
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
      <main>Placeholder</main>
    </div>
  );
}
