
```js
// alternate code to persist a re-arrange dnd WITHIN a single list.
// I changed it in favor of using a call-back function
const newTimeBlockList = Array.from(timeBlockList);
const [draggedTimeBlock] = newTimeBlockList.splice(source.index, 1);
newTimeBlockList.splice(destination.index, 0, draggedTimeBlock);
setTimeBlockList(newTimeBlockList);
```