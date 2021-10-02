import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { SnackbarProvider } from "notistack";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId={process.env.REACT_APP_MORALIS_APP_ID}
			serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
		>
			<SnackbarProvider maxSnack={3}>
				<App />
			</SnackbarProvider>
		</MoralisProvider>
	</StrictMode>,
	rootElement,
);
