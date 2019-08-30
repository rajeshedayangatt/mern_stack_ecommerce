import React , { Component } from "react";

class Sidebar extends Component {


    render() {

        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li className="breadcrumb-item"><a href="category.html">Category</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Sub-category</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

        );

        }

    }

    export default Sidebar