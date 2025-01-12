import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

// useFirebaseContext
import { firebaseAuth, useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [termsChecked, setTermsChecked] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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

		if (!termsChecked) {
			setError("You must agree to the terms and conditions.");
			return;
		}

		try {
			const data = await firebase.signupWithEmailAndPassword(email, password);
			console.log(data);
			alert("Account Created Successfully!");
		} catch (error) {
			setError(`Error: ${error.message}`);
		} finally {
			setLoading(false);
			setEmail("");
			setPassword("");
			setTermsChecked(false);
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
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
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
					className="mb-3"
					controlId="formBasicCheckbox">
					<Form.Check
						type="checkbox"
						label="I agree to the Terms and Conditions."
						checked={termsChecked}
						onChange={(e) => setTermsChecked(e.target.checked)}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					disabled={loading || !termsChecked}>
					{loading ? "Signing Up..." : "Sign Up"}
				</Button>
			</Form>
			{loading && <p>Loading...</p>}
		</div>
	);
};

export default RegisterPage;
