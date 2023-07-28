import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';


function NewCategoryForm(props) {

  // const Wrapper = styled.section`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // padding-top: 2rem;
  // margin-bottom: 2rem;
  // `;

  function handleFormSubmission(e) {
    e.preventDefault();
    props.addCategory({
      name: e.target.name.value
    });
  }

  return (
    // <Wrapper>
      <React.Fragment>
        <form onSubmit={handleFormSubmission}>
          <input
            className="timeblock-input"
            type="text"
            name='name'
            placeholder="add a category" />
          <button type="submit">Add Category</button>
        </form>
      </React.Fragment>
    // </Wrapper>
  );
}

NewCategoryForm.propTypes = {
  addCategory: PropTypes.func
};

export default NewCategoryForm;