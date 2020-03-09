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
 **/
import merge from 'lodash/merge'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { DefaultLayout } from '@regardsoss/layout'
import { PluginProvider } from '@regardsoss/plugins'
import { NoContentComponent } from '@regardsoss/components'
import Styles from '../../../../src/styles/styles'
import CriteriaConfigurationComponent from '../../../../src/components/admin/criterion/CriteriaConfigurationComponent'
import { UnconnectedFormCriteriaComponent } from '../../../../src/components/admin/criterion/FormCriteriaComponent'

/**
 * Tests for FormCriteriaComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormCriteriaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  const containerName = 'defaultCriterionLine'

  const testLayout = merge({}, DefaultLayout('MainContainer'), {
    containers: [
      {
        id: containerName,
        type: 'RowContainer',
        classes: [],
        styles: {},
        containers: [],
      },
    ],
  })

  it('Should render a new criteria criteria form', () => {
    const saveCriteriaCallback = spy()
    const cancelCallback = spy()
    const reduxFormInitialize = spy()
    const handleSubmitCallback = spy()
    const onChangeSelectorValue = spy()
    const onChangeField = spy()

    const props = {
      criterion: [],
      criteria: null,
      saveCriteria: saveCriteriaCallback,
      cancel: cancelCallback,
      layout: testLayout,
      selectableAttributes: {},
      availableCriterion: {},
      criterionFetching: false,
      initialize: reduxFormInitialize,
      handleSubmit: handleSubmitCallback,
      change: onChangeField,
    }

    const wrapper = shallow(<UnconnectedFormCriteriaComponent {...props} />, { context })

    // // Check for Card
    const card = wrapper.find('form')
    assert.lengthOf(card, 1, 'The Card should be rendered')

    // Check for plugin selection field
    const pluginIdField = wrapper.find(Field).find({ name: 'pluginId' })
    assert(pluginIdField.length === 1, 'The pluginId field should be rendered')

    // Check for container selection field
    const containerField = wrapper.find(Field).find({ name: 'container' })
    assert(containerField.length === 1, 'The container field should be rendered')
    const containerElements = containerField.find(MenuItem)
    assert.lengthOf(containerElements, 1, 'There should be 1 selectable container')
    assert.equal(containerElements.first().prop('value'), containerName, `The selectable container from defaultFormLayout should be ${containerName}`)

    // Check for position selection field
    const positionField = wrapper.find(Field).find({ name: 'position' })
    assert(positionField.length === 1, 'The position field should be rendered')

    // Check for form
    const form = wrapper.find('form')
    assert.equal(form.length, 1, 'The form should exist')

    // Check for specific criteria configuration
    let criteriaConf = wrapper.find(CriteriaConfigurationComponent)
    const noCriteriaConf = wrapper.find(NoContentComponent)
    assert(criteriaConf.length === 0, 'The CriteriaConfigurationComponent should not be rendered as no plugin as been selected yet')
    assert(noCriteriaConf.length === 1, 'There should be a NoContentComponent as no plugin as been selected yet')

    // Simulate selection of a criterion of id 0
    assert.isFalse(onChangeSelectorValue.called, 'The redux change value method should not be called yet')
    const event = null
    const index = 0
    const pluginId = 0
    const reduxInput = {
      onChange: onChangeSelectorValue,
    }

    pluginIdField.simulate('select', event, index, pluginId, reduxInput)

    criteriaConf = wrapper.find(CriteriaConfigurationComponent)
    const pluginProvider = wrapper.find(PluginProvider)
    assert(pluginProvider.length === 1, 'The plugin provider should be rendered as a plugin is selected')

    assert.equal(pluginProvider.prop('pluginId'), 0, 'The pluginProvider should be initialize with selected plugin id = 0')
    assert.equal(pluginProvider.prop('displayPlugin'), false, 'The pluginProvider should be initialize without plugin display')

    assert(criteriaConf.length === 1, 'The CriteriaConfigurationComponent should be rendered as a plugin as been selected')
    assert(onChangeField.calledOnce, 'The redux change field value method should be called')
    assert(onChangeSelectorValue.calledOnce, 'The redux change selector value method should be called')
  })

  it('Should render an edit criteria form', () => {
    const saveCriteriaCallback = spy()
    const cancelCallback = spy()
    const reduxFormInitialize = spy()
    const handleSubmitCallback = spy()

    const criteria = {
      id: 0,
      active: true,
      label: 'criteria de test',
      pluginId: 0,
      container: containerName,
      conf: {
        attributes: {
          searchField: 0,
        },
      },
    }

    const props = {
      criterion: [criteria],
      criteria,
      saveCriteria: saveCriteriaCallback,
      cancel: cancelCallback,
      layout: testLayout,
      selectableAttributes: {},
      availableCriterion: {},
      criterionFetching: false,
      initialize: reduxFormInitialize,
      handleSubmit: handleSubmitCallback,
      change: () => {},
    }

    const wrapper = shallow(<UnconnectedFormCriteriaComponent {...props} />, { context })

    // Check for plugin selection field
    const pluginIdField = wrapper.find(Field).find({ name: 'pluginId' })
    assert(pluginIdField.length === 1, 'The pluginId field should be rendered')

    // Check for container selection field
    const containerField = wrapper.find(Field).find({ name: 'container' })
    assert(containerField.length === 1, 'The container field should be rendered')

    // Check for position selection field
    const positionField = wrapper.find(Field).find({ name: 'position' })
    assert(positionField.length === 1, 'The position field should be rendered')

    // Check for form
    const form = wrapper.find('form')
    assert.equal(form.length, 1, 'The form should exist')

    const containerElements = containerField.find(MenuItem)
    assert.lengthOf(containerElements, 1, 'There should be 1 selectable container')
    assert.equal(containerElements.first().prop('value'), containerName, `The selectable container from defaultFormLayout should be ${containerName}`)

    // Check for specific criteria configuration
    const criteriaConf = wrapper.find(CriteriaConfigurationComponent)
    const noCriteriaConf = wrapper.find(NoContentComponent)
    assert(criteriaConf.length === 1, 'The CriteriaConfigurationComponent should be rendered')
    assert(noCriteriaConf.length === 0, "There shouldn't be a NoContentComponent as a plugin is selected")

    // Check redux form initialization
    assert(reduxFormInitialize.called, 'The redux form initialize method should be called')
  })
})
