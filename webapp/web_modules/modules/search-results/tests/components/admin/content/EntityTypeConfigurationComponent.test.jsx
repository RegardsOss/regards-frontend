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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EntityTypeConfigurationComponent from '../../../../src/components/admin/content/EntityTypeConfigurationComponent'
import styles from '../../../../src/styles'
import { configuration as dataConfiguration } from '../../../dumps/data.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test EntityTypeConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing EntityTypeConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityTypeConfigurationComponent)
  })
  const testCases = [{
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    values: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA],
    shouldHaveEnableDownload: true,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    values: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET],
    shouldHaveEnableDownload: false,
  }]

  testCases.forEach(({ type, values, shouldHaveEnableDownload }) => it(`should render correctly with ${type} form values`, () => {
    // NOTE: we emulate an empty namespace below, as configuration holds form values at root
    const rootNamespace = `viewsGroups.${type}`
    const props = {
      type,
      currentTypeNamespace: rootNamespace,
      currentTypeFormValues: values,
    }
    const enzymeWrapper = shallow(<EntityTypeConfigurationComponent {...props} />, { context })
    // 1 - Initial mode field
    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.initialMode`), 1,
      'There should be initial view mode selection field')
    // 2 - Title fields
    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.tabTitle.en`), 1,
      'There should be english title field')
    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.tabTitle.fr`), 1,
      'There should be french title field')

    assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.enableRefresh`), 1,
      'There should be enable refresh field')

    // 3 - Enable download field should be present for DATA
    if (shouldHaveEnableDownload) {
      assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.enableDownload`), 1,
        'There should be enable download field')
    } else {
      assert.lengthOf(enzymeWrapper.findWhere((c) => c.props().name === `${rootNamespace}.enableDownload`), 0,
        'There should not be enable download field')
    }
  }))
})
