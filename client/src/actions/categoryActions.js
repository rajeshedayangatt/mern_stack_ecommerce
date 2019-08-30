import { GET_CATEGORIES  } from "./type";
import axios from "axios";

export const getCategories = (successcall) => dispatch =>  {

	axios.get("/api/categories")
			.then((res) => {

					dispatch({
						type : GET_CATEGORIES,
						payload : res.data
					});
					successcall();
			});


	
}