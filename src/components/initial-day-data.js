import { v4 } from 'uuid';

const initialDayData = [
  // add date property
  {
    time: "10:00am",
    // name: null,
    // category: null,
    id: v4()
  },
  {
    time: "11:00am",
    // name: null,
    // category: null,
    id: v4()
  },
  {
    time: "12:00pm",
    // name: null,
    // category: null,
    id: v4()
  },
  {
    time: "1:00pm",
    // name: null,
    // category: null,
    id: v4()
  },
  {
    time: "2:00pm",
    // name: null,
    // category: null,
    id: v4()
  },
  {
    time: "3:00pm",
    // name: null,
    // category: null,
    id: v4()
  },
];

const initialTimeBlocks = [
  {
    name: 'family time',
    category: 'family',
    id: v4()
  },
  {
    name: 'yoga',
    category: 'health',
    id: v4()
  },
  {
    name: 'study',
    category: 'education',
    id: v4()
  },
  {
    name: 'relax time',
    category: 'self care',
    id: v4()
  },
  {
    name: 'wash dishes',
    category: 'chores',
    id: v4()
  },
];

// export default initialDayData;
export { initialDayData, initialTimeBlocks };