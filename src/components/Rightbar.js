import React, { useEffect } from "react";
import styled from 'styled-components';
import { FaEdit, FaTrash, FaBars, FaTimes,FaEye } from 'react-icons/fa';
import styles from './Sidebar.module.css';
import { useContext } from "react";
import { usePostContext } from "../Hooks/useAppContext";
import ProfilePic from './Profile'




export default function Rightbar({ posts = [], onDelete, onEdit }) {
    const [showRightSidebar, setShowRightSidebar] = React.useState(true);
    const [trendingPosts, setTrendingPosts] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('');
 
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let url = '/api/posts';

                
                if (searchQuery.trim() !== '') {
                    url += `https://node-app-backend-1.onrender.com?search=${encodeURIComponent(searchQuery.trim())}`;
                }

                const response = await fetch(url);
                const json = await response.json();
                if (response.ok) {
                    setTrendingPosts(json);
                } else {
                    console.error('Failed to fetch posts', json);
                }
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, [searchQuery]);
    function handleDelete(index) {
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (isConfirmed) {
            onDelete(index);
        }
    }


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://node-app-backend-1.onrender.com/api/posts?sort=likes`); 
                const json = await response.json();
                if (response.ok) {
                    setTrendingPosts(json);
                } else {
                    console.error('Failed to fetch posts', json);
                }
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []); 

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://node-app-backend-1.onrender.com/api/posts`);
                const json = await response.json(); 
                if (response.ok) { 
                  setTrendingPosts(json)
                } else {
                  console.error('Failed to fetch posts', json);
                }
              } catch (error) {
                console.error('Error fetching posts', error);
              } 
        }
    })

   
    useEffect(() => {
        function handleClickOutside(event) {
            if (showRightSidebar && !document.querySelector('.right-bar-container').contains(event.target) && !document.querySelector('.hamburger-right-sidebar').contains(event.target)) {
                setShowRightSidebar(false);
            }
        }

        /*document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };*/
    }, [showRightSidebar]);
    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {showRightSidebar 
                ? <FaTimes className="hamburger-right-sidebar" onClick={() => setShowRightSidebar(!showRightSidebar)} />
                : <FaEye className="hamburger-right-sidebar" onClick={() => setShowRightSidebar(!showRightSidebar)} />}
            
            <div className={`right-bar-container ${showRightSidebar ? 'show' : ''}`}>
                <h4>TBN BLOGGING APP</h4>
                <form className="search">
                    <input
                        type="text"
                        placeholder="Search posts by title..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>
               
                <div className="trending-posts">
                <h5>Trending Posts</h5>
                    
                    {trendingPosts.length > 0 ? (
                        <ul>
                            {trendingPosts.map((post, index) => (
                                <li key={index}>
                                    <div className="trending-post">
                                        <div className="use">
                                        <ProfilePic username={post.author.username}/>
                                        <h4>{post.author.username}</h4>
                                        </div>
                                   
                                        <h7>{post.title}</h7>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No trending posts</p>
                    )}
                    <hr />
                </div>
                <div className="user-posts">
                    <h6>Your Posts</h6>
                    <ul>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <li className="user-post" key={index}>
                                    <h7>Title: {post.title}</h7>
                                    <div className={styles.btnEl}></div>
                                    <button onClick={() => onEdit(index)} className={styles.btnEl1}><FaEdit /></button>
                                    <button onClick={() => handleDelete(index)} className={styles.btnEl2}><FaTrash /></button>
                                </li>
                            ))
                        ) : (
                            <p>No posts yet</p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}
