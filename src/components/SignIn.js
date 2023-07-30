import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import styled from 'styled-components';
import { Paper } from "@mui/material";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: top;
  align-content: top;
  justify-content: top;
  padding: .75rem
`;

const Input = styled.input`
  width: 287px;
  padding: .88rem 0;
  border: 2px solid #FF9494;
  border-radius: 3px;
  margin-bottom: .5rem;
  color: #010c3f;
  text-align: center;
  font-size: 1rem;
  /* color: #FF9494; */
  background-color: #FFF5E4;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

function SignIn(){  
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);


  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`) 
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      });
  }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
      <Wrapper>
        <React.Fragment>
          <h1>Sign up</h1>
          {signUpSuccess}
          <Form onSubmit={doSignUp}>
            <Input
              type='text'
              name='email'
              placeholder='email' />
            <Input
              type='password'
              name='password'
              placeholder='Password' />
            <button type='submit'>Sign up</button>
          </Form>
          <h1>Sign In</h1>
          {signInSuccess}
          <Form onSubmit={doSignIn}>
            <Input
              type='text'
              name='signinEmail'
              placeholder='email' />
            <Input
              type='password'
              name='signinPassword'
              placeholder='Password' />
            <button type='submit'>Sign in</button>
          </Form>
          <h1>Sign Out</h1>
          {signOutSuccess}
          <br />
          <button onClick={doSignOut}>Sign out</button>
        </React.Fragment>
      </Wrapper>
  );
}

export default SignIn