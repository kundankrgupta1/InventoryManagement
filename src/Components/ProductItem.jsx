import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"

const ProductItem = ({ index, id, itemName, description, price, stock, handleDelete, handleEdit, setSingleProductID, setShowSingleItem }) => {
	return (
		<tr key={index} className="">

			<td
				className="p-2 border-[1px] border-solid text-center underline text-blue-800"
				onClick={() => { setShowSingleItem(true), setSingleProductID(id) }}
			>
				{id}
			</td>

			<td
				className="p-2 border-[1px] border-solid truncate max-w-xs overflow-hidden"
			>
				{itemName}
			</td>

			<td
				className="p-2 border-[1px] border-solid truncate max-w-xs overflow-hidden"
			>
				{description}
			</td>
			
			<td
				className="p-2 border-[1px] border-solid  text-right"
			>
				{Number(price).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
			</td>
			<td
				className="p-2 border-[1px] border-solid  text-center"
			>
				{stock > 0 ?
						<><p className="text-green-500 font-bold">In stock</p></> :
						<><p className="text-red-500 font-bold">Out of stock</p></>}
			</td>
			<td
				className="p-2 border-[1px] border-solid text-center"
			>
				{stock} nos
			</td>
			<td
				className="p-2 border-[1px] border-solid  text-center"
			>
				<button
					onClick={() => handleEdit({ id, itemName, description, price, stock })}
					className="text-blue-500"
				>
					<AiFillEdit />
				</button>
			</td>
			<td
				className="p-2 border-[1px] border-solid text-center"
			>
				<button
					onClick={() => handleDelete(id)}
					className="text-red-500"
				>
					<MdDelete />
				</button>
			</td>
		</tr>
	)
}

export default ProductItem