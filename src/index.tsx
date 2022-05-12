import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "react-quill/dist/quill.bubble.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
	dsn: "https://b7803fd768d144daa522b289741c79f1@o1236946.ingest.sentry.io/6387283",
	integrations: [new BrowserTracing()],
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 0.1,
	environment: "developement",
	// release: process.env.REACT_APP_SENTRY_RELEASE,
});

Object.assign(global, { WebSocket: require("websocket").w3cwebsocket });

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}></DndProvider>
			<h1> Hello, React - Redux Toolkit Project </h1>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
