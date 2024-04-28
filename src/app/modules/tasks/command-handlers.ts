/**
 * @author Abhijit Baldawa
 */

import { Separator, input, select } from '@inquirer/prompts';
import { CommandHandlerFunction } from '../../utils/cli/types';
import { confirmAction } from '../../utils/cli/cli';
import { logger } from '../../utils/cli/logger';
import * as taskModel from '../../database/models/tasks';

/**
 * @public
 *
 * Lists all the available tasks
 */
const listAllTasks: CommandHandlerFunction = async () => {
  const tasks = await taskModel.getAll();

  while (true) {
    const selection = await select<(string & {}) | 'BACK'>({
      message: tasks.length ? 'List of all tasks' : 'No tasks to show',
      choices: [
        ...tasks.map((task) => ({
          value: task.id,
          name: `${task.status === 'COMPLETED' ? '[✅]' : '[ ]'} ${task.title}`,
          description: task.description,
        })),
        new Separator(),
        {
          name: 'Back',
          value: 'BACK',
        },
      ],
    });

    if (selection === 'BACK') {
      break;
    }

    logger.clearConsole();
  }
};

/**
 * @public
 *
 * Adds a task to the task list
 */
const addTask: CommandHandlerFunction = async () => {
  while (true) {
    const newTask: Omit<taskModel.Task, 'id'> = {
      title: await input({
        message: 'Enter task name',
        validate: (value) => {
          return !value.trim() ? 'Task name cannot be empty' : true;
        },
      }),
      description: await input({
        message: 'Enter task description',
        validate: (value) => {
          return !value.trim() ? 'Task description cannot be empty' : true;
        },
      }),
      status: 'NOT_COMPLETED',
    };

    await taskModel.add(newTask);

    logger.log(`Task '${newTask.title}' added successfully`);

    const addMore = await confirmAction('Do you want to add more tasks?');

    if (!addMore) {
      break;
    }
  }
};

/**
 * @public
 *
 * Mark a task as complete based on user selection
 */
const completeTask: CommandHandlerFunction = async () => {
  let incompleteTasks: taskModel.Task[] | undefined;
  let wasTaskCompleted = false;

  while (true) {
    if (!incompleteTasks || wasTaskCompleted) {
      const tasks = await taskModel.getAll();

      incompleteTasks = tasks.filter((task) => task.status === 'NOT_COMPLETED');
      wasTaskCompleted = false;
    }

    const taskIdToCompleteOrBack = await select<(string & {}) | 'BACK'>({
      message: incompleteTasks.length
        ? 'Select a task to complete'
        : 'No incomplete task found',
      choices: [
        ...incompleteTasks.map((task) => ({
          value: task.id,
          name: task.title,
          description: task.description,
        })),
        new Separator(),
        {
          name: 'Back',
          value: 'BACK',
        },
      ],
    });

    if (taskIdToCompleteOrBack === 'BACK') {
      break;
    }

    await taskModel.update((task) => {
      if (taskIdToCompleteOrBack === task.id) {
        return {
          ...task,
          status: 'COMPLETED',
        };
      }
      return task;
    });

    wasTaskCompleted = true;

    logger.clearConsole();
  }
};

/**
 * @public
 *
 * Removes a task based on user selection
 */
const removeTask: CommandHandlerFunction = async () => {
  let tasks: taskModel.Task[] | undefined;
  let wasTaskRemoved = false;

  while (true) {
    if (!tasks || wasTaskRemoved) {
      tasks = await taskModel.getAll();
      wasTaskRemoved = false;
    }

    const taskIdToRemoveOrBack = await select<(string & {}) | 'BACK'>({
      message: tasks.length
        ? 'Select a task to remove'
        : 'No task available to remove',
      choices: [
        ...tasks.map((task) => ({
          value: task.id,
          name: `${task.status === 'COMPLETED' ? '[✅]' : '[ ]'} ${task.title}`,
          description: task.description,
        })),
        new Separator(),
        {
          name: 'Back',
          value: 'BACK',
        },
      ],
    });

    if (taskIdToRemoveOrBack === 'BACK') {
      break;
    }

    const confirmDelete = await confirmAction('Confirm remove?');

    if (confirmDelete) {
      await taskModel.remove((task) => task.id === taskIdToRemoveOrBack);
      wasTaskRemoved = true;
    }

    logger.clearConsole();
  }
};

export { listAllTasks, addTask, completeTask, removeTask };
