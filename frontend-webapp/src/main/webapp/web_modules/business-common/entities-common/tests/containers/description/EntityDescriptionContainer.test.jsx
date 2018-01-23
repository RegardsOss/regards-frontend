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
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelSelectors from '../../../src/model/description/DescriptionLevelSelectors'
import { EntityDescriptionContainer } from '../../../src/containers/description/EntityDescriptionContainer'
import DownloadDescriptionClient from '../../../src/clients/DownloadDescriptionClient'
import styles from '../../../src/styles/styles'


const context = buildTestContext(styles)


describe('[Entities Common] Testing EntityDescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityDescriptionContainer)
  })
  it('should render correctly no data', () => {
    const props = {
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('common'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors([]),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
      downloadDescriptionClient: new DownloadDescriptionClient('test', []),
      currentTab: DescriptionLevelActions.TABS_ENUM.DESCRIPTION,
      shownEntity: null, // NO DATA
      onClose: () => { },
      changeTab: () => { },
    }

    shallow(<EntityDescriptionContainer {...props} />, { context })
  })

  it('should render correctly', () => {
    const props = {
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('common'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors([]),
      levelActions: new DescriptionLevelActions('test'),
      levelSelectors: getDescriptionLevelSelectors([]),
      downloadDescriptionClient: new DownloadDescriptionClient('test', []),
      currentTab: DescriptionLevelActions.TABS_ENUM.DESCRIPTION,
      shownEntity: {
        content: {
          ipId: 'URN:helloooooooooooooo Nanny!',
          model: {
            id: 1,
          },
          label: 'Hello, dear nanny',
          tags: [],
          entityType: 'COLLECTION',
        },
      },
      onClose: () => { },
      changeTab: () => { },
    }
    shallow(<EntityDescriptionContainer {...props} />, { context })
  })
})
