/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { HateoasToggle } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AcquisitionProcessingChainEnabledRenderer } from '../../../src/components/acquisitionChain/AcquisitionProcessingChainEnabledRenderer'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AcquisitionProcessingChainEnabledRenderer
 * @author Théo Lasserre
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing AcquisitionProcessingChainEnabledRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainEnabledRenderer)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          chain: {
            id: 0,
            label: 'testChain',
            active: true,
            categories: ['test'],
            mode: DataProviderDomain.AcquisitionProcessingChainModeEnum.AUTO,
            versioningMode: IngestDomain.VERSIONING_MODES_ENUM.MANUAL,
            productsStored: true,
            locked: false,
            lastDateActivation: '01/08/2022',
            periodicity: 'test',
            ingestChain: 'ingestChain',
            fileInfos: [],
            validationPluginConf: {
              id: 1,
              pluginId: 'test',
              label: 'test',
              version: 'version',
              priorityOrder: 1,
              active: true,
              pluginClassName: 'pluginClassName',
              interfacenames: ['test1'],
              parameters: [],
              iconUrl: '',
              businessId: 'businessId',
            },
            productPluginConf: {
              id: 1,
              pluginId: 'test',
              label: 'test',
              version: 'version',
              priorityOrder: 1,
              active: true,
              pluginClassName: 'pluginClassName',
              interfacenames: ['test1'],
              parameters: [],
              iconUrl: '',
              businessId: 'businessId',
            },
            generateSipPluginConf: {
              id: 1,
              pluginId: 'test',
              label: 'test',
              version: 'version',
              priorityOrder: 1,
              active: true,
              pluginClassName: 'pluginClassName',
              interfacenames: ['test1'],
              parameters: [],
              iconUrl: '',
              businessId: 'businessId',
            },
          },
          active: true,
          deletionPending: false,
          executionBlockers: [],
        },
      },
      onToggle: () => { },
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainEnabledRenderer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(HateoasToggle), 1, 'HateoasToggle should be set')
  })
})
