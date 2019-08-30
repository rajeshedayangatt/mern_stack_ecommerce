import React ,{Component} from "react";
import { Link ,withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../actions/loginActions";
class DropDown extends Component {

	constructor(props) {

		super();
		if(typeof(props.customerlogin.status) === "object") {
		this.state = {
			showUserli : false,
			userLogined : false
		}
			
		}else{
			console.log("ddd");
					this.state = {
			showUserli : false,
			userLogined : props.customerlogin.status
			}
		}



		this.successCallback = this.successCallback.bind(this);
	}

	componentWillReceiveProps(props) {

		this.setState({
			userLogined : props.customerlogin.status

		});

	}

	toggleNav(e) {

		e.preventDefault();

		if(this.state.showUserli){
					this.setState({

				showUserli : false
		});
		}else{
					this.setState({

				showUserli : true
		});
		}



	}
    handleLogout(e) {
        e.preventDefault();
       
        this.props.userLogout(this.successCallback);
        

    }

    successCallback() {
    		 localStorage.removeItem("token");
	    	 this.setState({

	        		userLogined : false,
	        		showUserli : false
	        });

    		 this.props.history.push('/');
    }


	render(){
		if(this.state.userLogined) {


				return(
			 <ul className="nav pull-right">
			 <li className="dropdown"><a href="#"  onClick={this.toggleNav.bind(this)}  className="dropdown-toggle" data-toggle="dropdown">Welcome, User <b class="caret"></b></a>
                   
                   
                    {
                    	this.state.showUserli && (
             			 <ul className="dropdown-menu" id="showUser" style={{display : 'block' ,padding : '10px'}} >
                            <li><a href="/user/preferences"><i className="icon-cog"></i> Profile</a></li>
                            <li><a href="/help/support"><i className="icon-envelope"></i>Wish List</a></li>
                           <li><Link to="/myorder"><i className="icon-envelope"></i>My Order</Link></li>

                            <li className="divider"></li>
                            <li>

                            <a href="#" onClick={this.handleLogout.bind(this)}><i className="icon-off"></i>Logout</a>

                            </li>
                        </ul>
                    	) 

                    }
          
                    </li>
                </ul>
		)

		}else{

			return(

 		<ul className="nav pull-right">
			 <li className="dropdown"><a href="#"  onClick={this.toggleNav.bind(this)}  className="dropdown-toggle" data-toggle="dropdown">Join With Us<b class="caret"></b></a>
                   
                   
               {
                    	this.state.showUserli && (
             			 <ul className="dropdown-menu" id="showUser" style={{display : 'block' ,padding : '10px'}} >


                            <li><Link to="/register"><i className="icon-cog"></i> Register</Link></li>
                            <li><Link to="/login"><i className="icon-envelope"></i>Login</Link></li>
                        
                        </ul>
                 ) 

                    }
          
                    </li>
                </ul>

			)
		}

	}

};

const mapStateToProps = (state) => ({
    cartcount : state.cart,
    customerlogin : state.customerLogin

});


export default connect(mapStateToProps,{ userLogout })(withRouter(DropDown));
