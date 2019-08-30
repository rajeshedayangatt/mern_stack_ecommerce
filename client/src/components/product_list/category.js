import React ,{Component} from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/categoryActions";
import { getProducts  } from "../../actions/productActions";

const productcategory = (props) => {

	console.log(props);

	props.handleCategoryChange();
}

const CategoryList = (props) => {

		return(

			  <li className="list-group-item">

			  	<a href="#" onClick={productcategory.bind(this,props)}>{props.title}</a>

			  </li>
                  
		);
}


class Category extends Component {

	constructor() {

		super();

		this.state =  {
		categories : []
		}

		this.cb = this.cb.bind(this);
	}


	componentDidMount() {

		this.props.getCategories(this.cb);
	}

	cb() {

		

		this.setState({

			categories : this.props.category.categories
		});

		console.log("loaded",this.state.categories.length);
	}

	categoryProducts(id) {


		 this.props.getProducts(id);  
		
	}


	render() {

		
					return(

				<ul className="list-group category_block">

					{
						this.state.categories.length > 0 ? (

						this.state.categories.map(
							category => {

							return <CategoryList 
							 title={category.category_name} 
							 key={category._id} 
							 handleCategoryChange={this.categoryProducts.bind(this,category._id)}
							 />

							})

						) : (


							 <li className="list-group-item"><img 
							 	src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" 
				                className="loader"
				                width="200"
				                height = "100"
				                /></li>
						)


					}

				</ul>

			);
	}

}


const mapStateToProps = (state) => ({
    category : state.category,
});


export default  connect(mapStateToProps,{ 
    getCategories , getProducts
})(Category);





