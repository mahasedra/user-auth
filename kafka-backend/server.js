require('./config');
var connection = new require('./kafka/connection');
var createUser = require('./services/user/create');
var updateUser = require('./services/user/update');
var deleteUser = require('./services/user/delete');

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', (message) => {
    console.log('MESSAGE RECEIVED FOR ' + topic_name);
    console.log(message.value);
    try {
      var data = JSON.parse(message.value);

      fname(data.data, (err, res) => {
        var payloads = [
          {
            topic: 'response_topic',
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, function (err, data) {
          console.log('SENT DATA FROM KAFKA BACKEND: ', JSON.stringify(res));
        });
        return;
      });
    } catch (e) {
      console.error(e);
    }
  });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest('user.create', createUser);
handleTopicRequest('user.update', updateUser);
handleTopicRequest('user.delete', deleteUser);
