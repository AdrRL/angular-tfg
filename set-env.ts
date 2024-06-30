const { writeFileSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

const envConfigFile = `
export const environment = {
  PRODUCTION: ${isProduction},
  URL: '${process.env["URL"]}',
  APIKEY: '${process.env["APIKEY"]}',
  ORGANIZATION: '${process.env["ORGANIZATION"]}'
};
`;

writeFileSync(targetPath, envConfigFile);
