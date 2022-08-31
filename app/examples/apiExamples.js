// A bunch of top currencies

// Loader
const currencyResponse = await fetch(`${baseUrl}/map?start=1&limit=20`, {
  headers: {
    "X-CMC_PRO_API_KEY": getApiKey(),
  },
});
const currencies = await currencyResponse.json();

// Component
const { currencies } = useLoaderData();
const nameSymbol = currencies.data.map((currency: any) => ({
  name: currency.name,
  symbol: currency.symbol,
}));

// Specific currency

// Loader
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

// Component
const { currency } = useLoaderData();
const { quote } = currency;
const price = Number(quote.USD.price);

// Buy Currency

// Action
let body = Object.fromEntries(new URLSearchParams(await request.text()));
const price = Number(body.price);
const name = body.name;
const unitsPurchased = 100 / price;
// --- Talk to my API or Database, or whatever! --- //
console.log(`Bought ${unitsPurchased} units of ${name}`);
return redirect(request.url);

// Action Error
if (body.name == "Bitcoin") {
    return json({ error: "Never, ever, buy bitcoin" });
  }