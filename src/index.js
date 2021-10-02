import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId="fLrIioEWNPxSzm2Rg0GEIX0Fg77k42TJarzrLOmy"
			serverUrl="https://z052tanxxyci.moralishost.com:2053/server"
		>
			<App />
		</MoralisProvider>
	</StrictMode>,
	rootElement,
);
