import React from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import Rightbar from "../components/Rightbar";
import BlogPost from '../components/BlogPost';
import { usePostContext } from "../Hooks/usePostContext";

export default function Home({setIsCreate}) {
  const { posts, dispatch } = usePostContext();

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts}`);
        const json = await response.json(); 
        if (response.ok) { 
          dispatch({ type: 'SET_POSTS', payload: json });
          console.log(json);
        } else {
          console.error('Failed to fetch posts', json);
        }
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <>
      <Nav setIsCreate={setIsCreate}/>
      <div className="Blog-container">
        <Rightbar />
        <div className="content-container">
          {posts && posts.map((post) => (
            <BlogPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
