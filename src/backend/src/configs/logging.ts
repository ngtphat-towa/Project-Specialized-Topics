import chalk from "chalk";

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(
      chalk.bgCyan(`[${getTimeStamp()}] [INFO]`) +
        chalk.blueBright(` [${namespace}] ${message}`),
      object
    );
  } else {
    console.info(
      chalk.bgCyan(`[${getTimeStamp()}] [INFO]`) +
        chalk.blueBright(` [${namespace}] ${message}`)
    );
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(
      chalk.bgYellow(`[${getTimeStamp()}] [WARN]`) +
        chalk.yellow(` [${namespace}] ${message}`),
      object
    );
  } else {
    console.warn(
      chalk.bgYellow(`[${getTimeStamp()}] [WARN]`) +
        chalk.yellow(` [${namespace}] ${message}`)
    );
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      chalk.bgRed(`[${getTimeStamp()}] [ERROR]`) +
        chalk.redBright(` [${namespace}] : ${message}\n`),
      object
    );
  } else {
    console.error(
      chalk.bgRed(`[${getTimeStamp()}] [ERROR]`) +
        chalk.redBright(` [${namespace}] ${message}`)
    );
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(
      chalk.bgWhite(`[${getTimeStamp()}] [DEBUG]`) +
        chalk.gray(` [${namespace}] ${message}`),
      object
    );
  } else {
    console.debug(
      chalk.bgWhite(`[${getTimeStamp()}] [DEBUG]`) +
        chalk.gray(` [${namespace}] ${message}`)
    );
  }
};

const getTimeStamp = (): string => {
  return new Date().toLocaleString();
};

export default {
  info,
  warn,
  error,
  debug,
};
