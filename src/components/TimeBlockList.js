import React from "react";
import TimeBlock from "./TimeBlock";
import PropTypes from "prop-types";


function TimeBlockList(props) {
  return (
    <div className="timeBlockList">
      <React.Fragment>
        <hr/>
        {props.timeBlockList.map((timeBlock) =>
          
          <TimeBlock 
            name={timeBlock.name}
            category={timeBlock.category}
            id={timeBlock.id}
            key={timeBlock.id}
          />
        )}
      </React.Fragment>
    </div>
  );
}

TimeBlockList.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string
};

export default TimeBlockList;