import R from 'ramda'

export const getNextPageUrl = R.pipe(
  R.split(','),
  R.find(R.indexOf('rel="next"')),
  R.split(';'),
  R.find(R.indexOf('>')),
  R.slice(1, -1)
)