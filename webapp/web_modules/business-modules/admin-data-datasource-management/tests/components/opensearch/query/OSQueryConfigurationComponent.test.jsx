/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardActionsComponent } from '@regardsoss/components'
import { Field, FieldArray } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Card from 'material-ui/Card'
import { DescriptorHelper } from '../../../../src/domain/opensearch/DescriptorHelper'
import OpenSearchStepperComponent from '../../../../src/components/opensearch/OpenSearchStepperComponent'
import { OSQueryConfigurationComponent } from '../../../../src/components/opensearch/query/OSQueryConfigurationComponent'
import { openSearchDescriptor } from '../../../dumps/opensearch-descriptor.dump'
import OSQueryFiltersFieldComponent from '../../../../src/components/opensearch/query/OSQueryFiltersFieldComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSQueryConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSQueryConfigurationComponent)
  })
  it('Render properly', () => {
    const urlDescriptor = DescriptorHelper.getResourceURL(openSearchDescriptor)
    const apiURL = DescriptorHelper.getWebserviceURL(urlDescriptor)
    const descriptorData = DescriptorHelper.parsePageData(urlDescriptor)
    const props = {
      initialValues: {},
      isEditing: false,
      urlDescriptor,
      onBack: () => {},
      onSubmit: () => {},
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }

    const wrapper = shallow(<OSQueryConfigurationComponent {...props} />, { context })
    const stepper = wrapper.find(OpenSearchStepperComponent)

    assert.equal(wrapper.find(Card).length, 1, 'Should render a Material-UI Card')

    assert.equal(stepper.length, 1, 'Should render a stepper')
    assert.equal(stepper.prop('stepIndex'), 1, 'The stepper should be at the right index')

    // Check last update parameter and pages size field
    const fields = wrapper.find(Field)
    assert.lengthOf(fields.findWhere((n) => n.props().name === 'lastUpdateParam'), 1, ' There should be last update parameter field')
    assert.lengthOf(fields.findWhere((n) => n.props().name === 'pagesSize'), 1, ' There should be pages size field')
    // Check parameters list
    const fieldArrays = wrapper.find(FieldArray)
    const parametersField = fieldArrays.findWhere((n) => n.props().name === 'webserviceParameters')
    assert.lengthOf(parametersField, 1, 'There should parameters field array')
    testSuiteHelpers.assertWrapperProperties(parametersField, {
      component: OSQueryFiltersFieldComponent,
      webserviceURL: apiURL,
      pageSizeParam: descriptorData.pageSizeParam,
      selectedPageSize: descriptorData.selectedPageSize,
      pageIndexParam: descriptorData.pageIndexParam,
      firstPageIndex: descriptorData.firstPageIndex,
      invalid: props.invalid,
    }, 'parameters field properties should be correctly set')
    assert.equal(wrapper.find(CardActionsComponent).length, 1, 'There should be form actions')
  })
})
