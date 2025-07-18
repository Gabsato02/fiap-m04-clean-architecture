const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, './db.json');

const readDB = () => {
	if (!fs.existsSync(DB_PATH)) {
	  writeDB({ users: [], transactions: [] });
	}
	return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  };

const writeDB = (data) =>
	fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

module.exports = { readDB, writeDB };
