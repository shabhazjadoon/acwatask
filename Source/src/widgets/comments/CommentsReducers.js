"use strict"
export function commentsReducers(state = { comments: [
    {
         _id: 1,
        title: "book 1",
        desc: "book 1 desc",
        price: 23.00
    },
    {
         _id: 2,
        title: "book 2",
        desc: "book 2 desc",
        price: 22.00
    },
    {
         _id: 3,
        title: "book 3",
        desc: "book 3 desc",
        price: 13.00
    }
] }, action) {

    switch(action.type){
        case "POST_COMMENT":
        return state = {
            comments : [...state.comments, ...action.payload]
        };
        break;

        case "GET_COMMENTS":
        return {...state, comments:[...state.comments]};
        break;

        // case "DELETE_BOOKS":
        // const deleteBooksArray = [...state.books];
        // console.log(action.payload);
        // const deleteIndex = deleteBooksArray.findIndex(
        //     function(item){
        //         return item._id == action.payload._id
        //     }
        // )

        // return state = {
        //     books : [...deleteBooksArray.slice(0,deleteIndex), ...deleteBooksArray.slice(deleteIndex+1)],
        // }; 
       
        // break;
    }
    return state ;
    
}