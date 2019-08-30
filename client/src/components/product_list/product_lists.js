import React from "react";
import { Link } from "react-router-dom";


const imgstyle = {
	width:'600',
	height : '400'
};


    const cartAdd = (data) => {
        data.cartSave(data);
        return false;
    }

const ProductList = (props) => {


	return(


     	 <div className="col-12 col-md-6 col-lg-4" onMouseEnter={props.changeCursor} onClick={props.redirectDetails.bind(this,props.id)}>
                    <div className="card">
                        <img className="card-img-top" src={props.image} alt="Card image cap" style={imgstyle} />
                      
                        <div className="card-body">
                            <h4 className="card-title"><Link to={"details/"+props.id} title="View Product">{props.title}</Link></h4>
                            <div className="row">
                                
                                <div className="col">
                                <p>{props.description.substr(0,50) }</p>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col">
                                    <p className=""><strong> &#8377; {props.price}</strong></p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                


		)

};

export default ProductList;