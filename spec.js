const tape = require('tape')
const Till = require('./index.js')

tape('It splits the change correctly.', assert => {
  const theTill = new Till()
  const expectation = {
    ok: true,
    data: 14.66,
    change: {'£10': 1, '£2': 2, '50p': 1, '10p': 1, '5p': 1, '1p': 1}
  }
  const cost = 5.34
  const payment = 20
  const result = theTill.getChange(cost, payment)

  assert.equal(result.ok, expectation.ok)
  assert.deepEqual(result.payload.value, expectation.change)
  assert.equal(result.payload.data, expectation.data)
  assert.end()
})

tape('It splits the change correctly with custom denomination.', assert => {
  const theTill = new Till([100, 5, 1, 1000])
  const expectation = {
    ok: true,
    data: 14.66,
    change: {'£10': 1, '£1': 4, '5p': 13, '1p': 1}
  }
  const cost = 5.34
  const payment = 20
  const result = theTill.getChange(cost, payment)

  assert.equal(result.ok, expectation.ok)
  assert.deepEqual(result.payload.value, expectation.change)
  assert.equal(result.payload.data, expectation.data)
  assert.end()
})

tape('It fails when payment < cost.', assert => {
  const theTill = new Till([100, 5, 1, 1000])
  const expectation = {
    ok: false,
    data: -5,
    value: 'Not enough money has been paid!'
  }
  const cost = 5.34
  const payment = 0.34
  const result = theTill.getChange(cost, payment)

  assert.equal(result.ok, expectation.ok)
  assert.equal(result.payload.change, expectation.change)
  assert.equal(result.payload.data, expectation.data)
  assert.end()
})

tape('It change to be null when payment = cost.', assert => {
  const theTill = new Till([100, 5, 1, 1000])
  const expectation = {
    ok: true,
    data: 0,
    change: null
  }
  const cost = 5.34
  const payment = 5.34
  const result = theTill.getChange(cost, payment)

  assert.equal(result.ok, expectation.ok)
  assert.equal(result.payload.value, expectation.change)
  assert.equal(result.payload.data, expectation.data)
  assert.end()
})

tape(
  'It should not change when the denomination does not permit it.',
  assert => {
    const theTill = new Till([100, 1000])
    const expectation = {
      ok: false,
      data: 0.66,
      value: "Can't change. The available denomination is not enough."
    }
    const cost = 5.34
    const payment = 20
    const result = theTill.getChange(cost, payment)

    assert.equal(result.ok, expectation.ok)
    assert.equal(result.payload.value, expectation.value)
    assert.equal(result.payload.data, expectation.data)
    assert.end()
  }
)
