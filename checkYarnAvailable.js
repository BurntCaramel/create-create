const Spawn = require('cross-spawn')

function checkYarnAvailable() {
	try {
		const { error } = Spawn.sync('yarnpkg', ['--version'])
		if (error) { throw error }
		return true
	}
	catch (error) {
		return false
	}
}

module.exports = checkYarnAvailable
