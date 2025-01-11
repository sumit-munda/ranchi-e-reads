import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseProvider } from "./context/firebase.jsx";
import { BrowserRouter } from "react-router-dom";

// implementing firebase context inside main.jsx and wrapping app component inside the FirebaseProvider so that all the app components have access to the firebase context

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<FirebaseProvider>
				<App />
			</FirebaseProvider>
		</BrowserRouter>
	</StrictMode>
);

// Our app is wrapped inside two providers...