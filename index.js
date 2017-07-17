const demonination = {
  5000: '£50',
  2000: '£20',
  1000: '£10',
  500: '£5,',
  200: '£2',
  100: '£1',
  50: '50p',
  20: '20p',
  10: '10p',
  5: '5p',
  2: '2p',
  1: '1p'
}

const available = Object.keys(demonination).reverse()

const splitAmount = amount => {
  console.log(available)
  return available.reduce(
    (obj, item) => {
      const {toChange} = obj

      if (toChange >= item) {
        const quantity = parseInt(toChange / item)
        const out = {
          toChange: toChange % item,
          change: Object.assign({}, obj.change, {
            [demonination[item]]: quantity
          })
        }

        return Object.assign({}, obj, out)
      }

      return obj
    },
    {
      toChange: amount,
      change: {}
    }
  )
}

const getChange = (cost, payment) => {
  const change = payment - cost

  if (change < 0) {
    return console.error("You don't have enough money!")
  }

  if (change === 0) {
    return console.log('No change. Payed the exact sum.')
  }

  return splitAmount(change * 100)
}

console.log(getChange(0.36, 0.36))
