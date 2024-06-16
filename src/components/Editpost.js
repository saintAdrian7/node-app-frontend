import React, { useState, useEffect } from "react";
import "./WriteBlogForm.css";
import { usePostContext } from "../Hooks/usePostContext";

export default function WriteBlogForm({ setIsCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [drafts, setDrafts] = useState([]);
const [message, setMessage] = useState('')

  useEffect(() => {
    // Load drafts from localStorage on component mount
    const myDrafts = localStorage.getItem('drafts');
    const parsedDrafts = JSON.parse(myDrafts);
    if (parsedDrafts && parsedDrafts.length > 0) {
      setDrafts(parsedDrafts);
    }
  }, []);

  function saveDraft(event) {
    event.preventDefault();
    const newDraft = {
      title,
      content,
      date: new Date().toISOString() // Adding date to the draft
    };
    const updatedDrafts = [...drafts, newDraft];
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    setTitle('');
    setContent('');
  }

  function deleteDraft(index) {
    const updatedDrafts = [...drafts];
    updatedDrafts.splice(index, 1);
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
  }

  function loadDraft(index) {
    const draftToLoad = drafts[index];
    setTitle(draftToLoad.title);
    setContent(draftToLoad.content);
  }

  async function handleSubmit(event) {
    event.preventDefault();

  const userData = JSON.parse(localStorage.getItem('user'));

  if (!userData || !userData.token) {
    console.error('No user token found in localStorage');
    return;
  }

  if (title.trim() === '' || content.trim() === '') {
    alert('Please fill in both title and content fields.');
    return;
  } else if (content.length < 100) {
    alert("The content must be 100 characters long!");
    return;
  }

  const newPost = {
    title,
    content,
  };

  try {
    const response = await fetch('/api/posts', {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${userData.token}`
      }
    });

    if (!response.ok) {
    // Handle non-OK responses
      const errorText = await response.text();
      console.error('Error response:', errorText);
      alert('Failed to create post. Check the console for details.');
      return;
    }

    const post = await response.json();
    setMessage(post.msg);
    setIsCreate(false);
    setTitle('');
    setContent('');
  } catch (error) {
    console.log('Error creating post:', error);
    alert('Error creating post. Check the console for details.');
  }
  }

  return (
    <div className="write-blog-container">
      <div className="form2-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <h1>{message}</h1>
          <button id="post-btn" type="submit">
            Post
          </button>
          <button id="post-btn" onClick={saveDraft}>Save Draft</button>
        </form>
      </div>
      <div className="drafts-container">
        {drafts.length > 0 && <h3>Drafts</h3>}
        {drafts.map((draft, index) => (
          <div key={index} className="draft">
            <h4>{draft.title}</h4>
            <p>{draft.content}</p>
            <p><small>{new Date(draft.date).toLocaleString()}</small></p>
            <div className="draft-actions">
              <button onClick={() => loadDraft(index)}>Edit</button>
              <button onClick={() => deleteDraft(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
