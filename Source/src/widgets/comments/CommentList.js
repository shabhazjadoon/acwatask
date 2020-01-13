"use strict"

import React, {Component} from 'react';

import store from '../../Store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getComments } from '../../Actions';
import CommentItem from './CommentItem';


class CommentList extends Component{
    constructor(){
        super();
        //store.dispatch(getBooks());
    }
    componentDidMount(){
     //   const b = this.props.getComments();
    }
    render(){
        const commList = this.props.comments.map(function(commArr){
            return(
                <li key={commArr._id} >
                <CommentItem id={commArr._id} title={commArr.title} desc={commArr.desc} price={commArr.price}  />
                </li>
                
            )
        })
        return(

            <div>
                <h1>Comments List</h1>
                <ul className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l"  data-uk-grid>
                {commList}
                </ul>

            </div>
        )
    }
    
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getComments:getComments},dispatch);
}

function mapStateToProps(state) {
    return{
        comments: state.comments.comments
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);