import React from "react";
import "./Nav.css";


export default function Nav({setIsCreate}) {

  return (
    <div className="nav-container">
      <p>For You</p>
      <span>Tags</span>
      <button onClick={() => setIsCreate(true)} >
                    
                    Create
                </button>
    </div>
  );
}
