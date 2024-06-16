import React from "react"
import "./Authenticate.css"

export default function Authenticate({setIsLoggedIn}){
const [email,setEmail] = React.useState('')
const [password,setPassword] = React.useState('')
const [ConfirmPassword,setConfirmPassword] = React.useState('')
const [error,setError]  = React.useState('')
const [signUp,setSignUp] = React.useState(false)
const [signIn,setSignIn] = React.useState(false)
const [username, setUsername] = React.useState('')



async function handleSubmit(event){
    event.preventDefault()
    if(password.length < 8 && ConfirmPassword.length < 8){
        setError("The password must be atleast 8 characters long")
        return
    }else{

        if(signUp){
            if(password !== ConfirmPassword){
                setError("The password do not match!")
                return
                
                }else{
                    
                      try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signUp}`, {
                          method: 'POST',
                          headers: { 
                            'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            username,
                            email,
                            password,
                          }),
                        });
                        const data = await response.json();
                        if (response.ok) {
                          localStorage.setItem('user', JSON.stringify(data));
                          setEmail('');
                          setPassword('');
                          setConfirmPassword('');
                          setError('');
                          setIsLoggedIn(true);
                          console.log(data)
                        } else {
                          setError(data.message);
                        }
                    }
                    
                    catch(err){
                      setError('Server error. Please try again later.')
                    }
                }
                
        }else{
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                        email,
                      password,
            }),
            });
            const data = await response.json();
            if (response.ok) {
              localStorage.setItem('user', JSON.stringify(data));
              setEmail('');
              setPassword('');
              setError('');
              setIsLoggedIn(true);
            } else {
              setError(data.message);
            }

          } catch (err) {
            setError('Server error. Please try again later.');
          }
        }
        }
    
     
    
    }
    

    return (
        <div className={`form-container ${signUp ? 'show-sign-up' : 'show-sign-in'}`}>
          <div className="signUp-container">
            {signUp ? (
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={ConfirmPassword}
                  placeholder="Confirm Password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                {error && <p className="error">{error}</p>}
                <button className="sign-btn" type="submit">SIGN UP</button>
              </form>
            ) : (
              <div className="signUp--message">
                <h2>Hello, welcome to TBN Blogging app.</h2>
                <p>Click here to sign up and start sharing moments</p>
                <button onClick={() => {setSignUp(true); setError('');setSignIn(false)}}>Sign up</button>
              </div>
            )}
          </div>
          
          <div className="signIn-container">
          {signIn ? ( <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <button className="sign-btn" type="submit">SIGN IN</button>
            </form>) : (<div className="signIn-message">
                <h2>Hello, welcome Back to TBN Blogging app.</h2>
                <p>Log In  to continue sharing moments</p>
                <button onClick={() => {setSignIn(true); setError('');setSignUp(false)}}>Log In</button>
              </div>) }
           
          </div>
        </div>
      );
    }