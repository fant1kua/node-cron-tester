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
} else {
    tasks.forEach((task, index) => {
        cron.schedule(task[0], () => {
            execSh(task[1], {}, (err) => {
                if (err) {
                    console.log(`Task ${index} exit code: ${err.code}`);
                }
            });
        });
    })

}

