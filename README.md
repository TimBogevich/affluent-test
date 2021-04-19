# Readme

## Installation
* Clone the repo
* Install app dependencies 
` npm install `
* Add variables to `.env` or create file `.env.local` and add them there

```
DWH_USER=""
DWH_PASSWORD=""
AFF_PORTAL_PASSWORD="" 
```

* `npm run start`

## Database
MySQL
```
DWH_HOST="193.148.161.117"
DWH_DB_NAME="aff_test"
```


## Notes
I used Sequilize-typescript to load data. If the values changeg by primary key it will be updated.


