/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import BreadcrumbComponent from '../../src/components/BreadcrumbComponent'

import styles from '../../src/styles/styles'

describe('[SEARCH FACETS] Testing BreadcrumbComponent', () => {
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
    assert.isDefined(BreadcrumbComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {
      },
    },
    moduleTheme: styles({}),
  }
  // TODO test some rendering
  it('should render properly', () => {
    const props = {
    }
    const enzymeWrapper = shallow(<BreadcrumbComponent {...props} />, { context })
    // TODO : the test
    // assert.equal(enzymeWrapper.find(AComponent).length, ALENGTH)
    // TODO or something like that
    // assert.isFalse(enzymeWrapper.find(AComponent).props().isLoading, 'Loading should be false')
  })
})
