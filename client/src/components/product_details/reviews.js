import React from "react";

const Review = (props) => {


      const rating = [];

     for(let i = 0; i < parseInt(props.review_rate);i++) {
          rating.push(<span className='fa fa-star'></span>);
      }



	return(
			<div className="review">
                                        <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                                        <div itemProp="datePublished" content="01-01-2016">{props.reviewed_on}</div>
                                        {rating}
                                        by {props.reviewed_by}
                                        <div className="blockquote">
                                            <p className="mb-0">{props.review}</p>
                                        </div>
                                        <hr />
			 </div>
		)
}


export default Review;