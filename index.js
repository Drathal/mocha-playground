import R from 'ramda'

export const getNextPageUrl = R.pipe(
  R.when(R.isNil, R.always('')),
  R.split(','),
  R.find(R.indexOf('rel="next"')),
  R.when(R.isNil, R.always('')),
  R.split(';'),
  R.find(R.indexOf('://')),
  R.replace(/</, ''),
  R.replace(/>/, ''),
  R.ifElse(R.test(/^http/g), R.identity, R.always(null))
)