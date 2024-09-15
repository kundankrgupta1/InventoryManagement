import ProductItem from "./ProductItem"
import { LuBoxes } from "react-icons/lu"
import { IoIosSearch, IoMdRefresh } from "react-icons/io"

const ProductList = ({ product, setSearch, setShowForm, fetchData, handleDelete, handleEdit, setSingleProductID, setShowSingleItem }) => {


	return (
		<div>
			<div className="shadow-md p-2 flex justify-between items-center">
				<div className="flex justify-between items-center gap-4 py-1 shadow-md">
					<input
						type="text"
						placeholder="search for product..."
						className="outline-none px-2 py-1"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button><IoIosSearch /></button>
				</div>
				<div className="flex items-center gap-4">
					<button onClick={() => fetchData()} className="flex items-center gap-2 text-md font-bold float-right bg-blue-700 p-2 rounded-md text-white"><IoMdRefresh />Refresh</button>
					<button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-md font-bold float-right bg-blue-700 p-2 rounded-md text-white"><LuBoxes />Add new product</button>
				</div>
			</div>

			<div className="overflow-y-scroll text-sm h-[80vh] mt-5 shadow-md">
				<table className="w-full">
					<thead className="text-center border-t-blue-800 border-t-[2px] border-t-solid">
						<tr>
							<th className="p-2">ID</th>
							<th className="p-2">Item Name</th>
							<th className="p-2">Description</th>
							<th className="p-2">Price</th>
							<th className="p-2">Stock</th>
							<th className="p-2">Qty</th>
							<th className="p-2">Edit</th>
							<th className="p-2">Delete</th>
						</tr>
					</thead>
					<tbody>
						{product.map((e, index) => <ProductItem key={index} {...e} handleDelete={handleDelete} handleEdit={handleEdit} setSingleProductID={setSingleProductID} setShowSingleItem={setShowSingleItem} />)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ProductList