// import firebase from "firebase/compat/app";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/firebase";

const ListingPage = () => {
	const [name, setName] = useState("");
	const [isbn, setIsbn] = useState("");
	const [price, setPrice] = useState("");
	// const [coverPic, setCoverPic] = useState("");
	const [loading, setLoading] = useState(false);

	const firebase = useFirebase();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// await firebase.handleNewListing(name, isbn, price, coverPic);
		await firebase.handleNewListingWithoutPic(name, isbn, price);
		setLoading(false);
		setName("");
		setIsbn("");
		setPrice("");
		// setCoverPic("");
	};

	return (
		<div className="container">
			<Form
				className="listing-form"
				onSubmit={handleFormSubmit}>
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail">
					<Form.Label>Enter Book Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Book name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="formBasicPassword">
					<Form.Label>Enter ISBN</Form.Label>
					<Form.Control
						type="text"
						placeholder="ISBN"
						value={isbn}
						onChange={(e) => setIsbn(e.target.value)}
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword">
					<Form.Label>Enter Price</Form.Label>
					<Form.Control
						type="number"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Form.Group>
				{/* <Form.Group
					className="mb-3"
					controlId="formBasicPassword">
					<Form.Label>Upload Book Cover</Form.Label>
					<Form.Control
						type="file"
						placeholder="Book Cover"
						value={coverPic}
						onChange={(e) => setCoverPic(e.target.files(0))}
					/>
				</Form.Group> */}

				<Button
					variant="primary"
					type="submit"
					disabled={loading}>
					{loading ? "Listing..." : "List"}
				</Button>
			</Form>
			{loading && <p>Loading...</p>}
		</div>
	);
};

export default ListingPage;
