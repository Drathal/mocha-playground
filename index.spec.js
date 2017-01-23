import { getNextPageUrl } from './index'

const link =
  '<https://api.github.com/repositories/21779020/stargazers?page=2>; rel="next", ' +
  '<https://api.github.com/repositories/21779020/stargazers?page=205>; rel="last"'

describe('getNextPageUrl', function () {

  it('should return the link', function () {
    expect(getNextPageUrl(link)).to.equal('https://api.github.com/repositories/21779020/stargazers?page=2')
  })

})

describe('getNextPageUrl - snapshot', function () {

  it('should return the link', function () {
    expect(getNextPageUrl(link)).toMatchSnapshot(this)
  })

})

describe('getNextPageUrl - snapshot (fatArrow)', () => {

  it('should return the link', () => {
    expect(getNextPageUrl(link)).toMatchSnapshot(this)
  })

})