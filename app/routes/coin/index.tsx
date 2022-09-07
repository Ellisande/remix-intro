import { LinksFunction } from "@remix-run/node";
import coinIndexStyleUrl from "../../styles/coinIndex.css";

// Step 6 - add coinIndex.css as a style for this component using a links export

export default function Empty() {
  return <div className="coin-text">Choose a coin</div>;
}
