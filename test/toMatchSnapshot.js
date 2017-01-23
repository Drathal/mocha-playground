import path from 'path'
import fs from 'fs'
import pretty from 'pretty'
import sanitize from 'sanitize-filename'

const formatTestName = (filename) => path.basename(filename).replace(/\.(spec|test)\.js/g, '')
const formatTestTitle = (title) => sanitize(title).replace(/\s/g, '')
const prettifiy = (content) => pretty(content).trim().replace(/\s*\n/g, '\n')
const writeSnapshot = (filename, content) => fs.writeFileSync(filename, content)
const readSnapshot = (filename) => fs.readFileSync(filename, 'utf8')

module.exports = function (chai) {
  chai.Assertion.addMethod('toMatchSnapshot', function toMatchSnapshot(mocha) {
    chai.assert.ok(mocha, '[error] can not get mocha context - please make sure to call ".toMatchSnapshot(this)" inside a function')

    const snapshotName = `${path.dirname(mocha.test.parent.file)}/`
      + `${formatTestName(mocha.test.parent.file)}.snapshot.`
      + `${formatTestTitle(mocha.test.title)}.html`

    if (!fs.existsSync(snapshotName)) {
      writeSnapshot(snapshotName, prettifiy(this._obj))
      return chai.assert(true, '[error] toMatchSnapshot - failed to create snapshot ')
    }

    chai.assert.equal(readSnapshot(snapshotName), prettifiy(this._obj), 'snapshot not matched')
  })
}