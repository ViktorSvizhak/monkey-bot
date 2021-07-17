const path = require('path');
const fs = require('fs');
const logger = require('../modules/common/logger');

module.exports = (folder, moduleFormatter) => {
	logger.info(`Start initialization folder "${folder}"`)

    if (!moduleFormatter) {
        moduleFormatter = (option) => {
            return option;
        }
    }
    
    const modules = [];
    readModules(folder, moduleFormatter, modules);

	logger.info(`Finish initialization folder "${folder}"`)

    return modules
}

function readModules(dir, crerateModule, output) {
	const files = fs.readdirSync(path.join(__dirname, dir));

	for (const file of files) {
		const stat = fs.lstatSync(path.join(__dirname, dir, file));

		if (stat.isDirectory()) {
			readModules(path.join(dir, file), crerateModule, output);
		} else {
			const option = require(path.join(__dirname, dir, file));
			output.push(crerateModule(option));

			logger.info(`Module "${file}" initialized`);
		}
	}
}