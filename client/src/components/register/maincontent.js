import React , { Component } from "react";
import { userRegistration } from "../../actions/registerActions";
import { connect } from "react-redux";
import { Redirect ,  withRouter  } from "react-router-dom";
class MainContent extends Component {

    constructor() {

        super();

        this.state = {
            name : "",
            email : "",
            username : "",
            password : "",
            name_error : "",
            email_error : "",
            username_error : "",
            password_error : ""

        };
        this.handleInputEvent = this.handleInputEvent.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    handleInputEvent(e) {
        this.setState({
            [e.target.name] : [e.target.value]
        });

        if(e.target.name === "name") {
            this.setState({
                name_error : ""
            });
        }
        if(e.target.name === "email") {
            this.setState({
                email_error : ""
            });
        }

        if(e.target.name === "username") {
            this.setState({
                username_error : ""
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
        document.getElementById("myBtn").disabled = true; 
        e.preventDefault();
        var check = true;

        if(this.state.name === "") {

            this.setState({

                name_error : "Name Required"
            });

            check = false;

        }

        if(this.state.email === "") {

            
            this.setState({

                email_error : "Email Required"
            });

            check = false;
        }

        if(this.state.username === "") {

            this.setState({

                username_error : "Username Required"
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

        this.props.userRegistration(this.state,this.onSuccess, this.onFailure);

        }


    }   

    onSuccess() {
       //successfull registeration

       //alert("You are successfully registrared with us");
       this.props.history.push("/registersuccess");

    }

    onFailure(msg) {
       //failed registration
        alert(msg);
         document.getElementById("myBtn").disabled = false; 
    }


    render() {    

    // if (this.props.registerStatus.status === true) {
    //   return <Redirect to='/' />
    // }
      

        return(

      
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><i className="fa fa-user"></i>Register .
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit} method="post">
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" id="name" value={this.state.name}  name="name" aria-describedby="emailHelp" onChange={this.handleInputEvent}  placeholder="Enter name"  />
                                    <small id="emailHelp" className="form-text  text-danger">{this.state.name_error}</small>

                                </div>
                                <div className="form-group">
                                    <label >Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email}  aria-describedby="emailHelp" onChange={this.handleInputEvent}  placeholder="Enter email"  />
                                     <small id="emailHelp" className="form-text  text-danger">{this.state.email_error}</small>

                                </div>
                              <div className="form-group">
                                    <label >Username</label>
                                    <input type="text" className="form-control" id="email"   name="username" value={this.state.username} aria-describedby="emailHelp" onChange={this.handleInputEvent}  placeholder="Enter Username "  />
                                    <small id="emailHelp" className="form-text  text-danger">{this.state.username_error}</small>

                                </div>
                                 <div className="form-group">
                                    <label >Password</label>
                                    <input type="password" className="form-control" id="email"  name="password" aria-describedby="emailHelp" value={this.state.password} onChange={this.handleInputEvent} placeholder="Enter Password"  />
                                    <small id="emailHelp" className="form-text  text-danger">{this.state.password_error}</small>

                                </div>
                                <div className="mx-auto">
                                <button type="submit" id="myBtn" className="btn btn-primary text-right">Submit</button></div>
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
        
        registerStatus : state.customerRegister
    });

    export default connect(mapStateToProps,{userRegistration})(withRouter(MainContent));