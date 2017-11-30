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
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import CollectionEditLinksComponent from '../../src/components/CollectionEditLinksComponent'
import CollectionStepperComponent from '../../src/components/CollectionStepperComponent'


describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionEditLinksComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionEditLinksComponent)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      backUrl: '#',
      doneUrl: '#',
      handleDelete: () => {},
      handleAdd: () => {},
      handleSearch: () => {},
      linkedCollections: [
        {
          content: {
            type: 'COLLECTION',
            lastUpdate: '2017-01-30T11:16:23.919',
            creationDate: '2017-01-30T11:16:23.919',
            id: 1,
            ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
            sipId: 'SipId1',
            label: 'label',
            tags: [
              'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
            ],
            model: {
              id: 1,
              name: 'modelName1',
              description: 'model desc',
              type: 'COLLECTION',
            },
          },
        },
      ],
      remainingCollections: [
        {
          content: {
            type: 'COLLECTION',
            lastUpdate: '2017-01-30T11:16:23.919',
            creationDate: '2017-01-30T11:16:23.919',
            id: 1,
            ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
            sipId: 'SipId1',
            label: 'label',
            tags: [
              'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
            ],
            model: {
              id: 1,
              name: 'modelName1',
              description: 'model desc',
              type: 'COLLECTION',
            },
          },
        }, {
          content: {
            type: 'COLLECTION',
            lastUpdate: '2017-01-30T11:16:23.919',
            creationDate: '2017-01-30T11:16:23.919',
            id: 1,
            ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
            sipId: 'SipId1',
            label: 'label',
            tags: [
              'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
            ],
            model: {
              id: 1,
              name: 'modelName1',
              description: 'model desc',
              type: 'COLLECTION',
            },
          },
        },
      ],
    }
    const enzymeWrapper = shallow(<CollectionEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(4)
    expect(enzymeWrapper.find(CollectionStepperComponent)).to.have.length(1)
  })
})
