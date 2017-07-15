# create-create
Tool for making Node create- tools

## Example

```
yarn create create superpower
```

Makes a **create-superpower** directory with:
- package.json
- bin/create-superpower.js

```js
#!/usr/bin/env node

const run = require('create-create/run')

require('yargs')
  .option('baseDir', {
    default: process.cwd()
  })
  .command({
    command: '*',
    desc: 'Creates a new superpower',
    builder: {
      name: {
        default: 'flying'
      }
    },
    handler(args) {
      const make = require('./commands/main')
      run(make(args), {
        makeMessage: () => `Created superpower ${args.name} in ${args.baseDir}`
      })
    }
  })
  .command({
    command: 'enhancement <name>',
    desc: 'Creates a new superpower enhancement',
    builder: {
    },
    handler(args) {
      const make = require('./commands/enhancement')
      run(make(args), {
        makeMessage: () => `Created enhancement ${args.name} in ${args.baseDir}`
      })
    }
  })
  .demandCommand(1)
  .help('help')
  .argv
```

Simple publish your package, and then you can use it like so:

```
yarn create superpower

yarn create superpower subcommand
```

## API

### `run({ baseDir, filesMap?, dependencies?, devDependencies? })`

```js
const run = require('create-create/run')
```

#### `baseDir: String`

The working directory, recommended that you default to `process.cwd()` like so:

```js
require('yargs')
  .option('baseDir', {
    default: process.cwd()
  })
```

#### `filesMap?: Map<String, { text?: String, json?: Object, mode?: Number }>`

A `Map` of files to create in the `baseDir`. Key can either be a file name string, or an array of file path components relative to `baseDir`.

The value is an object with either `text` or `json` set. Use `mode` to set the file mode (a la `chmod`).

```js
const filesMap = new Map()
filesMap.set('readme.md', {
  text: (
`# Heading

## Subheading
`)
})
```

#### `dependencies?: [String]`

An array of dependencies to install. Uses either `yarn` or `npm`, dependending on what’s detected (currently presence of `yarn.lock` file).

#### `devDependencies?: [String]`

An array of dev dependencies to install. Like `dependencies`, but installs using `yarn add --dev` or `npm install --save-dev`.
