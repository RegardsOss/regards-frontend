/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ModelAttributeFormContainer } from '../../src/containers/ModelAttributeFormContainer'

const distributedAttrModels = {
  ATTR_REMAINING: {
    fragments: {},
    attrs: [DumpProvider.getNthEntity('DataManagementClient', 'AttributeModel', 1)],
  },
  ATTR_ASSOCIATED: {
    fragments: {},
    attrs: [DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel')],
  },
}
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT]Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModelAttributeFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'project name',
        model_id: '1',
      },
      // from mapStateToProps
      model: DumpProvider.getFirstEntity('DataManagementClient', 'Model'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      attributeModelList: DumpProvider.get('DataManagementClient', 'AttributeModel'),
      isModelFetching: false,
      isModelAttributeFetching: false,
      isAttributeModelFetching: false,
      // from mapDispatchToProps
      createModelAttribute: () => { },
      fetchAttributeModelList: () => { },
      fetchModelAttributeList: () => { },
      deleteModelAttribute: () => { },
      fetchModel: () => { },
      bindFragment: () => { },
      unbindFragment: () => { },
      fetchModelAttributeComputationTypesList: () => { },
    }

    const enzymeWrapper = shallow(<ModelAttributeFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    expect(subComponent).to.have.length(1)
    assert.isFunction(subComponent.prop('children'))
    assert.deepEqual(subComponent.prop('children'), enzymeWrapper.instance().getFormComponent)
    assert.deepEqual(enzymeWrapper.instance().getFormComponent().props.distributedAttrModels, distributedAttrModels)
  })
})
