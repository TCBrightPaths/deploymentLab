const express = require('express');
const path = require('path');

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '40ae5303817c4a098a7215d7f1c230f4',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
const app = express();

// record a generic message and send it to Rollbar
//rollbar.log('Hello world!')


app.get('/', (req, res) => {
    rollbar.info(`Someone tried to get Tiger King.`)
    //res.sendFile(path.join(__dirname, "../index.html"));
    try {
        nonExistentFunction();
      } catch (error) {
        console.log(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});


app.use(rollbar.errorHandler())
const port = process.env.PORT || 4005;
app.listen(port, () => console.log(`Server is running on ${port}.`));