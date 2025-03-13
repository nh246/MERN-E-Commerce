import { useParams } from "react-router"
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi"

function SingleProduct() {
    const {id} = useParams()
    const {data} = useFetchProductByIdQuery(id)
    console.log(data)
  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct