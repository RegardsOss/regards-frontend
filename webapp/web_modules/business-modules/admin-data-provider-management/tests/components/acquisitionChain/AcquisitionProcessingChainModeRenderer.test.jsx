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
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AcquisitionProcessingChainModeRenderer } from '../../../src/components/acquisitionChain/AcquisitionProcessingChainModeRenderer'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AcquisitionProcessingChainModeRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing AcquisitionProcessingChainModeRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainModeRenderer)
  })
  it('should render correctly mode AUTO', () => {
    const props = {
      entity: {
        content: {
          chain: {
            id: 0,
            mode: DataProviderDomain.AcquisitionProcessingChainModeEnum.AUTO,
            versioningMode: IngestDomain.VERSIONING_MODES_ENUM.INC_VERSION,
            label: 'truc',
            active: true,
            ingestChain: 'truc',
            validationPluginConf: {},
            productPluginConf: {},
            generateSipPluginConf: {},
          },
          active: true,
          deletionPending: false,
        },
      },
      onToggle: () => {},
    }
    shallow(<AcquisitionProcessingChainModeRenderer {...props} />, { context })
  })
  it('should render correctly mode MANUAL', () => {
    const props = {
      entity: {
        content: {
          chain: {
            id: 0,
            mode: DataProviderDomain.AcquisitionProcessingChainModeEnum.MANUAL,
            versioningMode: IngestDomain.VERSIONING_MODES_ENUM.MANUAL,
            label: 'truc',
            active: true,
            ingestChain: 'truc',
            validationPluginConf: {},
            productPluginConf: {},
            generateSipPluginConf: {},
          },
          active: true,
          deletionPending: false,
        },
      },
      onToggle: () => {},
    }
    shallow(<AcquisitionProcessingChainModeRenderer {...props} />, { context })
  })
})
