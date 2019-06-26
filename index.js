const cron = require('node-cron');
const execSh = require('exec-sh');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const validate = ajv.compile({
    type: 'array',
    items: {
        type: 'array',
        minItems: 2,
        items: {
            type: 'string'
        }
    }
});

const tasks = require('./tasks.json');

const valid = validate(tasks);

if (!valid) {
    console.error('Invalid tasks: ' + ajv.errorsText(validate.errors));
    process.exit(1);
} else {
    tasks.forEach(([expression, command], index) => {
        cron.schedule(expression, () => {
            execSh(command, {}, (err) => {
                if (err) {
                    console.error(`Task ${index} exit code: ${err.code}`);
                } else {
                    console.info(`Task ${index} completed`);
                }
            });
        });
    })
}

