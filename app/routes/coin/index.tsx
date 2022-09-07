import { LinksFunction } from "@remix-run/node";
import coinIndexStyleUrl from "../../styles/coinIndex.css";

// Step 4 - Create routes/coin/$coin.tsx
// Add a hello world component implementation to $coin.tsx
export default function Empty() {
  return <div className="coin-text">Choose a coin</div>;
}
