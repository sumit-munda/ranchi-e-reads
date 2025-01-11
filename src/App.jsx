import { Route, Routes } from "react-router-dom";

// Pages

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Button variant="primary">Home</Button>}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
			</Routes>
		</>
	);
};

export default App;
