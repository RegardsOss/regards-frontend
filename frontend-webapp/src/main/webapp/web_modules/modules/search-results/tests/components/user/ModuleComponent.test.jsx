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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleComponent from '../../../src/components/user/ModuleComponent'
import styles from '../../../src/styles/styles'
import { DISPLAY_MODE_VALUES } from '../../../src/definitions/DisplayModeEnum'

const context = buildTestContext(styles)

describe('[Search Results] Testing ModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleComponent)
  })
  it('should render properly', () => {
    const props = {
      appName: 'hello.app',
      project: 'say-hello',
      searchQuery: 'kikikisonlessnorki?',
      enableFacettes: true,
      enableDownload: true,
      displayMode: DISPLAY_MODE_VALUES.DISPLAY_DATA_DATASET,
      facettesQuery: '',
      initialDatasetIpId: 'URN:DATASET:8',
      attributesConf: [],
      attributesRegroupementsConf: [],
      attributeModels: {},
      expanded: true,
      onExpandChange: () => { },
    }
    shallow(<ModuleComponent {...props} />, { context })
  })
})
