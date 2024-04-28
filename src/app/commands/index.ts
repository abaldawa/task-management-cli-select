/**
 * @author Abhijit Baldawa
 */

import { Separator, select } from '@inquirer/prompts';
import { taskCommandChoices } from '../modules/tasks/commands';
import { CommandChoice } from '../utils/cli/types';

/**
 * Command choices for entire CLI app
 */
const commandChoices: CommandChoice[] = [
  ...taskCommandChoices,
  new Separator(),
  {
    name: 'Exit',
    description: 'Press enter to exit the cli',
    value: () => {
      process.exit();
    },
  },
];

/**
 * @public
 *
 * Shows all supported commands on the CLI prompt
 * so that user can select the command from the list
 * and perform operation
 *
 * @returns
 */
const showAllSupportedCommands = async () => {
  const commandHandlerFn = await select({
    message: 'Available commands',
    choices: commandChoices,
  });

  return commandHandlerFn;
};

export { showAllSupportedCommands };
