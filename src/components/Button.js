import React from "react";
import styled from 'styled-components';

export default function Button() {
  const Button = styled.button `
    cursor: pointer;
    width: 8.11rem;
    padding: .77rem 0;
    border-radius: 54px;
    background-color: #FFF5E4;
    text-align: center;
    font-size: .833rem;
    transition: background-color .25s;
    border: 2px solid #FF9494;
    color: #FF9494;
    font-weight: 500;
    &:hover {
      color: #FFF5E4;
      background-color: #FF9494;
    }
  `;
  
}