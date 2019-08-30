import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import registerUser from "./registerReducer";
import loginUser from "./loginReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";


export default combineReducers({
	category : categoryReducer,
	products : productReducer,
	customerRegister : registerUser,
	customerLogin : loginUser,
	cart : cartReducer,
	order : orderReducer
});