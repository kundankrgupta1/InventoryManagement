import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const SingleItem = ({ showSingleItem, setShowSingleItem, singleProductID }) => {
	const [product, setProduct] = useState(null);

	const fetchSingleItem = async () => {
		try {
			if (singleProductID) {
				const res = await axios.get(`http://localhost:8080/data/${singleProductID}`);
				setProduct(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (showSingleItem && singleProductID) {
			fetchSingleItem();
		}
	}, [showSingleItem, singleProductID]);

	if (!product) {
		return null;
	}

	const { itemName, description, price, stock } = product;
	return (
		<div className={`${showSingleItem ? "block" : "hidden"} z-20 fixed top-0 left-0 bg-black bg-opacity-80 w-full h-full flex justify-center items-center`}>
			<div className="w-3/4 m-auto bg-white p-8 rounded-md">
				<div className="flex items-center justify-between mb-5">
					<h1 className="text-2xl font-bold text-center truncate max-w-3xl overflow-hidden">{itemName}</h1>
					<button
						onClick={() => setShowSingleItem(false)}
						className="hover:text-red-600 text-3xl font-bold float-right"
					>
						<FaRegWindowClose />
					</button>
				</div>
				<table>
					<tbody className="text-left w-full">
						<tr>
							<td className="pr-6 py-2 font-bold">Product ID:</td>
							<td>{product.id}</td>
						</tr>
						<tr>
							<td className="pr-6 py-2 font-bold">Price:</td>
							<td className="text-blue-800 font-bold">{Number(price).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td>
						</tr>
						<tr>
							<td className="pr-6 font-bold flex justify-start">Description:</td>
							<td className="">{description}</td>
						</tr>
						<tr>
							<td className="pr-6 font-bold flex justify-start">Available:</td>
							<td>
								{stock} Nos
								{stock > 0 ?
									<><p className="text-green-500 font-bold">In stock</p></> :
									<><p className="text-red-500 font-bold">Out of stock</p></>}
							</td>
						</tr>
					</tbody>

				</table>
			</div>
		</div>
	);
};

export default SingleItem;
