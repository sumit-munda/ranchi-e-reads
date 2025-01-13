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

const App = () => {
	return (
		<>
			<OurNavbar />
			<Routes>
				<Route
					path="/"
					element={<p>Home</p>}
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
