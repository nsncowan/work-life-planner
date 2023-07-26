```js
function countUniqueItems(arr) {
  const itemCounts = {};

  arr.forEach(item => {
    if (itemCounts[item]) {
      itemCounts[item] += 1;
    } else {
      itemCounts[item] = 1;
    }
  });

  return itemCounts;
}
```
```js
function countUniqueItems(arr) {
  return arr.reduce((itemCounts, item) => {
    itemCounts[item] = (itemCounts[item] || 0) + 1;
    return itemCounts;
  }, {});
}
```
```js
function countUniqueItemsWithLabels(arr) {
  const itemCounts = {};

  arr.forEach(item => {
    if (itemCounts[item]) {
      itemCounts[item].value += 1;
    } else {
      itemCounts[item] = { name: item, value: 1 };
    }
  });

  // Convert the object values into an array of objects
  const result = Object.values(itemCounts);

  return result;
}
```
```js
function countUniqueItemsWithLabels(arr) {
  return arr.reduce((itemCounts, item) => {
    const existingItem = itemCounts.find(obj => obj.name === item);

    if (existingItem) {
      existingItem.value += 1;
    } else {
      itemCounts.push({ name: item, value: 1 });
    }

    return itemCounts;
  }, []);
}
```






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