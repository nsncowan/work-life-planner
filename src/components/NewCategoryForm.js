import React from "react";
import PropTypes from "prop-types";

function NewCategoryForm(props) {

  function handleFormSubmission(e) {
    e.preventDefault();
    props.addCategory1({
      category: e.target.category.value
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmission}>
        <input 
          className="timeblock-input"
          type="text"
          name='category' 
          placeholder="add a category" />
        <button type="submit">Add Category</button>
      </form>
    </React.Fragment>
  );
}

NewCategoryForm.propTypes = {
  addCategory1: PropTypes.func
};

export default NewCategoryForm;