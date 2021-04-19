# Readme

## Installation
* Clone the repo
* Install app dependencies 
` npm i `
* Add variables to `.env` or create file `.env.local` and add them there

```
DWH_USER=""
DWH_PASSWORD=""
AFF_PORTAL_PASSWORD="" 
```

* `npm run start`

## Database
* MySQL
* All tables are created automatically if they aren't exist
* I used Sequilize-typescript to load data. If the values changeg by primary key it will be updated.

```
DWH_HOST="193.148.161.117"
DWH_DB_NAME="aff_test"
```




## Execution log
* execution.log

In case if it's not working (But I hope everything will be ok there)