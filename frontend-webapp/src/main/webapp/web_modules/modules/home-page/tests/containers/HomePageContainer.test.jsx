import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import root from 'window-or-global'
import { stub } from 'sinon'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { SingleContentURLDialogContainer } from '@regardsoss/components'
import HomePageContainer from '../../src/containers/HomePageContainer'
import style from '../../src/styles/styles'

const options = {
  context: buildTestContext(style),
}

// Test a component rendering
describe('[HOME PAGE MODULE] Testing home page module container', () => {
  before(() => {
    root.localStorage = {
      getItem: () => null,
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete root.localStorage
    testSuiteHelpers.after()
  })
  it('should exists', () => {
    assert.isDefined(HomePageContainer)
  })
  it('should render self and subcomponents', () => {
    // simple render test (should not output warn nor cause errors)
    const props = {
      project: 'any',
      moduleConf: {
        htmlPath: 'http://www.viedemerde.fr',
      },
    }
    const enzymeWrapper = shallow(<HomePageContainer {...props} />, options)
    const subComponent = enzymeWrapper.find(SingleContentURLDialogContainer)
    expect(subComponent).to.have.length(1)
  })
})
