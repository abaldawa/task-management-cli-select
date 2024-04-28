/**
 * @author Abhijit Baldawa
 */

import { select } from '@inquirer/prompts';

/**
 * Target command handler function
 *
 *  @example
 * ```
 * const commandHandler: CommandHandlerFunction = () => {
 *    // Logic for command handler
 * }
 * ```
 */
type CommandHandlerFunction = () => Promise<void> | void;

/**
 * Command choice config for each supported command which will
 * be fed to `select` prompt from `@inquirer`
 *
 * **NOTE:**
 * Exporting it this way because `@inquirer` package does
 * not export the type `Choice` for `select` prompt.
 */
type CommandChoice = Parameters<
  typeof select<CommandHandlerFunction>
>[0]['choices'][number];

export { CommandHandlerFunction, CommandChoice };
