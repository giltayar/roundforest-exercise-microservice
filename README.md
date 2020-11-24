# roundforest-exercise-microservice

> **READ THIS REAMDE CAREFULLY BEFORE STARTING THE EXERCISE. THE _WHOLE_ README!**

Write a "calculator" web app. It can do addition and substraction, and remember
the operations done on it!

## Prerequisites

1. Node v14 or later
2. Docker, to enable running Postgres. If you don't have Docker installed, and don't want
   to install it, you can run Postgres by yourself (the instructions to make the
   exercise use your own Postgres installation are included here).

## Installation

Before everything, fork this repository to your user. The result of this exercise
is the forked repository.

Now, after cloning, execute `npm ci` (or `npm install` if you are so inclined) in the
repository directory:

```sh
npm ci
```

## Running the tests

To see whether your app is correct, you should run the tests.
At first, these tests will fail, because you haven't written the microservice!
But let's run the anyway.

If you have Docker running, just run `npm test`:

```sh
npm test
```

All the tests fail on "connection refused", which makes sense, because no webapp is listening
on port 8080.

If you don't have Docker but have Postgress running, set the env variables
`POSTGRES_ADDRESS`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` to the appropriate values
before running `npm test`:

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

You can find the tests at `test/integ/roundforest-exercise-microservice.integ.test.js`.

### Running just one test

If you want to run just one test, which you probably want to when developing:

1. Edit `test/integ/roundforest-exercise-microservice.integ.test.js`
2. Find the test you want to run. It should be `it('the name of the test')`
3. Change the `it` to `it.only`
4. Run `npm test` again

## What you should implement

You should export an async function `runMicroservice` in `src/roundforest-exercise-microservice.js`.
It should create the web app, and listen on the port given,
and return _when the webapp is listening_ on the port given as a parameter.
It will also be given the host and port of the postgres server so that it can connect to it.

The web app needs to have four REST entry points:

1. `POST /plus`: accepts (in the body of the request) a JSON array (`[left, right]`) of the two operands,
   and returns `{"result": <the sum of the operands>}`. It will also store
   a log of the operation in the Postgres DB
1. `POST /minus`: accepts (in the body of the request) a JSON array (`[left, right]`) of the two operands,
   and returns `{"result": <the diff of the operands (left - right)>}`. It will also store
   a log of the operation in the Postgres DB
1. `POST /list:`, returns an array with a list of the operations performed. You can look at the last
   test in `test/integ/roundforest-exercise-microservice.integ.test.js` to see the
   JSON format of the return value.
1. `POST /clear`, clears the log of all the operations, and returns `{}`

All the above entry points are tested in the test, so you can look at the test if you don't
understand something.

You should also export `schema`: a string with the schema you need in the . The test will execute
this string against the database so the schema will be ready for you.

> The schema should ensure that if it runs and the table already exists, it will not fail. The
canonical way to do so is to use `create table if not exists <name-of-table> (...)`.

## Definition of Done

1. The tests pass
1. You are satisfied with the code
1. You have commited and pushed the code to your forked repository
1. You should contact me with the link to your forked repository

If you have _any_ questions, please don't hesitate to ask. Remember: there is no
such thing as a dumb question.

Good luck!
