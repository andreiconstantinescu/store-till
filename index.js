;(() => {
  'use strict'

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
      this.currentDenomination = currentDenomination.sort(descendingSort)
      this.reference = 100
    }

    getChange(cost, payment) {
      const toBeChanged = payment - cost

      if (toBeChanged < 0) {
        return 'Not enough money has been paid!'
      }

      if (toBeChanged === 0) {
        return 'No change. Payed the exact sum.'
      }

      const {amount, change} = splitAmount({
        currentDenomination: this.currentDenomination,
        amount: toBeChanged * this.reference
      })

      if (amount > 0) {
        return "Can't change. The available denomination is not enough."
      }

      return `Changed £${toBeChanged} into ${JSON.stringify(change)}`
    }
  }

  if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = Till
  } else if (typeof window !== 'undefined') {
    window.Till = Till
  }
})()
