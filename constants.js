module.exports.denomination = {
  5000: '£50',
  2000: '£20',
  1000: '£10',
  500: '£5',
  200: '£2',
  100: '£1',
  50: '50p',
  20: '20p',
  10: '10p',
  5: '5p',
  2: '2p',
  1: '1p'
}

module.exports.descendingSort = (itemA, itemB) => {
  if (itemA > itemB) {
    return -1
  }

  if (itemA < itemB) {
    return 1
  }

  return 0
}
