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
import { DataManagementClient } from '@regardsoss/client'
import EntityDescriptionComponent from '../../../src/components/description/EntityDescriptionComponent'
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../src/model/description/DescriptionLevelSelectors'
import DownloadDescriptionClient from '../../../src/clients/DownloadDescriptionClient'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const testEntity = {
  content: {
    ipId: 'test',
    label: 'test',
    entityType: 'COLLECTION',
    tags: [],
  },
}

describe('[Entities Common] Testing EntityDescriptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EntityDescriptionComponent)
  })
  it('should render correctly no data', () => {
    const props = {
      // component API
      entity: null,
      open: false,

      // clients and selectors for sub components
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors(['test']),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),

      // control callback
      onSearchTag: null,
      onClose: () => { },
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
  })
  it('should render correctly with data', () => {
    const props = {
      // component API
      entity: testEntity,
      open: true,

      // clients and selectors for sub components
      downloadDescriptionClient: new DownloadDescriptionClient('test', ['test']),
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors(['test']),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors(['test']),

      // control callback
      onSearchTag: null,
      onClose: () => { },
    }
    shallow(<EntityDescriptionComponent {...props} />, { context })
  })
})
