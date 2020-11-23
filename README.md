# roundforest-exercise-microservice

Write a "calculator" microservice. It can do addition and substraction, and remember
the operations per-user!

## Pre-requisites

1. Node v14 or later
2. Docker, to enable running Postgres. If you don't have Docker installed, and don't want
   to install it, you can run Postgres by yourself (the instructions to do so are included).

## Installation

First, `npm ci` (or `npm install` if you are so inclined):

```sh
npm ci
```

## Running the tests

Now you can run the tests. These tests will fail, because you haven't written the microservice!
But let's run the anyway.

If you have Docker running, just run `npm test`:

```sh
npm test
```

Lots of tests will fail, which makes sense.

If you don't have Docker but have Postgress running, set the env variables
POSTGRES_ADDRESS, POSTGRES_USER, POSTGRES_PASSWORD to the appropriate values before running
`npm test`:

(For Windows):

```sh
set POSTGRES_ADDRESS=localhost:5432
set POSTGRES_USER=postgres
set POSTGRES_PASSWORD=
npm test
```

(For Mac/Linux):

```sh
export POSTGRES_ADDRESS=localhost:5432
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=
npm test
```

You can find the tests at `test/integ/roundforest-exercise-microservice.integ.test.js`

### Running just one test

If you want to run just one test...

1. Edit `test/integ/roundforest-exercise-microservice.integ.test.js`
2. Find the test you want to run. It should be `it('the name of the test')`
3. Change the `it` to `it.only`
4. Run `npm test` again

### Exercise is completed when

All the tests pass.
