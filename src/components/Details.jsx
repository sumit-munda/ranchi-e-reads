import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Button, Form } from "react-bootstrap";

const DetailsPage = () => {
	const params = useParams();
	console.log(params);
	const firebase = useFirebase();

	const [data, setData] = useState(null);
	// const [imageURL, setImageURL] = useState(null);
	const [qty, setQty] = useState(1);

	console.log(data);

	useEffect(() => {
		const fetchBookDetails = async () => {
			const value = await firebase.getBookById(params.bookId);
			setData(value.data());
		};

		fetchBookDetails();
	}, []);

	// useEffect(() => {
	// 	const fetchImage = async () => {
	//         if (data?.imageURL) {
	//           try {
	//             const url = data.imageURL;
	//             const imageURL = await firebase.getImageURL(url);
	//             setImageURL(imageURL);
	//           } catch (error) {
	//             console.error('Error fetching image URL:', error);
	//           }
	//         }
	//       };

	//       fetchImage();
	// }, [data]);

	const placeorder = async () => {
		const result = await firebase.placeOrder(params.bookId, qty);
		console.log("Order Placed", result);
	};

	if (data === null) return <p>Loading...</p>;

	return (
		<div className="container">
			<div
				className="container"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "start",
				}}>
				<img
					src={data.imageURL}
					alt={data.name}
					width={"300px"}
					style={{
						margin: "5rem 0 5rem 5rem",
						border: "5px dashed #fff",
						boxShadow: "0 0 0 2px #000",
						borderRadius: "5px",
					}}
				/>
				<div className="details">
					<div className="details-text">
						<h3>{data.name}</h3>
						<p>by {data.authorName}</p>
						<p>Price: {data.price}</p>
						<p>ISBN: {data.isbn}</p>
						<p>Author: {data.authorName}</p>
					</div>

					<Form.Group
						className="mb-3"
						style={{ width: "30%" }}
						controlId="formBasicPassword">
						<Form.Label>Quantity</Form.Label>
						<Form.Control
							type="number"
							placeholder="Quantity"
							value={qty}
							onChange={(e) => setQty(e.target.value)}
						/>
					</Form.Group>

					<Button
						variant="primary"
						onClick={placeorder}>
						Buy Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DetailsPage;
