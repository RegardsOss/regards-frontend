/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import FacetsDisplayerComponent from '../../src/components/FacetsDisplayerComponent'

import styles from '../../src/styles/styles'

describe('[SEARCH FACETS] Testing FacetsDisplayerComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(FacetsDisplayerComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {
      },
    },
    moduleTheme: styles({}),
  }
  it('should render properly', () => {
    const props = {
    }
    const enzymeWrapper = shallow(<FacetsDisplayerComponent {...props} />, { context })
    // TODO test
  })
})
