import { GET_PRODUCTS,GET_BESTPRODUCT,GET_PRODUCT } from "./type";
import axios from "axios";


export const getProducts = (id = "") => dispatch => {

	 axios.get("/api/products/"+id)
	 	  .then((res) => {

	 	  		dispatch({
	 	  			type : GET_PRODUCTS,
	 	  			payload : res.data
	 	  		})
	 	  });
}


export const getBestSellingProduct = (successcallback) => dispatch => {

	axios.get("/api/product/sellingbest/5c87c0558a3dc80bbc9e27aa")
			.then((res) => {
				dispatch({
					type : GET_BESTPRODUCT,
					payload : res.data
				});
				successcallback();
			})
} 



export const getProduct = (product_id) => dispatch => {

	axios.get("/api/product/"+product_id)
			.then((res) => {
				dispatch({
					type : GET_PRODUCT,
					payload : res.data
				})
			})
} 