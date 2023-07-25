
```js
// this is one droppable, but rendered in each timeSlot
  return (
    <React.Fragment>
      <Droppable droppableId='scheduleItems' key='scheduleItems'>
        {(provided, snapshot) => (
          <div>
            {hoursOfDay.map((hour,index) => 
              <StyledTimeSlotDiv ref={provided.innerRef} {...provided.droppableProps} style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}>
                <h2>{hour.hour}</h2>
                {scheduleItems.map((timeSlot, index) =>
                  <TimeSlot time={timeSlot.hour} name={timeSlot.name} category={timeSlot.category} id={timeSlot.id} key={timeSlot.id} index={index} v4={v4()}/>
                )}
                {provided.placeholder}
              </StyledTimeSlotDiv>)}
          </div>
        )}
      </Droppable>
    </React.Fragment>
  )
```
```js

```
```js

```



```js
// alternate code to persist a re-arrange dnd WITHIN a single list.
// I changed it in favor of using a call-back function
const newTimeBlockList = Array.from(timeBlockList);
const [draggedTimeBlock] = newTimeBlockList.splice(source.index, 1);
newTimeBlockList.splice(destination.index, 0, draggedTimeBlock);
setTimeBlockList(newTimeBlockList);
```

```js

const combine = (origin, destiny) => ({
  id: destiny.id,
  time: `${destiny.time}`,
  name: `${origin.name}`,
  category: `${origin.category}`,
});

const handleCombine = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const combinedItem = combine(droppableSource.index, droppableDestination.index)
    destClone.splice(droppableDestination.index, 0, combinedItem);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };


handleCombine = (originPos, destinyId) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const origin = sourceClone[originPos];
    const destinyPos = destClone.findIndex(({ id }) => id === destinyId);
    const destiny = destClone[destinyPos];
    const combinedItem = combine(origin, destiny);
    destClone.splice(destinyPos, 1, combinedItem);
    sourceClone.splice(originPos, 1);
    console.log(sourceClone);
    console.log(destClone);

    setTimeBlockList(sourceClone);
    setTimeTable(destClone);
  };

```