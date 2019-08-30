import React , { Component } from "react";
import { userLogin } from "../../actions/loginActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class MainContent extends Component {

    constructor() {

        super();

        this.state = {
            email : "",
            password : "",
            email_error : "",
            password_error:""
        };
        this.handleInputEvent = this.handleInputEvent.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

    handleInputEvent(e) {
        this.setState({
            [e.target.name] : [e.target.value]
        });
        if(e.target.name === "email") {
            this.setState({
                email_error : ""
            });
        }

        if(e.target.name === "password") {
            this.setState({
                password_error : ""
            });
        }
        e.preventDefault();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        var check = true;

        if(this.state.email === "") {

            this.setState({

                email_error : "Email Required"
            });

            check = false;

        }

        if(this.state.password === "") {

            
            this.setState({

                password_error : "Password Required"
            });

             check = false;
        }

        if(check) {

             this.props.userLogin(this.state,this.onSuccess, this.onFailure);

        }


    }   

    onSuccess() {
       //successfull registeration

       alert("You are successfully login with us");
       this.history.push("/");
    }

    onFailure(msg) {
       //failed registration
        alert(msg);
    }


    render() {    

    if (this.props.loginStatus.status === true) {
      return <Redirect to='/' />
    }
      

        return(

      
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><i className="fa fa-user"></i> Login.
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit} method="post">
                         
                                <div className="form-group">
                                    <label >Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email}  aria-describedby="emailHelp" onChange={this.handleInputEvent}  placeholder="Enter email"  />
                                    <small id="emailHelp" className="form-text  text-danger">{this.state.email_error}</small>
                                </div>
    
                                 <div className="form-group">
                                    <label >Password</label>
                                    <input type="password" className="form-control" id="email"  name="password" aria-describedby="emailHelp" value={this.state.password} onChange={this.handleInputEvent} placeholder="Enter Password"  />
                                     <small id="emailHelp" className="form-text  text-danger">{this.state.password_error}</small>
                                </div>
                                <div className="mx-auto">
                                <button type="submit" className="btn btn-primary text-right ">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
            
        );

        }

    }

    const mapStateToProps = (state) => ({
        
        loginStatus : state.customerLogin
    });

    export default connect(mapStateToProps,{userLogin})(MainContent);