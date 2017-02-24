/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import AuthenticationDialogComponent from '../../src/components/AuthenticationDialogComponent'
import styles from '../../src/styles/styles'

/**
 * Tests for AuthenticationDialogComponent
 * @author Sébastien binda
 */
describe('[AUTHENTICATION] Testing AuthenticationDialogComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AuthenticationDialogComponent)
  })
  const context = {
    muiTheme: {},
    moduleTheme: styles({
      palette: {},
    }),
  }
  it('Should render properly', () => {
    // quick test: just checking if render is done without error
    shallow(<AuthenticationDialogComponent open><div /></AuthenticationDialogComponent>, { context })
  })
})
