import chai from 'chai'
import toMatchSnapshot from './toMatchSnapshot'

chai.use(toMatchSnapshot)

global.expect = chai.expect
