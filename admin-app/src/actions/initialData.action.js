import { categoryConstants, productConstants } from "./constants";
import axiosInstance from "../helpers/axios";


export const getInitialData = () => {
    return async dispatch => {
        try {
            const res = await axiosInstance.post(`/initialData`);
            if (res.status === 200) {
                const { categories, products } = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: { categories }
                });
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: { products }
                });
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}