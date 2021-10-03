import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { SnackbarProvider } from "notistack";
import App from "./App";

ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId={process.env.REACT_APP_MORALIS_APP_ID}
			serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
		>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{ horizontal: "center", vertical: "top" }}
			>
				<App />
			</SnackbarProvider>
		</MoralisProvider>
	</StrictMode>,
	document.getElementById("root"),
);
