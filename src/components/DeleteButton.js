import React from "react";
import styled from 'styled-components';

const DeleteButton = styled.button`
padding-left: 10px;
color: #888;
font-weight: bold;
float: right;
font-size: 20px;
cursor: pointer; 
`;


export default function DeleteButton(props) {
  const { deleteItem } = props;

  return(
    <DeleteButton type="button" id="previousDay" onClick={deleteItem}>X</DeleteButton>
  )
}