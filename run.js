const writeFilesMap = require('./writeFilesMap')
const installPackages = require('./installPackages')
const checkYarnAvailable = require('./checkYarnAvailable')

function run({
	baseDir, filesMap, dependencies, devDependencies
}, {
	makeMessage,
	useYarnIfAvailable = filesMap.has('package.json')
} = {}) {
	const useYarn = useYarnIfAvailable ? checkYarnAvailable() : undefined;
	(!!filesMap ? writeFilesMap(baseDir, filesMap) : Promise.resolve(true))
		.then(() => (
			!!devDependencies &&
				installPackages(baseDir, devDependencies, { dev: true, useYarn })
		))
		.then(() => (
			!!dependencies &&
				installPackages(baseDir, dependencies, { useYarn })
		))
		.then(() => {
			console.log(makeMessage())
		})
		.catch(error => {
			console.error(error)
		})
}

module.exports = run