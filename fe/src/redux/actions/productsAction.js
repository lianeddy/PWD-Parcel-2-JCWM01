import axios from "axios";
import { API_URL } from "../../constants/API";

export const fetchProducts = () => {
    return (dispatch) => {
        axios.get(`${API_URL}/products/get`)
        .then((res) => {
            dispatch({
                type: "FETCH_PRODUCTS",
                payload: res.data
            })
        }).catch((err) => {
            console.log(`ERROR Fetch Products : ${err}`);
        })
    }
}