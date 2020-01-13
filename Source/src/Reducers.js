"use strict"

import {combineReducers} from 'redux';
import {commentsReducers} from './widgets/comments/CommentsReducers';
//import {cartReducers} from './widgets/cart/cartReducers';

export default combineReducers({
   comments: commentsReducers,
    //cart: cartReducers,

});

