/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import FilterDisplayComponent from '../../src/components/FilterDisplayComponent'

import styles from '../../src/styles/styles'

describe('[SEARCH FACETS] Testing FilterDisplayComponent', () => {
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
    assert.isDefined(FilterDisplayComponent)
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
      filter: {
        filterLabel: 'any',
        filterKey: 'any',
        openSearchQuery: ' any',
      },
      deleteFilter: () => { },
    }
    // simple render test (nothing static to test here)
    shallow(<FilterDisplayComponent {...props} />, { context })
  })
})
