import { LinksFunction } from "@remix-run/node";
import coinIndexStyleUrl from "../../styles/coinIndex.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: coinIndexStyleUrl }];
};
export default function Empty() {
  return <div className="coin-text">Choose a coin</div>;
}
