#!/usr/bin/env node

/**
 * @author Abhijit Baldawa
 */

import { ExitPromptError } from '@inquirer/core';
import { showAllSupportedCommands } from './app/commands';
import * as db from './app/database';

const start = async () => {
  try {
    // Initialize DB
    await db.init();

    /**
     * Continue showing list of all commands until either user
     * manually exits CLI or select exit option
     */
    while (true) {
      console.clear();

      // Show all commands on CLI prompt and wait for user selection
      const commandHandlerFn = await showAllSupportedCommands();

      // Execute the selected command handler function
      await commandHandlerFn();
    }
  } catch (error: unknown) {
    // Handle only if the user has not manually exited on any `inquirer` prompt
    if (!(error instanceof ExitPromptError)) {
      console.log('Error occurred', error);
      process.exit(1);
    }
  }
};

if (require.main === module) {
  start();
}

export { start };
