import { GET_CART_COUNT ,CHECKOUT_CART ,GET_CART_ITEMS , CART_SAVE ,CART_QUANTITY_UPDATE ,CART_REMOVE} from "../actions/type";

const initialState = {
	cart_count : 0,
	cart_data : [],
	checkout_status : false 
};

export default function (state = initialState , action) {

	switch(action.type) {
		case GET_CART_COUNT :
		   return { ...state, cart_count: action.payload }
		case CHECKOUT_CART :
		   return { ...state, checkout_status: action.payload }	
		case GET_CART_ITEMS :
		   return { ...state, cart_data: action.payload }	
		case CART_SAVE :
		   return { ...state, cart_data: action.payload }	
		case CART_QUANTITY_UPDATE:
		   return { ...state, cart_data: action.payload }	
		case CART_REMOVE:
		   return { ...state, cart_data: action.payload }
		default :
			return state;
	}

}