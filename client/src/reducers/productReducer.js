import { GET_PRODUCTS,GET_BESTPRODUCT,GET_PRODUCT } from "../actions/type";


const initialState = {
	products: [],
	product_selling : {},
	product : {}
};

export default function(state = initialState,action) {

	switch(action.type) {
		case  GET_PRODUCTS :
		 return Object.assign({}, state, {
		        products: action.payload
		      })
		
		case  GET_BESTPRODUCT :
		 	      return { ...state, product_selling: action.payload }
		case  GET_PRODUCT :
		 	      return { ...state, product: action.payload }
		default :
			return state;
	}
}