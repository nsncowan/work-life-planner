import { v4 } from 'uuid';

const items = [
  { id: v4(), name: 'Start Your Day Here', category: 'Other' },
  { id: v4(), name: 'family time', category: 'Family' },
  { id: v4(), name: 'go to gym', category: 'Health' },
  { id: v4(), name: 'work on project', category: 'School' },
  { id: v4(), name: 'read', category: 'Self-Care' },
  { id: v4(), name: 'wash dishes', category: 'Chores' },
  { id: v4(), name: 'grocery shopping', category: 'Errands' },
 ]

const initialDayData = [
  // add date property
  { id: v4(), time: "10:00am" },
  { id: v4(), time: "11:00am" },
  { id: v4(), time: "12:00pm" },
  { id: v4(), time: "1:00pm" },
  { id: v4(), time: "2:00pm" },
  { id: v4(), time: "3:00pm" },
];

const dayColumns = {
  [v4()]: { name: 'monday', schedule: initialDayData },
  [v4()]: { name: 'tuesday', schedule: initialDayData },
  [v4()]: { name: 'wednesday', schedule: initialDayData },
  [v4()]: { name: 'thursday', schedule: initialDayData },
  [v4()]: { name: 'friday', schedule: initialDayData },
  [v4()]: { name: 'saturday', schedule: initialDayData },
  [v4()]: { name: 'sunday', schedule: initialDayData },
};


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