/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LazyModuleComponent } from '@regardsoss/modules'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'

import styles from '../../../src/styles/styles'

describe('[Search Graph] Testing SearchResultForm', () => {
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
    assert.isDefined(SearchResultForm)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
    moduleTheme: styles({ textField: {} }),
  }
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
    }
    const enzymeWrapper = shallow(<SearchResultForm {...props} />, { context })
    // assert the component delegates to search results module configuration pane
    const lazyModule = enzymeWrapper.find(LazyModuleComponent)
    assert.equal(lazyModule.length, 1, 'There should be a lazy module for search results configuration')
    assert.equal(lazyModule.at(0).props().module.name, 'search-results', 'There lazy module configuration should point search results')
    assert.isTrue(lazyModule.at(0).props().admin, 'The module should be rendered for configuration')
  })
})
