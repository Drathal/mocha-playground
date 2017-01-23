import path from 'path'
import fs from 'fs'
import pretty from 'pretty'
import sanitize from 'sanitize-filename'

module.exports = function (chai) {
  chai.Assertion.addMethod('toMatchSnapshot', function toMatchSnapshot(mocha) {
    chai.assert.ok(mocha, 'please make sure to call "toMatchSnapshot" inside a function')

    const testfile = path.basename(mocha.test.parent.file).replace(/\.spec\.js/g, '')
    const filename = sanitize(`${mocha.test.title}`).replace(/\s/g, '')
    const filepath = path.dirname(mocha.test.parent.file)
    const snapshotfile = `${filepath}/${testfile}.snapshot.${filename}.html`

    if (!fs.existsSync(snapshotfile)) {
      fs.writeFileSync(snapshotfile.trim(), pretty(this._obj).trim())
      assert(true)
      return
    }

    const snapshot = fs.readFileSync(snapshotfile, 'utf8').trim().replace(/\s*\n/g, '\n')
    const testhtml = pretty(this._obj).trim().replace(/\s*\n/g, '\n')

    chai.assert.equal(snapshot, testhtml, 'snapshot not matched')
  })
}