# Blast.js demo 


## Install

```
npm install
```

## Start

```
npm start
```

## Web Interface

open (127.0.0.1:3000)[http://127.0.0.1:3000]

## REST API

GET /dbs - returns a list of available blast databases

POST /blast {query: 'TGACTGACTGAC', db:{name:'example',type:'nucl'} - blasts the query against the db