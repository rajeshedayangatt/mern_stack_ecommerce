import { REGISTER_USER ,REGISTER_FAILED } from "../actions/type";

const initialState = {
	token : {} ,
	user : {} ,
	status : {},
	message : {}
};

export default function (state = initialState , action) {
	switch(action.type) {
		case REGISTER_USER :
		return Object.assign({}, state, {
		        token: action.payload.token,
		        user: action.payload.user,
		        status:true
		      });
		case REGISTER_FAILED :
		return  Object.assign({}, state, {
		        status: false,
		        message : action.payload
		      });
		default :
			return state;
	}

}