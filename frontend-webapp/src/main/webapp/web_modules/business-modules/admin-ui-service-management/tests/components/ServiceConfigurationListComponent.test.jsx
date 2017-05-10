/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import ServiceConfigurationListComponent from '../../src/components/ServiceConfigurationListComponent'
import PluginServiceDump from './PluginServiceDump'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceConfigurationListComponent)
    assert.isDefined(TableRow)
  })

  it('Render properly', () => {
    const handleDeleteSpy = spy()
    const handleDuplicateSpy = spy()
    const handleEditSpy = spy()
    const handleToggleActivationSpy = spy()
    const handleToggleDefaultSpy = spy()
    const props = {
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      plugin: PluginServiceDump,
      handleDelete: handleDeleteSpy,
      handleDuplicate: handleDuplicateSpy,
      handleEdit: handleEditSpy,
      handleToggleActivation: handleToggleActivationSpy,
      handleToggleDefault: handleToggleDefaultSpy,
      createUrl: '#',
      backUrl: '#',
    }

    const enzymeWrapper = shallow(<ServiceConfigurationListComponent {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(TableRow)).to.have.length(2)
    assert.isTrue(handleDeleteSpy.notCalled, 'Not called yet')
    assert.isTrue(handleDuplicateSpy.notCalled, 'Not called yet')
    assert.isTrue(handleEditSpy.notCalled, 'Not called yet')
    assert.isTrue(handleToggleActivationSpy.notCalled, 'Not called yet')
    assert.isTrue(handleToggleDefaultSpy.notCalled, 'Not called yet')
  })
})
