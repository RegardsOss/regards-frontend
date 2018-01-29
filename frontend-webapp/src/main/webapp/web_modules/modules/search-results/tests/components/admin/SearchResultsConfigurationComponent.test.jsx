/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import SearchResultsConfigurationComponent from '../../../src/components/admin/SearchResultsConfigurationComponent'
import Styles from '../../../src/styles/styles'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[Search Results] Testing SearchResultsConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(Styles) }

  it('Should render a SearchResultsConfigurationComponent to configure search results', () => {
    const selectCallback = spy()
    const props = {
      defaultSelected: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      onSelectType: selectCallback,
      disabled: false,

      dataAttributeModels: {},
      datasetAttributeModels: {},
      documentAttributeModels: {},
      currentFormValues: {},
      initialFormValues: {},
      isCreating: true,
      adminConf: {

      },
      currentNamespace: 'conf',
      changeField: () => { },
    }

    const wrapper = shallow(<SearchResultsConfigurationComponent {...props} />, options)

    const showDatasetsField = wrapper.find(Field).find({ name: 'conf.enableDownload' })
    assert(showDatasetsField.length === 1, 'The download field should be defined')

    const showFacettes = wrapper.find(Field).find({ name: 'conf.enableFacettes' })
    assert(showFacettes.length === 1, 'The facettes field should be defined')
  })
})
