import path from 'path'
import mocha from 'mocha'
const {describe, it, after} = mocha
import chai from 'chai'
const {expect} = chai
import {runDockerCompose} from '@seasquared/docker-compose-testkit'
import {before} from '@seasquared/mocha-commons'
import net from 'net'
import {once} from 'events'
import {runMicroservice} from '../../src/roundforest-exercise-microservice.js'
import {fetchAsJsonWithJsonBody} from './fetch-json.js'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('roundforest-exercise-microservice (integ)', function () {
  const {postgresAddress, teardown} = before(async () => {
    if (process.env.POSTGRESS_ADDRESS) {
      return {teardown: async () => 1, postgresAddress: process.env.POSTGRESS_ADDRESS}
    } else {
      const {findAddress, teardown} = await runDockerCompose(
        path.join(__dirname, 'docker-compose.yaml'),
      )

      return {
        teardown,
        postgresAddress: await findAddress('postgres', 5432, {healthCheck: tcpHealthCheck}),
      }
    }
  })

  before(async () => {
    const [host, port] = postgresAddress().split(':')

    await runMicroservice(8080, host, parseInt(port, 10))
  })

  after(() => teardown()())

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
 * @param {string} address
 */
async function tcpHealthCheck(address) {
  const [host, port] = address.split(':')

  const socket = net.createConnection(parseInt(port, 10), host)

  await Promise.race([
    once(socket, 'connect'),
    once(socket, 'error').then(([err]) => Promise.reject(err)),
  ])

  socket.destroy()
}
