/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import ModuleContainer from '../../src/containers/ModuleContainer'

import styles from '../../src/styles/styles'

describe('[ SEARCH FACETS ] Testing ModuleContainer', () => {
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
    assert.isDefined(ModuleContainer)
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
      appName: 'any',
      project: 'any',
      moduleConf: {
        show: true,
        resultsSelectors: new BasicFacetsPageableSelectors(),
      },
    }
    // Test visible rendering
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    let showables = enzymeWrapper.find(ShowableAtRender)
    assert.equal(showables.length, 1, 'The facets container should be shown optionnaly')
    assert.isTrue(showables.at(0).props().show, 'The facets container should be visible when module configuration show it true')

    // Test hidden rendering
    props.moduleConf.show = false
    enzymeWrapper.setProps(props)
    showables = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showables.at(0).props().show, 'The facets container should be hidden when module configuration show it false')
  })
})
