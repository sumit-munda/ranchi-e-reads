import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { firebaseAuth, useFirebase } from "../context/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState("");

	const firebase = useFirebase();
	const navigate = useNavigate();

	useEffect(() => {
		if (firebase.isLoggedIn) {
			console.log(`Hey, How are you doing.`);
		}
	}, [firebase.isLoggedIn]);

	const handleLogout = async () => {
		try {
			await signOut(firebaseAuth);
			firebase.setIsLoggedIn(false);
			navigate("/");
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		if (!email || !password) {
			setError("Please fill in both fields.");
			setLoading(false);
			return;
		}

		try {
			const data = await firebase.signinWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);
			console.log(data);
			firebase.setIsLoggedIn(true);
			console.log("Sign In Successfully!");
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				setError("User not found. Please check your email.");
			} else if (error.code === "auth/wrong-password") {
				setError("Incorrect password. Please try again.");
			} else {
				setError(`Error: ${error.message}`);
			}
		} finally {
			setLoading(false);
			setEmail("");
			setPassword("");
			setRememberMe(false);
		}
	};

	if (firebase.isLoggedIn) {
		return (
			<div className="container">
				<p>You are logged in.</p>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		);
	}

	return (
		<div className="container">
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleFormSubmit}>
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<Form.Group
					className="mb-3 ml-0 text-left"
					controlId="formRememberMe">
					<Form.Check
						type="checkbox"
						label="Remember me"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
					/>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					disabled={loading}>
					{loading ? "Signing In..." : "Sign In"}
				</Button>
				<h6 className="mt-3 mb-3">OR</h6>
				<Button
					variant="primary"
					onClick={firebase.signinWithGoogle}
					disabled={loading}>
					{loading ? "Signing In..." : "Signin with Google"}
				</Button>
			</Form>
			{loading && <p>Loading...</p>}
		</div>
	);
};

export default LoginPage;
