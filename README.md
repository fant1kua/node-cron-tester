# Cron tester

## Require
- Node JS 8.x or higher
- yarn

## Install
```
git clone git@github.com:fant1kua/node-cron-tester.git
cd cron-tester
yarn install

```

## Configuration
```
cp tasks.json.example tasks.json
```

`tasks.json`
```
[
  ["* * * * *", "echo hello"]
]
```

## Run
```
node index.js
```
