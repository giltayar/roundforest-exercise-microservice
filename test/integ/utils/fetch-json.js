'use strict'
const fetch = require('node-fetch')

/**
 * @typedef {(url: string | URL, init?: import('node-fetch').RequestInit) =>
 *  Promise<import('node-fetch').Response>}
 * FetchFunction
 *
 * @typedef {string|number|symbol} ObjectKeyType
 * */

/**
 * @param {string | URL} url
 * @param {import('type-fest').JsonValue} json
 * @returns {Promise<import('type-fest').JsonValue>}
 */
async function fetchAsJsonWithJsonBody(url, json) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(json),
  })

  if (!response.ok) await throwErrorFromBadStatus(url, response)

  return await response.json()
}

/**
 *
 * @param {string | URL} url
 * @param {import('node-fetch').Response} response
 * @returns {Promise<void>}
 */
async function throwErrorFromBadStatus(url, response) {
  const body = await response.text().catch(() => `failed to get body of error`)

  throw makeError(`Response ${response.status} returned from ${url}, body: ${body}`, {
    code: 'ERR_X_STATUS_CODE_NOT_OK',
    status: response.status,
    statusText: response.statusText,
    headers: response.headers.raw(),
    body: body,
  })
}

/**
 * @template {ObjectKeyType} K, T
 * @template {Record<K, T>} P
 * @param {Error|string} error
 * @param {P} [properties=undefined]
 *
 * @returns {import('type-fest').Merge<P, Error>}
 */
function makeError(error, properties) {
  if (typeof error === 'string') {
    error = new Error(error)
  }
  if (!properties) return error

  return Object.assign(error, properties)
}

module.exports = {
  fetchAsJsonWithJsonBody,
  throwErrorFromBadStatus,
}
