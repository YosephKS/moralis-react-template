import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId={process.env.REACT_APP_MORALIS_APP_ID}
			serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
		>
			<App />
		</MoralisProvider>
	</StrictMode>,
	rootElement,
);
