// contexts.js
import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  posts: null,
  comments: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'CREATE_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'DELETE_POST':
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload.id) };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'CREATE_COMMENT':
      return { ...state, comments: [...(state.comments || []), action.payload] };
    case 'DELETE_COMMENT':
      return { ...state, comments: (state.comments || []).filter(comment => comment._id !== action.payload.id) };
    default:
      return state;
  }
};

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;