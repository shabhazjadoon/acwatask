import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from '../Store';
import CommentList from '../widgets/comments/CommentList';

class Comments extends Component {
  render() {
    return (
      <Provider store={store} >
        
        <div>
          comments app
          <CommentList/>
        </div>
      
      </Provider>
    );
  }
}

export default Comments;
