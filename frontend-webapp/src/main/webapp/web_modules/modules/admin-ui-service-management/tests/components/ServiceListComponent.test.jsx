/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import ServiceListComponent from '../../src/components/ServiceListComponent'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceListComponent)
    assert.isDefined(Card)
  })

  it('Render properly', () => {
    const handleOpenSpy = spy()
    const handleBackSpy = spy()
    const props = {
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      handleOpen: handleOpenSpy,
      handleBack: handleBackSpy,
    }

    const enzymeWrapper = shallow(<ServiceListComponent {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(Card)).to.have.length(6)
    assert.isTrue(handleOpenSpy.notCalled, 'Not called yet')
    assert.isTrue(handleBackSpy.notCalled, 'Not called yet')
  })
})
