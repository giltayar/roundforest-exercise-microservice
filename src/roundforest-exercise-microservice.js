'use strict'

/**
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
  serverPortToListenTo, postgresHost, postgresPort, postgresUser,  postgresPassword,

  // Implement this
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
