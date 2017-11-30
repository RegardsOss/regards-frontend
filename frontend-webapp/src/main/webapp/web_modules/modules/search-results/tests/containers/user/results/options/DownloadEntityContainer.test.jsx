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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadEntityFileComponent from '../../../../../src/components/user/results/options/DownloadEntityFileComponent'
import { DownloadEntityFileContainer } from '../../../../../src/containers/user/results/options/DownloadEntityFileContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const docFile = {
  content: {
    entityType: 'DOCUMENT',
    files: {},
    ipId: 'URN:AIP:DOCUMENT:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
    label: 'EmptyDoc',
    model: {
      id: 1,
      name: 'MODEL_1',
      description: 'model',
      type: 'DOCUMENT',
    },
    lastUpdate: '2017-11-29T10:14:35.642Z',
    creationDate: '2017-11-28T14:49:44.622Z',
    id: 154,
    tags: [],
    groups: ['PublicDocumentGroup'],
    properties: {},
    services: [],
  },
}
/**
* Test DownloadEntityContainer
* @author Léo Mieulet
*/
describe('[Search Results] Testing DownloadEntityContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadEntityFileContainer)
  })
  it('should render correctly', () => {
    const props = {
      accessToken: 'token user',
      isAuthenticated: true,
      scope: 'project1',
      entity: docFile,
    }
    const enzymeWrapper = shallow(<DownloadEntityFileContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DownloadEntityFileComponent), 1)
  })
})
