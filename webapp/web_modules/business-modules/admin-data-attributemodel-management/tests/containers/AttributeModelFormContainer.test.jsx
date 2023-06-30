/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AttributeModelFormContainer } from '../../src/containers/AttributeModelFormContainer'
import AttributeModelFormComponent from '../../src/components/AttributeModelFormComponent'

const context = buildTestContext()

/**
 * Tests for AttributeModelFormContainer
 *
 * @author Théo Lasserre
 */
describe('[ADMIN DATA ATTRIBUTEMODEL MANAGEMENT] Testing AttributeModelFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeModelFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly for creation', () => {
    const fetchAttrModelSpy = spy()
    const fetchAttributeModelTypeSpy = spy()
    const fetchFragmentSpy = spy()
    const fetchAttributeModelRestrictionSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        attrModel_id: undefined,
        fragment_name: 'test',
      },
      // from mapStateToProps
      attrModel: {},
      isAttributeModelFetching: false,
      attrModelTypeList: [],
      isAttributeModelRestrictionFetching: false,
      attrModelRestrictionList: [],
      isAttributeModelTypeFetching: false,
      fragmentList: {},
      isFragmentFetching: false,
      // from mapDispatchToProps
      createAttrModel: () => { },
      fetchAttrModel: fetchAttrModelSpy,
      updateAttrModel: () => { },
      fetchAttributeModelTypeList: fetchAttributeModelTypeSpy,
      flushAttributeModelRestriction: () => { },
      fetchFragmentList: fetchFragmentSpy,
      fetchAttributeModelRestrictionList: fetchAttributeModelRestrictionSpy,
    }
    const enzymeWrapper = shallow(<AttributeModelFormContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AttributeModelFormComponent)
    expect(componentWrapper).to.have.length(1)
    const wrapperInstance = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onSubmit: wrapperInstance.handleCreate,
      backUrl: wrapperInstance.getBackUrl(),
      attrModelTypeList: props.attrModelTypeList,
      attrModelRestrictionList: props.attrModelRestrictionList,
      fragmentList: props.fragmentList,
      handleUpdateAttributeModelRestriction: wrapperInstance.handleUpdateAttributeModelRestriction,
      flushAttributeModelRestriction: props.flushAttributeModelRestriction,
      defaultFragmentName: props.params.fragment_name,
    }, 'Component should define the expected properties')
  })

  it('Render properly for edition loading', () => {
    const fetchAttrModelSpy = spy()
    const fetchAttributeModelTypeSpy = spy()
    const fetchFragmentSpy = spy()
    const fetchAttributeModelRestrictionSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        attrModel_id: 'test',
        fragment_name: 'test',
      },
      // from mapStateToProps
      attrModel: DumpProvider.getNthEntity('DataManagementClient', 'AttributeModel', 2),
      isAttributeModelFetching: false,
      attrModelTypeList: [],
      isAttributeModelRestrictionFetching: true,
      attrModelRestrictionList: [],
      isAttributeModelTypeFetching: true,
      fragmentList: {},
      isFragmentFetching: true,
      // from mapDispatchToProps
      createAttrModel: () => { },
      fetchAttrModel: fetchAttrModelSpy,
      updateAttrModel: () => { },
      fetchAttributeModelTypeList: fetchAttributeModelTypeSpy,
      flushAttributeModelRestriction: () => { },
      fetchFragmentList: fetchFragmentSpy,
      fetchAttributeModelRestrictionList: fetchAttributeModelRestrictionSpy,
    }
    const enzymeWrapper = shallow(<AttributeModelFormContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FormLoadingComponent)
    expect(componentWrapper).to.have.length(1)
  })

  it('Render properly for edition', () => {
    const fetchAttrModelSpy = spy()
    const fetchAttributeModelTypeSpy = spy()
    const fetchFragmentSpy = spy()
    const fetchAttributeModelRestrictionSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        attrModel_id: 'test',
        fragment_name: 'test',
      },
      // from mapStateToProps
      attrModel: DumpProvider.getNthEntity('DataManagementClient', 'AttributeModel', 2),
      isAttributeModelFetching: false,
      attrModelTypeList: ['STRING', 'JSON', 'INTEGER', 'DOUBLE'],
      isAttributeModelRestrictionFetching: false,
      attrModelRestrictionList: ['JSON_SCHEMA'],
      isAttributeModelTypeFetching: false,
      fragmentList: { },
      isFragmentFetching: false,
      // from mapDispatchToProps
      createAttrModel: () => { },
      fetchAttrModel: fetchAttrModelSpy,
      updateAttrModel: () => { },
      fetchAttributeModelTypeList: fetchAttributeModelTypeSpy,
      flushAttributeModelRestriction: () => { },
      fetchFragmentList: fetchFragmentSpy,
      fetchAttributeModelRestrictionList: fetchAttributeModelRestrictionSpy,
    }
    const enzymeWrapper = shallow(<AttributeModelFormContainer {...props} />, { context })
    enzymeWrapper.instance().setState({ isLoading: false })
    const componentWrapper = enzymeWrapper.find(AttributeModelFormComponent)
    expect(componentWrapper).to.have.length(1)
    const wrapperInstance = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onSubmit: wrapperInstance.handleUpdate,
      backUrl: wrapperInstance.getBackUrl(),
      currentAttrModel: props.attrModel,
      attrModelTypeList: props.attrModelTypeList,
      attrModelRestrictionList: props.attrModelRestrictionList,
      fragmentList: props.fragmentList,
      handleUpdateAttributeModelRestriction: wrapperInstance.handleUpdateAttributeModelRestriction,
      defaultFragmentName: props.params.fragment_name,
    }, 'Component should define the expected properties')
  })
})
