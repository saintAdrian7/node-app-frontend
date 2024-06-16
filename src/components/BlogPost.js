import React from "react";
import ProfilePic from './Profile'

export default function BlogPost({ post }) {
  const [comments, setComments] = React.useState([]);
  const [showComments, setShowComments] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [likes, setLikes] = React.useState(post.likes);

  const createComment = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userId = user?.userId;
    
    if (!token) {
      console.error('User token not found');
      return;
    }
   const author = userId
   
  const postId = post._id; 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({ content, author, postId })
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const message = await response.json();
      setContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const fetchComments = async () => {
    const postId = post._id; 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${postId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      if (!data || data.length === 0) {
       
      } else {
        setComments(data);
        setShowComments(true);
        console.log(data)
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const handleLike = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${post._id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
  
     
      setLikes(prevLikes => prevLikes + 1); 
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return(
    <div className="post">
      <div className="details">
      <ProfilePic username={post.author.username}/>

      <h5 className="username">{post.author.username}</h5>
      </div>
      <h4>{post.title}</h4>
      <div className="post-content">
      <p>{post.content}</p>

      {showComments &&  <div>
      <h5>Comments:</h5>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment.content}</li>
              ))}
            </ul>
          )}
      </div>}
      {showComments &&  <form className="comment-form"  onSubmit={createComment}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
                required
            ></textarea>
            <button className="comment-btn" type="submit">Post Comment</button>
        </form>} 
     

      <div className="buttons">
      <span>{likes}</span>
      <button className="like-button" onClick={handleLike}>🤍</button>
      <button className="comment-button" onClick={() => { fetchComments(); setShowComments(prev => !prev); }}>
  🗪
</button>

      </div>
      

      </div>
      
    </div>
  )
  }
  
  
  