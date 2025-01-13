import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useFirebase } from "../context/firebase";

const BookCard = (props) => {
	const firebase = useFirebase();
	// const [url, setURL] = useState(null);

	// useEffect(() => {
	// 	const fetchImageURL = async () => {
	// 		const imageURL = await firebase.getImageURL(props.imageURL);
	// 		setURL(imageURL);
	// 	};
	// 	fetchImageURL();
	// }, []);
	return (
		<Card style={{ width: "18rem", border: "1px dotted rgba(13, 110, 253, 1)", borderRadius: '10px' }}>
			<Card.Img
				variant="top"
				src={props.imageURL}
			/>
			<Card.Body>
				<Card.Title className="text-start">{props.name}</Card.Title>
				<Card.Text className="text-start">
					{props.name} By {props.authorName}.
					<span className="fw-bold">{"\n"}Price: </span>${props.price}.
				</Card.Text>
				<Button
					variant="primary"
					className="d-flex">
					Go somewhere
				</Button>
			</Card.Body>
		</Card>
	);
};

export default BookCard;
