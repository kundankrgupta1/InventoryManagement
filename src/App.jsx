import { useEffect, useState } from "react"
import ProductForm from "./Components/ProductForm"
import ProductList from "./Components/ProductList"
import axios from "axios"
import SingleItem from "./Components/SingleItem"
import { IoIosSearch } from "react-icons/io"

const App = () => {
	const [showForm, setShowForm] = useState(false)
	const [showSingleItem, setShowSingleItem] = useState(false)
	const [singleProductID, setSingleProductID] = useState(null)
	const [product, setProduct] = useState([])
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [search, setSearch] = useState("");

	const fetchData = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/data?q=${search}`)
			setProduct(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/data/${id}`)
			fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = (product) => {
		setSelectedProduct(product);
		setShowForm(true);
	};

	useEffect(() => {
		const delay = setTimeout(() => {
			fetchData();
		}, 1000)
		return () => clearInterval(delay)
	}, [search])


	return (
		<div className="w-3/4 m-auto">
			<div className="bg-teal-600 p-4 text-white">
				<p className="font-bold">Product Management</p>
			</div>
			<ProductList
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				product={product}
				fetchData={fetchData}
				setShowForm={setShowForm}
				setSingleProductID={setSingleProductID}
				setShowSingleItem={setShowSingleItem}
				setSearch={setSearch}
			/>
			<ProductForm
				showForm={showForm}
				setShowForm={setShowForm}
				fetchData={fetchData}
				selectedProduct={selectedProduct}
				setSelectedProduct={setSelectedProduct}
			/>
			<SingleItem
				showSingleItem={showSingleItem}
				setShowSingleItem={setShowSingleItem}
				product={product}
				setSingleProductID={setSingleProductID}
				singleProductID={singleProductID}
			/>
		</div>
	)
}

export default App