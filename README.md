# task-management-cli

### Author: Abhijit Baldawa

### Description

A command-line interface (CLI) application for managing tasks. Added tasks are saved in a JSON file on the disk and are persisted across the application runs. Central error handling is implemented for any application errors which may occur at runtime.

This is an integrated CLI application in which user would be able add/list/remove/complete all the tasks via the CLI select prompts without leaving/exiting the CLI.

### Tech Stack

1. Node.js (V20.x)
2. Typescript
3. [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)

### Pre-requisites

Latest Node.js must be installed

### How to run:

1. `git clone https://github.com/abaldawa/task-management-cli-select.git`
2. `cd task-management-cli-select`
3. execute `npm i`
4. execute `npm run build` (This will compile the project from TS to JS under `build` folder)
5. execute `npm run cli` to run the cli application and see the selection options. (NOTE: Alternatively running `node ./build/cli.js` also works)

When the application is started for the first time, `tasks.json` file is created at `task-management-cli-select/db/tasks.json` and on the subsequent runs the task data is picked from it and saved on it.

### Functionality in action

Below video shows the task management CLI functionality in action

https://github.com/abaldawa/task-management-cli-select/assets/5449692/f93ea0f8-a7aa-48eb-8f34-1afbd2f4b281

### Install and run as a CLI globally:

1. `git clone https://github.com/abaldawa/task-management-cli-select.git`
2. `cd task-management-cli-select`
3. execute `npm i`
4. execute `npm run build` (This will compile the project from TS to JS under `build` folder)
5. execute `npm link` (or `npm i -g`) (Links and makes `task-management-cli` available on global path)
6. Execute from any path `task-management-cli` to run the cli application and see the run option.

   Below video demonstrates the global CLI installation and invoking task-management-cli

   https://github.com/abaldawa/task-management-cli-select/assets/5449692/e6e3a77f-4883-45a6-92e3-f9765d9911f3

### Design and implementation

1. The application architecture is modular and flexible hence the codebase is scalable.
2. `src/app/modules` folder contains all the supported modules/features. New feature can be easily added by adding new modules.
3. `src/app/modules/tasks` contains task management module with `command-handler.ts` exporting methods which handle the commands and `commands.ts` binds and exports all the supported command choices with their associated command handler methods.
4. `src/app/database/models` contains model files related to database.
5. `src/app/database/models/tasks.ts` contains task model and it exports methods to interact with saved tasks in the `task-management-cli-select.git/db/tasks.json` file.
6. `src/app/commands/index.ts` exports method which returns select command options supported by all modules.
7. `src/app/cli.ts` is the entry point and central command handler. This method shows all the selection commands on the cli prompt and based on user selection calls appropriate command handler. Also centrally handles any potential application errors which may happen at runtime.
