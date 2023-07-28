import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

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

const Select = styled.select`
  max-width: 12rem;
  margin: .15rem;
  padding: .88rem 0;
  border: 2px solid #FF9494;
  border-radius: 3px;
  margin-bottom: .5rem;
  color: #010c3f;
  text-align: center;
  font-size: 1rem;
  color: #FF9494;
  background-color: #FFF5E4;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

function NewTimeBlockForm(props) {

  function handleFormSubmission(e) {
    e.preventDefault();
    props.addCategory({
      name: e.target.name.value
    });
  }

  function handleFormSubmission2(e) {
    e.preventDefault();
    props.addTimeBlock({
      name: e.target.name.value,
      category: e.target.categoryName.value,
    });
  }

  return (
    <Wrapper>
      <React.Fragment>
        <Form onSubmit={handleFormSubmission2}>
          <Input
            className="timeblock-input"
            type="text"
            name='name'
            placeholder="name your TimeBlock" />
          <Select name="categoryName">
            <option>Select a Category</option>
            {props.categoryList.map((cat) => <option value={cat.name}>{cat.name}</option>)}
          </Select>
          <button type="submit">Add TimeBlock</button>
        </Form>

        <Form onSubmit={handleFormSubmission}>
          <Input
            className="timeblock-input"
            type="text"
            name='name'
            placeholder="add a category" />
          <button type="submit">Add Category</button>
        </Form>
      </React.Fragment>
    </Wrapper>
  );
}

NewTimeBlockForm.propTypes = {
  addTimeBlock: PropTypes.func,
  categoryList: PropTypes.array
};

export default NewTimeBlockForm;