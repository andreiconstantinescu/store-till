const {denomination, descendingSort} = require('./constants.js')
const availableDenomination = Object.keys(denomination)

const splitAmount = ({currentDenomination, amount}) => {
  let currentAmount = amount
  const change = {}

  currentDenomination.map(item => {
    if (currentAmount >= item) {
      const quantity = parseInt(currentAmount / item)
      currentAmount = currentAmount % item
      Object.assign(change, {
        [denomination[item]]: quantity
      })
    }
  })

  return {
    amount: currentAmount,
    change
  }
}

class Till {
  constructor(currentDenomination = availableDenomination) {
    this.currentDenomination = currentDenomination.reverse()
    this.reference = 100
  }

  getChange(cost, payment) {
    const toBeChanged = payment - cost

    if (toBeChanged < 0) {
      return console.log('Not enough money has been paid!')
    }

    if (toBeChanged === 0) {
      return console.log('No change. Payed the exact sum.')
    }

    this.amount = toBeChanged * this.reference
    const {amount, change} = splitAmount({
      currentDenomination: this.currentDenomination,
      amount: toBeChanged * this.reference
    })

    if (amount > 0) {
      return console.log(
        "Can't change. The available denomination is not enough."
      )
    }

    return console.log(
      `Changed ${toBeChanged} into \n ${JSON.stringify(change)}`
    )
  }
}

const a = new Till()
a.getChange(5.34, 20)
