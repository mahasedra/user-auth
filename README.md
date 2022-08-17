

## App 
User microservice

## Dependencies
* 1. OS
2. openjdk 11 (java 11)
3. node v14 or more

## Apache Kafka 
* Installation
```
wget http://apache.crihan.fr/dist/kafka/0.10.2.1/kafka_2.10-0.10.2.1.tgz
tar xzf kafka_2.10-0.10.2.1.tgz
cd kafka_2.10-0.10.2.1/
```
* Run
```
./bin/zookeeper-server-start.sh ./config/zookeeper.properties
./bin/kafka-server-start.sh ./config/server.properties
```
## Auth service
* Installation
```
cd auth/
npm install
```
* Run
```
npm start
```
## User service
* Installation
```
cd user/
npm install
```
* Run
```
npm start
```

## Kafka-backend
* Installation
```
cd kafka-backend/
npm install
```
* Run
```
npm start
```


## How to use 
* There is sample config file (config.json) in each service folders which you should edit with proper values. (To run in develop mode no need to edit any file)
* Following are the API Docs URL for each service (it's a generated swagger)
  - Auth: `localhost:7000/api-docs`
  - User: `localhost:7004/api-docs`
