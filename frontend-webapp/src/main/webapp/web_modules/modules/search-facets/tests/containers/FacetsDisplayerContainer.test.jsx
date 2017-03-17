/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import FacetsDisplayerComponent from '../../src/components/FacetsDisplayerComponent'
import { FacetsDisplayerContainer } from '../../src/containers/FacetsDisplayerContainer'

import styles from '../../src/styles/styles'

describe('[SEARCH FACETS] Testing FacetsDisplayerComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(FacetsDisplayerContainer)
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
    const enzymeWrapper = shallow(<FacetsDisplayerContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(FacetsDisplayerComponent).length, 1, 'The corresponding component should be rendered')
    // TODO more tests!
  })
})
