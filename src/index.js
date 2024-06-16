import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style.css"
import { PostContextProvider } from './context/postContext';
import { AuthProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <PostContextProvider>
     <AuthProvider>
     <App />
     </AuthProvider>
   
    </PostContextProvider>
    
  
);
