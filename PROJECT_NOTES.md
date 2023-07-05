
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
  - form takes in tb name, and cat name
  - goal is to give each tb a cat id as a property
  - therefore, you can search for all tb's in a given cat by listing all tb's where id === searchId

  * idea: no cat id needed
  * create a collection of cat's, just names, and use that to populate a dropdown list for the new TB form
  * BUT, the new TB that's created only needs the string value of the category name, and doesn't have to be connected to the Cat collection.
  * BECAUSE: in order to display all TBs in a given category, we only need to match the string values of the Cat property of the TB to the search term.