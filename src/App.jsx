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
import DetailsPage from "./components/Details";
import ViewOrderPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetails";
import { useEffect } from "react";

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
				<Route
					path="/book/view/:bookId"
					element={<DetailsPage />}
				/>
				<Route
					path="/book/orders"
					element={<ViewOrderPage />}
				/>
				<Route
					path="/books/orders/:bookID"
					element={<ViewOrderDetails />}
				/>
			</Routes>
		</>
	);
};

export default App;
