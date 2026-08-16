const SERVICE_NAME = 'BLOGPOST-CATEGORY-SERVICE';

const RESET = '\x1b[0m';
const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

function timestamp() {
  return new Date().toISOString();
}

function info(message, data = '') {
  console.log(
    `${BLUE}[INFO]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
    data
  );
}

function success(message, data = '') {
  console.log(
    `${GREEN}[SUCCESS]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
    data
  );
}

function warn(message, data = '') {
  console.warn(
    `${YELLOW}[WARN]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
    data
  );
}

function error(message, data = '') {
  console.error(
    `${RED}[ERROR]${RESET} ${timestamp()} [${SERVICE_NAME}] - ${message}`,
    data
  );
}

module.exports = {
  info,
  success,
  warn,
  error
};