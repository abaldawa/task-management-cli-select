/**
 * @author Abhijit Baldawa
 */

import { CommandChoice } from '../../utils/cli/types';
import {
  addTask,
  completeTask,
  listAllTasks,
  removeTask,
} from './command-handlers';

/**
 * All supported task command choices
 */
const taskCommandChoices: CommandChoice[] = [
  {
    name: 'Add task',
    description: 'Add a new task',
    value: addTask,
  },
  {
    name: 'List tasks',
    description: 'Lists all saved tasks',
    value: listAllTasks,
  },
  {
    name: 'Complete task',
    description: 'Mark a task as complete',
    value: completeTask,
  },
  {
    name: 'Remove task',
    description: 'Remove a task from the list',
    value: removeTask,
  },
];

export { taskCommandChoices };
