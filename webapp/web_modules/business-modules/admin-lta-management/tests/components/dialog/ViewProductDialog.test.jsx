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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'
import ViewProductDialog from '../../../src/components/dialog/ViewProductDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ViewProductDialog
 * @author Théo Lasserre
 */
describe('[ADMIN LTA MANAGEMENT] Testing ViewProductDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ViewProductDialog)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          correlationId: 'f418cc03-deb4-4bdd-96a3-14f70a98ba7e',
          owner: 'regards-admin@c-s.fr',
          session: 'session_testlink_2513',
          status: 'VALIDATED',
          statusDate: '2023-02-07T10:41:29.459257Z',
          creationDate: '2023-02-07T10:41:29.459257Z',
          model: 'DataModel2497',
          storePath: '/path/subpath',
          product: {
            correlationId: 'f418cc03-deb4-4bdd-96a3-14f70a98ba7e',
            id: 'f418cc03-deb4-4bdd-96a3-14f70a98ba7e',
            datatype: 'DATA',
            geometry: {
              coordinates: [
                10,
                20,
              ],
              type: 'Point',
            },
            files: [
              {
                type: 'RAWDATA',
                url: 'http://vm-perf.cloud-espace.si.c-s.fr/img/fr_flag.png',
                filename: 'fr-flag',
                checksumMd5: '74049fd14fc214448463e88b4fa6c8d3',
                mimeType: 'application/octet-stream',
              },
            ],
            tags: [
              'TEST-LTA-SIMPLE',
            ],
            originUrn: 'myOriginUrn',
            storePath: '/path/subpath',
            session: 'session_testlink_2513',
            replaceMode: false,
            owner: 'regards-admin@c-s.fr',
          },
        },
        links: [],
      },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ViewProductDialog {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(CodeFileDisplayer), 1, 'There should be 1 CodeFileDisplayer')
    assert.lengthOf(enzymeWrapper.find(CardActionsComponent), 1, 'There should be 1 CardActionsComponent')
  })
})
