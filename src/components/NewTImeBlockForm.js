import React from "react";
import PropTypes from "prop-types";

function NewTimeBlockForm(props) {

  function handleFormSubmission2(e) {
    e.preventDefault();
    props.addTimeBlock1({
      name: e.target.name.value,
      category: e.target.category.value
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmission2}>
        <input 
          className="timeblock-input"
          type="text"
          name='name' 
          placeholder="name your TimeBlock" />

        <select /* onChange={} */>
          <option /* value={} */>Select a Category</option>
          {props.categoryList.map((cat) => <option value={cat.name}>{cat.name}</option>)}
        </select>

        {/* <input 
          className="timeblock-input"
          type="text"
          name='category' 
          placeholder="add a category" />
          <button onClick={() => {props.addCategory1}}>Add Category</button> */}
        <button type="submit">Add TimeBlock</button>
      </form>
    </React.Fragment>
  );
}

NewTimeBlockForm.propTypes = {
  addTimeBlock1: PropTypes.func,
  categoryList: PropTypes.array
};

export default NewTimeBlockForm;