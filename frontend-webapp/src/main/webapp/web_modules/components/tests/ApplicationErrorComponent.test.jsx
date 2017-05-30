/**
 * @author lmieulet
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ApplicationErrorComponent } from '../src/ApplicationErrorComponent'

describe('[COMPONENTS] Testing ApplicationErrorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplicationErrorComponent)
  })

  it('should render self and subcomponents', () => {
    const enzymeWrapper = shallow(<ApplicationErrorComponent />)
    const subComponent = enzymeWrapper.find('div')
    expect(subComponent).to.have.length(1)
  })
})
