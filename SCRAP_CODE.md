```js
// the function below does not throw an error
function TimeTable(props) {
  return (
    <Droppable droppableId="timeTable" isCombineEnabled>
      {(provided, snapshot) => (
        <StyledTimeTableDiv 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          draggingOver={snapshot.draggingOver}>
          <React.Fragment>
            <h2>TimeTable</h2>
              {props.timeTable.map((timeSlot, index) =>
                <TimeSlot
                  time={timeSlot.time}
                  name={timeSlot.name}
                  category={timeSlot.category}
                  id={timeSlot.id}
                  key={timeSlot.id}
                  index={index}
                />
              )}
              {provided.placeholder}
          </React.Fragment>
        </StyledTimeTableDiv>
      )}
    </Droppable>
  );
}```

```js
function TimeSlot(props) {
  return (
    <Droppable droppableId={props.id}>
      {(provided, snapshot) => (
        <StyledTimeSlotDiv
          ref={provided.innerRef} 
          {...provided.droppableProps}
          draggingOver={snapshot.draggingOver}>
            <Draggable draggableId={props.id} index={props.index} key={props.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  isDragging={snapshot.isDragging}>
                    <h5>{props.time}</h5>
                    <h6>{props.name}</h6>
                    <h6>{props.category}</h6>
                </div>
              )}
            </Draggable>
              {provided.placeholder}
        </StyledTimeSlotDiv>
      )}
    </Droppable>
  );
}



// safety copy below
// function TimeSlot(props) {
//   return (
//     <Draggable draggableId={props.id} index={props.index} key={props.id}>
//       {(provided, snapshot) => (
//         <StyledTimeSlotDiv 
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           isDragging={snapshot.isDragging}>
//             <h5>{props.time}</h5>
//             <h6>{props.name}</h6>
//             <h6>{props.category}</h6>
//           {/* {provided.placeholder} */}
//         </StyledTimeSlotDiv>
//       )}
//     </Draggable>
//   );
// }
```
