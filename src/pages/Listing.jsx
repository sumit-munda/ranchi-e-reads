// import firebase from "firebase/compat/app";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/firebase";

const ListingPage = () => {
	const [name, setName] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [isbn, setIsbn] = useState("");
	const [price, setPrice] = useState("");
	const [imageURL, setImageURL] = useState("");
	// const [coverPic, setCoverPic] = useState("");
	const [loading, setLoading] = useState(false);

	const firebase = useFirebase();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// await firebase.handleNewListing(name, isbn, price, coverPic);
		await firebase.handleNewListingWithoutPic(
			name,
			authorName,
			isbn,
			price,
			imageURL
		);
		setLoading(false);
		setName("");
		setAuthorName("");
		setIsbn("");
		setPrice("");
		setImageURL("");
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
					controlId="formBasicEmail">
					<Form.Label>Enter Author Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Author name"
						value={authorName}
						onChange={(e) => setAuthorName(e.target.value)}
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

				<Form.Group
					className="mb-3"
					controlId="formBasicPassword">
					<Form.Label>Enter ImageURL</Form.Label>
					<Form.Control
						type="url"
						placeholder="ImageURL"
						value={imageURL}
						onChange={(e) => setImageURL(e.target.value)}
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
