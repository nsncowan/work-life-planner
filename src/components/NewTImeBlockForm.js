import React from "react";
import PropTypes from "prop-types";

function NewTimeBlockForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.submitTimeBlockForm1}>
        <input 
          className="timeblock-input"
          type="text"
          name='name' 
          placeholder="name your TimeBlock" />
        <input 
          className="timeblock-input"
          type="text"
          name='category' 
          placeholder="add a category" />
        <button type="submit">Add TimeBlock</button>
      </form>
    </React.Fragment>
  );
}

NewTimeBlockForm.propTypes = {
  submitTimeBlockForm1: PropTypes.func
};

export default NewTimeBlockForm;