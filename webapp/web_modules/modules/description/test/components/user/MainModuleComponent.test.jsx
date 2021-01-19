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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MainModuleComponent from '../../../src/components/user/MainModuleComponent'
import styles from '../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../dumps/resolved.dump'
import HeaderBarComponent from '../../../src/components/user/header/HeaderBarComponent'

const context = buildTestContext(styles)

/**
 * Test MainModuleComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing MainModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainModuleComponent)
  })
  it('should render correctly', () => {
    const props = {
      settings: {
        showVersion: false,
        documentModels: ['any'],
        primaryQuicklookGroup: 'primary',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      descriptionEntity: resolvedDataEntity,
      selectedEntityIndex: 1,
      descriptionPath: [resolvedDatasetEntity, resolvedDataEntity],
      allowSearching: false,
      browsingTreeVisible: false,
      isDescriptionAllowed: () => true,
      onSelectInnerLink: () => {},
      onSelectEntityLink: () => {},
      onSearchWord: () => {},
      onSearchEntity: () => {},
      onSelectEntityIndex: () => {},
    }
    const enzymeWrapper = shallow(<MainModuleComponent {...props} />, { context })
    const headerBarWrapper = enzymeWrapper.find(HeaderBarComponent)
    assert.lengthOf(headerBarWrapper, 1, 'There should be the header')
    testSuiteHelpers.assertWrapperProperties(headerBarWrapper, {
      settings: props.settings,
      descriptionEntity: props.descriptionEntity,
      selectedEntityIndex: props.selectedEntityIndex,
      descriptionPath: props.descriptionPath,
      allowSearching: props.allowSearching,
      onSelectEntityIndex: props.onSelectEntityIndex,
      onSearchEntity: props.onSearchEntity,
    }, 'Header properties should be correctly set')

    // cannot test further due to Measure HOC
  })
})
