
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

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };


```