import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const ViewOrderDetails = () => {
	const { bookId } = useParams(); 
	const firebase = useFirebase();

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (bookId) {
			firebase
				.getOrders(bookId) 
				.then((orders) => {
					setOrders(orders); 
				})
				.catch((error) => {
					console.error("Error fetching orders: ", error);
				});
		}
	}, [bookId]);

	console.log(orders); 

	return (
		<div className="container">
			<p>Orders for Book: {bookId}</p>
			{orders.length > 0 ? (
				orders.map((order, index) => {
					return (
						<div key={index}>
							<p>Ordered By: {order.displayName}</p>
							<p>Quantity: {order.qty}</p>
							<p>Email: {order.userEmail}</p>
							<p>
								Photo:{" "}
								<img
									src={order.photoURL}
									alt={order.displayName}
								/>
							</p>
						</div>
					);
				})
			) : (
				<p>No orders found for this book.</p>
			)}
		</div>
	);
};

export default ViewOrderDetails;
