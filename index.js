;(() => {
  'use strict'

  const {denomination, descendingSort} = require('./constants.js')
  const availableDenomination = Object.keys(denomination)

  const util = {
    splitAmount({currentDenomination, amount}) {
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
    },

    sendResponse({ok, data, value}) {
      return {
        ok,
        payload: {
          data,
          value
        }
      }
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
        return util.sendResponse({
          ok: false,
          data: toBeChanged,
          value: 'Not enough money has been paid!'
        })
      }

      if (toBeChanged === 0) {
        return util.sendResponse({
          ok: true,
          data: toBeChanged,
          value: null
        })
      }

      const {amount, change} = util.splitAmount({
        currentDenomination: this.currentDenomination,
        amount: toBeChanged * this.reference
      })

      if (amount > 0) {
        return util.sendResponse({
          ok: false,
          data: amount,
          value: "Can't change. The available denomination is not enough."
        })
      }

      return util.sendResponse({
        ok: true,
        data: toBeChanged,
        value: change
      })
    }
  }

  Till.util = util

  if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = Till
  } else if (typeof window !== 'undefined') {
    window.Till = Till
  }
})()
