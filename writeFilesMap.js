const Path = require('path')
const FS = require('fs-extra')

function writeFilesMap(baseDir, filesMap) {
	let promises = []
	filesMap.forEach((info, fileNameOrArray) => {
		const filePath = Path.join.apply(Path, [baseDir].concat(fileNameOrArray))
		// Contents: JSON
		if (info.json) {
			promises.push(
				FS.outputJSON(filePath, info.json)
			)
		}
		// Contents: Text
		if (info.text) {
			promises.push(
				FS.outputFile(filePath, info.text)
			)
		}
		// Mode
		if (info.mode) {
			promises.push(
				FS.chmod(filePath, info.mode)
			)
		}
	})
	return Promise.all(promises)
}
