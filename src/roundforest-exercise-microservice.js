'use strict'

/**
 *
 *
 * @param {number} serverPortToListenTo
 * @param {string} postgresHost
 * @param {number} postgresPort
 * @param {string} postgresUser
 * @param {string} postgresPassword
 *
 * @returns {Promise<void>}
 */
async function runMicroservice(
  serverPortToListenTo,
  postgresHost,
  postgresPort,
  postgresUser,
  postgresPassword,
) {
  // You can remove this line once you've implemented everything
  serverPortToListenTo, postgresHost, postgresPort, postgresUser, postgresPassword

  // Implement this
  // It should create the web app, and listen on the port given,
  // and return _when the webapp is listening_ on the port given as a parameter.
  // It will also be given the host and port of the postgres server so that it can connect to it.

  // The web app needs to have four REST entry points:

  // 1. `POST /plus`: accepts (in the body of the request) a JSON array (`[left, right]`) of the two operands,
  //    and returns `{"result": <the sum of the operands>}`. It will also store
  //    a log of the operation in the Postgres DB
  // 2. `POST /minus`: accepts (in the body of the request) a JSON array (`[left, right]`) of the two operands,
  //    and returns `{"result": <the diff of the operands (left - right)>}`. It will also store
  //    a log of the operation in the Postgres DB
  // 3. `POST /list:`, returns an array with a list of the operations performed. You can look at the last
  //    test in `test/integ/roundforest-exercise-microservice.integ.test.js` to see the
  //    JSON format of the return value.
  // 4. `POST /clear`, clears the log of all the operations, and returns `{}`
  //
  // Hint: if you're using Express, the `listen` method accepts a callback to notify when it's
  // listening. You need to convert that callback to a Promise and await it so that this function
  // will return only when the server starts listening
  //
  // Hint: you should probably also create the connection to the Postgres database here, so that
  // all the routes will use it.
}

// If you need the test to create a schema, you can put the schema here.
const schema = `
create table if not exists someTable (
  afield varchar(255)
)
`

module.exports = {
  runMicroservice,
  schema,
}
