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
  production: ${isProduction},
  url: '${process.env["URL"]}',
  APIKEY: '${process.env["APIKEY"]}',
  organization: '${process.env["ORGANIZATION"]}'
};
`;

writeFileSync(targetPath, envConfigFile);
