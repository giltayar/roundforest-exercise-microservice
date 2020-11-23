const path = require('path')
const mocha = require('mocha')
const {describe, it, before} = mocha
const {expect} = require('chai')
const {runDockerCompose, tcpHealthCheck} = require('./utils/docker-compose-testkit')
const {fetchAsJsonWithJsonBody} = require('./utils/fetch-json.js')
const {Pool} = require('pg')

const {runMicroservice, schema} = require('../../src/roundforest-exercise-microservice.js')

describe('roundforest-exercise-microservice (integ)', function () {
  /**
   * Run Docker-Compose (or just determine postgres address if POSTGRES_ADDRESS is defined)
   */
  let postgresAddress
  before(async () => {
    if (process.env.POSTGRES_ADDRESS) {
      postgresAddress = process.env.POSTGRES_ADDRESS
    } else {
      const {findAddress} = await runDockerCompose(path.join(__dirname, 'docker-compose.yaml'))

      postgresAddress = await findAddress('postgres', 5432, {healthCheck: tcpHealthCheck})
    }
  })

  /**
   * Create schema if needed and run exercise app
   */
  before(async () => {
    const [host, port] = postgresAddress.split(':')

    await createSchema(host, parseInt(port, 10), schema)

    await runMicroservice(
      8080,
      host,
      parseInt(port, 10),
      process.env.POSTGRES_USER || 'postgres',
      process.env.POSTGRES_PASSWORD,
    )
  })

  /**
   * THE TESTS!
   */

  it('should be able to calculate plus', async () => {
    expect(await fetchAsJsonWithJsonBody(`http://localhost:8080/plus`, [3, 5])).to.eql({result: 8})
  })

  it('should be able to calculate minus', async () => {
    expect(await fetchAsJsonWithJsonBody(`http://localhost:8080/minus`, [3, 5])).to.eql({
      result: -2,
    })
  })

  it('should be able to clear calculations and list them', async () => {
    await fetchAsJsonWithJsonBody(`http://localhost:8080/clear`, {})

    await fetchAsJsonWithJsonBody(`http://localhost:8080/plus`, [8, 2])
    await fetchAsJsonWithJsonBody(`http://localhost:8080/minus`, [10, 9])

    expect(await fetchAsJsonWithJsonBody(`http://localhost:8080/list`, {})).to.eql([
      {operation: 'plus', left: 8, right: 2, result: 10},
      {operation: 'minus', left: 10, right: 9, result: 1},
    ])

    await fetchAsJsonWithJsonBody(`http://localhost:8080/clear`, {})

    expect(await fetchAsJsonWithJsonBody(`http://localhost:8080/list`, {})).to.eql([])
  })
})

/**
 * @param {string} host
 * @param {number} port
 * @param {string} schema
 */
async function createSchema(host, port, schema) {
  const client = new Pool({
    host,
    port,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD,
  })
  await client.connect()

  await client.query(schema)
}
