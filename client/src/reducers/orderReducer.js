import { ORDER_SAVE} from "../actions/type";

const initialState = {
};

export default function (state = initialState , action) {

	switch(action.type) {
		case ORDER_SAVE :
		   return state;
		default :
			return state;
	}

}