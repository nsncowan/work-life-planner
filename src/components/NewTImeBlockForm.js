import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

function NewTimeBlockForm(props) {

  // const Wrapper = styled.section`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // padding-top: 2rem;
  // margin-bottom: 2rem;
  // `;

  function handleFormSubmission2(e) {
    e.preventDefault();
    props.addTimeBlock1({
      name: e.target.name.value,
      category: e.target.categoryName.value,
    });
  }

  return (
    // <Wrapper>
      <React.Fragment>
        <form onSubmit={handleFormSubmission2}>
          <input
            className="timeblock-input"
            type="text"
            name='name'
            placeholder="name your TimeBlock" />
          <select name="categoryName">
            <option>Select a Category</option>
            {props.categoryList.map((cat) => <option value={cat.name}>{cat.name}</option>)}
          </select>
          <button type="submit">Add TimeBlock</button>
        </form>
      </React.Fragment>
    // </Wrapper>
  );
}

NewTimeBlockForm.propTypes = {
  addTimeBlock1: PropTypes.func,
  categoryList: PropTypes.array
};

export default NewTimeBlockForm;