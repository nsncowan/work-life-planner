import React from "react";
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

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


export default function Wecome() {


  return(
    <>
      <Wrapper>
        <h1>Welcome</h1>
        <Form>
              <Input
                className="sign-in"
                type="text"
                name='sign-in'
                placeholder="Sign In Here" />
              <button type="submit">Sign In</button>
            </Form>
      </Wrapper>
    </>
  
  )
}
