"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {postComments} from '../../Actions';
import {bindActionCreators} from 'redux';

class CommentItem extends React.Component{

    handleAddToCart(){
        const book = [{
             
            title: 'static',
            desc: 'static',
            price: 0
        }]

        // if(this.props.cart.length){
        //   let _id = this.props._id;
          
        //   let cartIndex = this.props.cart.findIndex(function(cart){
        //     return cart._id === _id;
        //   });
          
        //   if(cartIndex === -1){
        //     console.log('trigger add to cart');
        //     this.props.addToCart(book);  
        //   }
        //   else{
        //     let newItem = Object.assign({}, this.props.cart[cartIndex]);
        //     newItem.quantity++;
        //     this.props.updateCart(newItem);
        //   }
        // }
        // else{
        //   this.props.addToCart(book);
        // }

        this.props.postComments(book);
        
    }

    render(){
        return(
            <div className="uk-card uk-card-secondary">
                          <div className="uk-card-header">
                            <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                              <div className="uk-width-expand">
                                <h3 className="uk-card-title uk-margin-remove-bottom">title</h3>
                                <p className="uk-text-meta uk-margin-remove-top"><time data-datetime="2016-04-01T19:00">price</time></p>
                              </div>
            
                            </div>
                          </div>
                          <div className="uk-card-body">
                            <p>body</p>
                          </div>
                          <div className="uk-card-footer">
                            <a className="uk-button uk-button-default">Read more</a>
                            <a className="uk-button uk-button-primary" onClick={this.handleAddToCart.bind(this)}>Buy</a>
                          </div>
                        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        cart: state.comments.comments,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({postComments},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentItem);