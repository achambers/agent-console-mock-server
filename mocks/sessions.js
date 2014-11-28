module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();

  sessionsRouter.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === 'user') {
      var response = { sessions: [{ token: 'abcd1234' }] };
      res.send(response);
    } else {
      res.status(401).send({});
    }
  });

  app.use('/api/sessions', sessionsRouter);
};
