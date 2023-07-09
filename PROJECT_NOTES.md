
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
    

### Task list
 * add timeblocks to list
  - with submit action - assign category to timeblock (one-to-many)

### data structure
  * idea: no category id needed
  * create a collection of categories, just names, and use that to populate a dropdown list for the new TB form
  * BUT, the new TB that's created only needs the string value of the category name, and doesn't have to be connected to the category collection.
  * BECAUSE: in order to display all TBs in a given category, we only need to match the string values of the category property of the TB to the search term.

  - create an add new category form
  - populate a dropdown with categories
  - check for duplicate categories
  - attach dropdown to new timeblock form
  - 