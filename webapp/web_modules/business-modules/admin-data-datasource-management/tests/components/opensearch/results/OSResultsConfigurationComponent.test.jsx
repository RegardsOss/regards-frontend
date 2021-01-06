/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Card from 'material-ui/Card'
import { DamDomain } from '@regardsoss/domain'
import { CardActionsComponent } from '@regardsoss/components'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import OpenSearchStepperComponent from '../../../../src/components/opensearch/OpenSearchStepperComponent'
import { OSResultsConfigurationComponent } from '../../../../src/components/opensearch/results/OSResultsConfigurationComponent'

const context = buildTestContext(() => ({ openSearchCrawler: { resultsMapping: {} } }))

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSResultsConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSResultsConfigurationComponent)
  })
  it('Render properly', () => {
    const props = {
      initialValues: {},
      isEditing: false,
      fetchDescriptor: () => {},
      onBack: () => {},
      onSubmit: () => {},
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      modelList: {},
      modelAttributeList: {},
      onModelSelected: () => {},
    }

    const wrapper = shallow(<OSResultsConfigurationComponent {...props} />, { context })
    const stepper = wrapper.find(OpenSearchStepperComponent)

    assert.equal(wrapper.find(Card).length, 1, 'Should render a Material-UI Card')

    assert.equal(stepper.length, 1, 'Should render a stepper')
    assert.equal(stepper.prop('stepIndex'), 2, 'The stepper should be at the right index')

    // check field are displayed
    const allFields = wrapper.find(Field)

    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'totalResultsField'), 1, 'There should be total results input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'pageSizeField'), 1, 'There should be page size input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'modelName'), 1, 'There should be model selection field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'attributeToJSonField.label'), 1, 'There should be standard attribute label input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'attributeToJSonField.providerId'), 1, 'There should be standard attribute provider ID input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'rawDataURLPath'), 1, 'There should be raw data URL input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'quicklookURLPath'), 1, 'There should be quicklook URL input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'thumbnailURLPath'), 1, 'There should be thumbnail URL input field')
    // check buttons are displayed
    assert.lengthOf(wrapper.find(CardActionsComponent), 1, 'Should render a group of buttons')
  })
  it('should render every model attribute', () => {
    const props = {
      initialValues: {},
      isEditing: false,
      fetchDescriptor: () => {},
      onBack: () => {},
      onSubmit: () => {},
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      modelList: {},
      modelAttributeList: {
        1: {
          content: { model: {}, attribute: { jsonPath: 'frag1.attr1', name: 'attr1', type: DamDomain.MODEL_ATTR_TYPES.STRING }, name: '1' },
        },
        2: {
          content: { model: {}, attribute: { jsonPath: 'attr2', name: 'attr2', type: DamDomain.MODEL_ATTR_TYPES.LONG }, name: '1' },
        },
      },
      onModelSelected: () => {},
    }
    const wrapper = shallow(<OSResultsConfigurationComponent {...props} />, { context })
    const stepper = wrapper.find(OpenSearchStepperComponent)

    assert.equal(wrapper.find(Card).length, 1, 'Should render a Material-UI Card')

    assert.equal(stepper.length, 1, 'Should render a stepper')
    assert.equal(stepper.prop('stepIndex'), 2, 'The stepper should be at the right index')

    // check field are displayed, with model elements added
    const allFields = wrapper.find(Field)

    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'totalResultsField'), 1, 'There should be total results input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'pageSizeField'), 1, 'There should be page size input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'modelName'), 1, 'There should be model selection field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'attributeToJSonField.label'), 1, 'There should be standard attribute label input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'attributeToJSonField.providerId'), 1, 'There should be standard attribute provider ID input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'rawDataURLPath'), 1, 'There should be raw data URL input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'quicklookURLPath'), 1, 'There should be quicklook URL input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'thumbnailURLPath'), 1, 'There should be thumbnail URL input field')
    // dynamic model attributes fields
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'attributeToJSonField.frag1.attr1'), 1, 'There should be dynamic attr1 input field')
    assert.lengthOf(allFields.findWhere((n) => n.props().name === 'attributeToJSonField.attr2'), 1, 'There should be dynamic attribute attr2 input field')
    // check buttons are displayed
    assert.lengthOf(wrapper.find(CardActionsComponent), 1, 'Should render a group of buttons')
  })
})
