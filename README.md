

## App 
User microservice

## Dependencies
1. OS 
2. openjdk 11 (java 11)
3. node v14 or more
4. mongodb v4 or more

### Instructions
Use many terminal windows to run entire app
Only for running: you need to respect the number of the following app

## 1. Apache Kafka 
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
## 2. Auth service
* Installation
```
cd auth/
npm install
```
* Run
```
npm start
```
## 3. User service
* Installation
```
cd user/
npm install
```
* Run
```
npm start
```

## 4. Kafka-backend
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
