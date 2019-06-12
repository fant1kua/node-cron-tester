# Cron tester

## Require
- Node JS 8.x or higher
- yarn

## Install
```
git clone https://git.g-nation.ru/fantom/cron-tester.git
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
  ["* * * * *", "echo hello exec-sh && bash"]
]
```

## Run
```
node index.js
```
