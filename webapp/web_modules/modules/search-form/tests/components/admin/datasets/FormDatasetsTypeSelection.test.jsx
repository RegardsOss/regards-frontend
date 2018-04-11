/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { spy } from 'sinon'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { RadioButton } from 'material-ui/RadioButton'
import { DATASET_MODEL_TYPE } from '../../../../src/domain/DatasetSelectionTypes'
import Styles from '../../../../src/styles/styles'
import FormDatasetsTypeSelection from '../../../../src/components/admin/datasets/FormDatasetsTypeSelection'

/**
 * Tests for FormDatasetsTypeSelection
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormDatasetsTypeSelection', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  it('Should render a FormDatasetsTypeSelection to configure datasets', () => {
    const selectCallback = spy()
    const props = {
      currentNamespace: 'conf',
      defaultSelected: DATASET_MODEL_TYPE,
      onSelectType: selectCallback,
      disabled: false,
    }
    const wrapper = shallow(<FormDatasetsTypeSelection {...props} />, { context })

    const radioField = wrapper.find(Field).find({ name: 'conf.datasets.type' })
    assert(radioField.length === 1, 'The radio button to select the dataset association type should be defined')

    const radioOptions = radioField.find(RadioButton)
    assert.lengthOf(radioOptions, 3, 'There should be 3 selectable options')
  })
})
