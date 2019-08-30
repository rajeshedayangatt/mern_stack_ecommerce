import { LOGIN_USER ,LOGIN_FAILED,LOGOUT_USER } from "../actions/type";

const initialState = {
	token : {} ,
	user : {} ,
	status : {},
	message : {}
};

export default function (state = initialState , action) {
	switch(action.type) {
		case LOGIN_USER :
		return Object.assign({}, state, {
		        token: action.payload.token,
		        user: action.payload.user,
		        status:true
		      });
		case LOGIN_FAILED :
		return  Object.assign({}, state, {
		        status: false,
		        message : action.payload
		      });

		case LOGOUT_USER :
		return { ...state, user: {} ,status : false , token : {} }	
		default :
			return state;
	}

}