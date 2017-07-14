const Path = require('path')
const FS = require('fs-extra')

function writeFilesMap(baseDir, filesMap) {
	let promises = []
	filesMap.forEach((contents, fileNameOrArray) => {
		const fileName = Path.join.apply(Path, [].concat(fileNameOrArray))
		promises.push(
			typeof contents === 'string' ? (
				FS.outputFile(Path.join(baseDir, fileName), contents)
			) : (
				FS.outputJSON(Path.join(baseDir, fileName), contents)
			)
		)
	})
	return Promise.all(promises)
}
