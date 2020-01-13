// "use strict"
// import React from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {postBooks} from '../../Actions';
// import {findDOMNode} from 'react-dom';
// import Widget from '../Widget';


// class PostBookForm extends React.Component{
//     constructor(){
//         super();
//     }

//     handleSubmit(){
//         const book = [{
//            //  _id: Date.now(),
//             title: this.refs.title.value,
//             desc: this.refs.desc.value,
//             price: this.refs.price.value
//           }];
//         this.props.postBooks(book);
//     }

//     render(){

//         return(
//             <Widget name="postBookForm">
//     <fieldset className="uk-fieldset">

//         <legend className="uk-legend">Post A Book</legend>

//         <div className="uk-margin">
//             <input className="uk-input" type="text" placeholder="Book Title" name="title" ref="title" />
//         </div>

//         <div className="uk-margin">
//             <input className="uk-input" type="text" placeholder="Description" name="desc" ref="desc" />
//         </div>


//         <div className="uk-margin">
//             <input className="uk-input" type="number" placeholder="Price" name="price" ref="price" />
//         </div>



//     </fieldset>

//     <button className="uk-button uk-button-primary" onClick={this.handleSubmit.bind(this)}>Post Book</button>
//     </Widget>
//         )
//     }

// }

// function mapStateToProps(state){
//     return {
//         books: state.books.books,
//     }
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({postBooks},dispatch);
// }

// export default connect(mapStateToProps,mapDispatchToProps)(PostBookForm);
// //export default postBook