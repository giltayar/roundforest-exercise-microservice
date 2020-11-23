/**
 * @param {number} serverPortToListenTo
 * @param {string} postgresHost
 * @param {number} postgresPort
 *
 * @returns {Promise<void>}
 */
async function runMicroservice(serverPortToListenTo, postgresHost, postgresPort) {
  serverPortToListenTo, postgresHost, postgresPort

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
