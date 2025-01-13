import { Route, Routes } from "react-router-dom";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components
import OurNavbar from "./components/Navbar";
import ListingPage from "./pages/Listing";
import HomePage from "./pages/Home";

const App = () => {
	return (
		<>
			<OurNavbar />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
				<Route
					path="/book/list"
					element={<ListingPage />}
				/>
			</Routes>
		</>
	);
};

export default App;
