import React from "react";
import PropTypes from "prop-types";

function NewCategoryForm(props) {

  function handleFormSubmission(e) {
    e.preventDefault();
    props.addCategory1({
      name: e.target.name.value
    });
  }

  return (
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
  );
}

NewCategoryForm.propTypes = {
  addCategory1: PropTypes.func
};

export default NewCategoryForm;