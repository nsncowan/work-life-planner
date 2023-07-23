
### Task list
 * update `items:` within schedule docs ***[DONE]***
 * re-render schedule when `currentDate` changes ***[DONE]***
 * execute addItemsToSchedule each time a timeblock is dropped into schedule items
 * execute addItemsToSchedule each time a itemList is re-ordered
 * troubleshoot why console log of scheduleItems is always 1 move behind



## Data

## brainstorm

Take a cue from the spread operator that reassigns an Id to the copied item. This could be a way to modify items with new times, names, etc

- convert timeslots to timeblocks with all data exept 'time' set to null.
- the end goal is to make everything a 'timeblock', but with null fields depending on source and destination.

- within 'initial-day-data', set up an array of 

- maybe populate a blank day with timeslot objects (with property for time, and property for TB data (initially set to null) )

- create a state slice for 'assigned' time blocks - ie timeblocks that have been added to a specific day
- dragging a tb to the 'day' template will create a copy of the timeblock and add it to the 'assigned' state
- 'assigned' will also have a date property, which will read whichever date is displayed in the component
- 'assigned' will also have a 'timeslot' property. MAYBE this means we don't necessarily need to worry about re-ordering, but we can just worry about matching the 'timeslot' property of the timeblock to an equivalent timeslot id of the space in the receiving timetable section.


## Error Notes
- Error: Cannot read properties of undefined (reading 'map') 
  - Cause: the `droppableId` was not matching the `droppableId` mentioned in the function being called for the drag and drop action.
    - I was dragging and dropping in `<Droppable droppableId='1234' key='1234'>`. 
      BUT the condition in the function was `if(source.droppableId === 'timeTable' && destination.droppableId === 'timeTable')`

- Error: ReferenceError: Cannot access 'dayColumns' before initialization

- Bug: schedule rendered correctly but the entire list moved as one item when I tried to drag something into it. 
  - cause: in reading data from firestore, the id's for the individual items were getting lost, 
    so passing `props.id` to each `DraggableId` being mapped wasn't actually giving them id's to use. 
    Here's the  bandaid fix: `<Draggable draggableId={props.name} index={props.index} key={props.id}>`

- Bug: was not able to update schedule items in firestore
  - i forgot that the schedule being passed to the component was a in an array of 1 object
  - solution: when specifying which schedule id to target for the update, I indicated the `[0]` index:
    ```js 
      addItemToSchedule({
      id: scheduleToDisplay[0].id,
      date: scheduleToDisplay[0].date,
      items: scheduleItems
      });
    ```


## dnd
* Create a background that displays the blank daily timetable
* Create a component that will be superimposed over the blank timetable, and time blocks can be added to that - therefore ‘filling out’ the blank timetable
* You already have your main list of time blocks.
* Create new state for each day with a date property and a time block list, property initialized as an empty array, and as time blocks are dragged onto the schedule, those time blocks are pushed to the array instead


### Styling
* look more into the "styled components" library for react
* look at react bootstrap
* Preferred: MaterialUI (this is a styling library built specifically for react)
* font awesome - huge library for icons. cdn

### Pie Charts
* use chartjs for adding a pie chart


### database
supabase???


### structure notes

- Header
- TimeBlockControl
    - TimeBlockList
        - TimeBlock
    - TimeBlockForm
    


### data structure

categories (top-level collection)
    doc(category)
        id: 
        name: 

timeBlocks (top-level collection)
    doc(timeBlock)
        id:
        date: 
        time:  
        name: 
        category: 

schedules (top-level collection)
    doc(schedule) - this represents a date
        id:
        items: [timeblocks & timeslots]














  * idea: no category id needed
  * create a collection of categories, just names, and use that to populate a dropdown list for the new TB form
  * BUT, the new TB that's created only needs the string value of the category name, and doesn't have to be connected to the category collection.
  * BECAUSE: in order to display all TBs in a given category, we only need to match the string values of the category property of the TB to the search term.

  - create an add new category form
  - populate a dropdown with categories
  - check for duplicate categories
  - attach dropdown to new timeblock form
  - 