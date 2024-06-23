import React from "react";
import ProfilePic from './Profile'; 
import { useAppContext } from "../Hooks/useAppContext"; 


export default function BlogPost({ post }) {
  const [showComments, setShowComments] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [likes, setLikes] = React.useState(post.likes);
  const [comments, setComments] = React.useState([]);
  const [isLiked, setIsLiked]= React.useState(false);


const checkIfLiked = async () => {
  const userString = localStorage.getItem('user');
  if (!userString) {
    console.error('User not found in localStorage');
    return;
  }

  const user = JSON.parse(userString);
  const userId = user?.userId;
  try {
    const response = await fetch(`https://node-app-backend-1.onrender.com/api/posts/${post._id}/likedBy/${userId}`);
    if (response.ok) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  } catch (error) {
    console.error('Error checking if post is liked:', error);
  }
};

React.useEffect(() => {
  checkIfLiked();
}, [post._id]);


  // Function to fetch comments for a specific post
  const fetchComments = React.useCallback(async () => {
    const postId = post._id;
    try {
      const response = await fetch(`https://node-app-backend-1.onrender.com/api/comments/${postId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post._id]);

  // Function to create a new comment
  const createComment = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    const userId = user?.userId;

    if (!token) {
      console.error('User token not found');
      return;
    }

    const postId = post._id;
    const newComment = { content, author: userId, postId };

    try {
      const response = await fetch('https://node-app-backend-1.onrender.com/api/comments/', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert('Failed to create comment. Try again.');
        return;
      }
      setContent('');
      fetchComments();

    } catch (err) {
      console.error('Error creating comment:', err);
      alert('Failed to create comment. Try again.');
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`https://node-app-backend-1.onrender.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      fetchComments()

    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Try again.');
    }
  };

  // Function to handle liking a post
  const handleLike = async () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('User not found in localStorage');
      return;
    }
  
    const user = JSON.parse(userString);
    const userId = user?.userId;
  
    try {
      const response = await fetch(`https://node-app-backend-1.onrender.com/api/posts/${post._id}/like`, {
        method: 'PATCH',
        body: JSON.stringify({ userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
  
      setLikes(prevLikes => prevLikes + 1); 
      setIsLiked(true)
  
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const handleUnlike = async () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('User not found in localStorage');
      return;
    }
  
    const user = JSON.parse(userString);
    const userId = user?.userId;
  
    try {
      const response = await fetch(`https://node-app-backend-1.onrender.com/api/posts/${post._id}/unlike`, {
        method: 'PATCH',
        body: JSON.stringify({ userId }), 
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to unlike post');
      }
  
      setLikes(prevLikes => prevLikes - 1); 
      setIsLiked(false);
  
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  return (
    <div className="post">
      <div className="details">
        <ProfilePic username={post.author.username} />
        <h5 className="username">{post.author.username}</h5>
      </div>
      <h4>{post.title}</h4>
      <div className="post-content">
        <p>{post.content}</p>

        {showComments && (
          <div className="comment-section">
            <h4>Comments:</h4>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <div className="comment-header">
                    <div className="comment-info">
                      <ProfilePic username={comment.author.username} />
                      <h5 className="comment-username">{comment.author.username}</h5>
                    </div>
                    <button className="comment-delete-btn" onClick={() => deleteComment(comment._id)}>Delete</button>
                    </div>
                    <p>{comment.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showComments && (
          <form className="comment-form" onSubmit={createComment}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              required
            ></textarea>
            <button className="comment-btn" type="submit">Post Comment</button>
          </form>
        )}

        <div className="buttons">
          <span>{likes}</span>
          <button className="like-button" onClick={isLiked ? handleUnlike : handleLike}>
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button className="comment-button" onClick={() => {
            setShowComments(prev => !prev);
            if (!showComments) {
              fetchComments(); 
            }
          }}>🗪</button>
        </div>

      </div>
    </div>
  );
}
