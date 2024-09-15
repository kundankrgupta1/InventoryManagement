import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaCheck, FaRegWindowClose } from "react-icons/fa";
import { IoIosSend, IoMdPricetags } from "react-icons/io";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineDescription } from "react-icons/md";

const InputForm = ({ label, lableTag, icon, type, required, placeholder, onChange, value }) => {
	return (
		<div className="flex flex-col">
			<label className="text-black font-light">
				{label} {required && <span className="text-red-600 font-bold">*</span>}
			</label>
			<span className="text-gray-400 text-xs font-light">{lableTag}</span>
			<div className="flex items-center rounded-sm border-[1px] border-solid border-gray-700">
				<span className="px-2 text-red-600">{icon}</span>
				<input
					type={type}
					required={required}
					className="w-full px-4 py-2 outline-none text-gray-600 font-light"
					placeholder={placeholder}
					onChange={onChange}
					value={value}
				/>
			</div>
		</div>
	);
};

const ProductForm = ({ showForm, setShowForm, fetchData, selectedProduct, setSelectedProduct }) => {
	const [itemName, setItemName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (selectedProduct) {
			setItemName(selectedProduct.itemName);
			setDescription(selectedProduct.description);
			setPrice(selectedProduct.price);
			setStock(selectedProduct.stock);
		} else {
			setItemName("");
			setDescription("");
			setPrice("");
			setStock("");
		}
	}, [selectedProduct]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (selectedProduct) {
				// Edit mode
				await axios.put(`http://localhost:8080/data/${selectedProduct.id}`, {
					itemName, description, price, stock
				});
				setMessage("Product updated successfully");
			} else {
				// Add new product
				await axios.post("http://localhost:8080/data", {
					id: Date.now(),
					itemName, description, price, stock
				});
				setMessage("Product added successfully");
			}
			setItemName("");
			setDescription("");
			setPrice("");
			setStock("");
			fetchData();
			setTimeout(() => {
				setShowForm(false);
				setMessage("");
				setSelectedProduct(null); // Reset after edit
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`${showForm ? "block" : "hidden"} z-20 fixed top-0 left-0 bg-black bg-opacity-80 w-full h-full flex justify-center items-center`}
		>
			<div className="bg-white border-[1px] border-solid border-black rounded-md shadow-2xl w-fit m-auto p-4">
				<div className="flex items-center justify-between mb-5">
					<h1 className="text-2xl font-bold text-center">{selectedProduct ? "Edit product" : "Add new product"}</h1>
					<button
						onClick={() => { setShowForm(false), setSelectedProduct(null) }}
						className="hover:text-red-600 text-3xl font-bold float-right"
					>
						<FaRegWindowClose />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
					<div className="grid grid-cols-2 w-fit gap-4">
						<InputForm
							label="Item Name"
							lableTag="Enter product name"
							icon={<AiFillProduct />}
							type="text"
							required={true}
							placeholder="Product"
							onChange={(e) => setItemName(e.target.value)}
							value={itemName}
						/>

						<InputForm
							label="Description"
							lableTag="Product descriptions"
							icon={<MdOutlineDescription />}
							type="text"
							required={true}
							placeholder="Description"
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						/>

						<InputForm
							label="Price"
							lableTag="Price of product"
							icon={<IoMdPricetags />}
							type="text"
							required={true}
							placeholder="Price"
							onChange={(e) => setPrice(e.target.value)}
							value={price}
						/>

						<InputForm
							label="Stock"
							lableTag="Available stock"
							icon={<LuBoxes />}
							type="text"
							required={true}
							placeholder="Stock"
							onChange={(e) => setStock(e.target.value)}
							value={stock}
						/>
					</div>
					<button
						type="submit"
						className="w-fit flex items-center bg-red-600 p-1 border-l-4 border-red-600 text-white hover:bg-black hover:border-red-600 group"
					>
						<span className="px-6">{selectedProduct ? "Update Product" : "Add Product"}</span>
						<span className="bg-black p-2 text-2xl text-white group-hover:bg-white group-hover:text-black transition-transform duration-300">
							<IoIosSend className="group-hover:rotate-[42deg] transition-transform duration-300" />
						</span>
					</button>
					{message && <p className="text-green-600 flex items-center gap-1"><FaCheck />{message}</p>}
				</form>
			</div>
		</div>
	);
};

export default ProductForm;
