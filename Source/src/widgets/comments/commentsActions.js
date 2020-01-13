'use strict'
import axios from 'axios';

export function getComments(){
    return {
        type: "GET_BOOKS",
    }
}

export function postComments(comments){
    return {
        type: "POST_BOOKS",
        payload: comments,
    }
 
}

// export function deleteBooks(books){
//     return {
//         type: "DELETE_BOOKS",
//         payload: books,
//     }
// }