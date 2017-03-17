/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { PageableListContainer } from '@regardsoss/components'
import { AccessRightComponent } from '../../src/components/AccessRightComponent'
import AccessGroupDump from '../model/dump/AccessGroupDump'
import PluginMetaDataDump from '../model/dump/PluginMetaDataDump'
import PluginConfigurationDump from '../model/dump/PluginConfigurationDump'
import AccessRightFormComponent from '../../src/components/AccessRightFormComponent'

describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightComponent', () => {
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
    assert.isDefined(AccessRightComponent)
    assert.isDefined(AccessRightFormComponent)
    assert.isDefined(PageableListContainer)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      layout: {
        cardEspaced: {},
      },
    },
  }
  it('Render properly', () => {
    const props = {
      accessGroupList: AccessGroupDump,
      pluginMetaDataList: PluginMetaDataDump,
      pluginConfigurationList: PluginConfigurationDump,
      onSubmit: () => {},
      onDelete: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightComponent {...props} />, { context })
    expect(enzymeWrapper.find(AccessRightFormComponent)).to.have.length(1)
    expect(enzymeWrapper.find(PageableListContainer)).to.have.length(1)
  })
})
