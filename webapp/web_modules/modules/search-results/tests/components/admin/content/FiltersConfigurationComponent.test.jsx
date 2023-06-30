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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FiltersConfigurationComponent from '../../../../src/components/admin/content/FiltersConfigurationComponent'
import styles from '../../../../src/styles'
import { attributes } from '../../../dumps/attributes.dump'
import { configuration as dataConfiguration } from '../../../dumps/data.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test FiltersConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing FiltersConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FiltersConfigurationComponent)
  })
  it('should render correctly', () => {
    // NOTE: we emulate an empty namespace below, as configuration holds form values at root
    const rootNamespace = 'any'
    const props = {
      availableAttributes: attributes,
      currentNamespace: rootNamespace,
      currentFormValues: dataConfiguration,
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<FiltersConfigurationComponent {...props} />, { context })
    // 1 - DATA facets enabled
    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.facets.enabledFor.${DamDomain.ENTITY_TYPES_ENUM.DATA}`), 1,
      'There should be facets enabled for DATA field')
    // 2 - DATASET facets enabled
    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.facets.enabledFor.${DamDomain.ENTITY_TYPES_ENUM.DATASET}`), 1,
      'There should be facets enabled for DATASETfield')
    // 3 - Facets initially enabled
    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.facets.initiallyEnabled`), 1,
      'There should be facets initially enabled field')
    // 3 - Attributes list field
    const attributesListField = enzymeWrapper.find(AttributesListConfigurationComponent)
    assert.lengthOf(attributesListField, 1, 'There should be attributes list field')
    testSuiteHelpers.assertWrapperProperties(attributesListField, {
      selectableAttributes: props.availableAttributes,
      attributesFilter: DamDomain.AttributeModelController.isValidFacetAttribute,
      attributesList: props.currentFormValues.facets.list,
      attributesListFieldName: `${rootNamespace}.facets.list`,
      changeField: props.changeField,
      allowLabel: true,
    }, 'Attributes list field properties should be correctly set up')
  })
})
