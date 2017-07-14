#!/usr/bin/env node

const run = require('../run')

require('yargs')
	.option('baseDir', {
		default: process.cwd()
	})
	.command({
    command: 'tool <baseName>',
    aliases: ['*'],
		desc: 'Creates a create-* Node.js tool',
		handler(args) {
      const toolName = `create-${args.baseName}`
      const projectDir = Path.join(args.baseDir, toolName)
      const filesMap = new Set()
      filesMap.add('package.json', {
        json: {
          name: toolName,
          version: "0.1.0",
          "bin": `./bin/${toolName}.js`
        }
      })

      filesMap.add(['bin', `${toolName}.js`], {
        mode: 0755,
        text: (
`
#!/usr/bin/env node

const run = require('create-create/run')

require('yargs')
	.option('baseDir', {
		default: process.cwd()
	})
	.command({
    command: '*',
		desc: 'Example',
		handler(args) {
      const baseDir = args.baseDir
      const filesMap = new Set()
      filesMap.add('readme.md', {
        text: (
\`# Example
\`)
      })

      const dependencies = ['react']

      run({
        baseDir,
        filesMap,
        dependencies: dependencies
      }, {
        makeDescription() {
          return \`Created example in \${baseDir}\`
        }
      })
		}
  })
  // .demandCommand(1)
	// .command({
	// 	command: 'inner <name>',
	// 	desc: 'Subcommand',
	// 	builder: {
	// 	},
	// 	handler(args) {
	// 		const make = require('./commands/inner')
	// 		run(make(args), {
  //       makeDescription() {
  //         return \`Created inner in \${projectDir}\`
  //       }
  //     })
	// 	}
	// })
	.help('help')
	.argv
`
        )
      })

      run({
        baseDir: projectDir,
        filesMap,
        dependencies: ['create-create']
      }, {
        useYarnIfAvailable: true,
        makeDescription() {
          return `Created tool ${projectDir}`
        }
      })
		}
  })
	.help('help')
	.argv
