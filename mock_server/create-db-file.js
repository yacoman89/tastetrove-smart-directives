const path = require('path');
const fs = require('fs');

const templateDbFile = path.normalize(`${__dirname}/tmp.db.json`);
const dbFile = path.normalize(`${__dirname}/db.json`);

if (!fs.existsSync(dbFile)) {
  fs.copyFileSync(templateDbFile, dbFile);
}