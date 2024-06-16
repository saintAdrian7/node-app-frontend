import React from "react";
import { createContext } from "react";

export const PostContext = createContext();

export function postReducer(state, action) {
    switch(action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            };
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            };
        case 'DELETE_POST':
            return {
                posts: state.posts.filter(post => post._id !== action.payload.id)
            };
        default:
            return state;
    }
}

export function PostContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(postReducer, {
        posts: null
    });

    return (
        <PostContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
}

export default PostContextProvider;