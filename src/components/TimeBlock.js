import React from "react";
import PropTypes from "prop-types";


function TimeBlock(props) {
  return (
    <div className="timeBlock">
      <h4>{props.name}</h4>
      <h6>{props.category}</h6>
    </div>
  );
}

TimeBlock.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
};

export default TimeBlock;