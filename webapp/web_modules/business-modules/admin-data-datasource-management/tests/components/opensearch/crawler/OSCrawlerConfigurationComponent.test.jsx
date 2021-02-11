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
 */
import { CardActionsComponent } from '@regardsoss/components'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Card from 'material-ui/Card'
import OpenSearchStepperComponent from '../../../../src/components/opensearch/OpenSearchStepperComponent'
import { OSCrawlerConfigurationComponent } from '../../../../src/components/opensearch/crawler/OSCrawlerConfigurationComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSCrawlerConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSCrawlerConfigurationComponent)
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
    }

    const wrapper = shallow(<OSCrawlerConfigurationComponent {...props} />, { context })
    const stepper = wrapper.find(OpenSearchStepperComponent)

    assert.equal(wrapper.find(Card).length, 1, 'Should render a Material-UI Card')

    assert.equal(stepper.length, 1, 'Should render a stepper')
    assert.equal(stepper.prop('stepIndex'), 0, 'The stepper should be at the right index')

    assert.equal(wrapper.find(Field).length, 3, 'Should render 3 fields')
    assert.equal(wrapper.find(CardActionsComponent).length, 1, 'Should render a group of buttons')
  })
})
