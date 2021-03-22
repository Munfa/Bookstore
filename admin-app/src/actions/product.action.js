import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

// export const addProduct = (form) => {
//     return async dispatch => {
//         const res = await axiosInstance.post(`/product/create`, form);
//         console.log(res);
//     }
// }

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST });
        try{

            const res = await axiosInstance.post(`/product/create`, form);
            console.log(res);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
                    payload: { product: res.data.product }
                });
            } else {
                dispatch({
                    type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                    payload: { error: res.data.error }
                });
            }

        }catch(error){
            console.log(error.response);
        }
        
    }
}