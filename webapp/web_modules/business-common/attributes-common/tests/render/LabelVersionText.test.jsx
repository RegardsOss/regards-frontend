/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import styles from '../../src/styles'
import LabelVersionText from '../../src/render/LabelVersionText'
import { data, dataset, collection } from '../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test EntityLabelText
 * @author Raphaël Mechali
 */
describe('[Entities Common] Testing LabelVersionText', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LabelVersionText)
  })

  const testCases = [{
    label: 'data with version when uiSettings#showVersion is enabled',
    entity: data,
    showVersion: true,
    expectedVersion: true,
  }, {
    label: 'data without version when uiSettings#showVersion is disabled',
    entity: data,
    showVersion: false,
    expectedVersion: false,
  }, {
    label: 'dataset without version (uiSettings#showVersion enabled)',
    entity: dataset,
    showVersion: true,
    expectedVersion: false,
  }, {
    label: 'dataset without version (uiSettings#showVersion disabled)',
    entity: dataset,
    showVersion: false,
    expectedVersion: false,
  }, {
    label: 'collection without version (uiSettings#showVersion enabled)',
    entity: collection,
    showVersion: true,
    expectedVersion: false,
  }, {
    label: 'collection without version (uiSettings#showVersion disabled)',
    entity: collection,
    showVersion: false,
    expectedVersion: false,
  }]
  testCases.forEach(({
    label, entity, showVersion, expectedVersion,
  }) => it(`should render ${label}`, () => {
    const props = {
      entity,
      uiSettings: {
        showVersion,
        documentModels: [],
        primaryQuicklookGroup: 'pipou',
      },
    }
    const enzymeWrapper = shallow(<LabelVersionText {...props} />, { context })
    const asText = enzymeWrapper.debug()
    if (expectedVersion) {
      assert.isTrue(asText.includes('attribute.render.version.label'))
    } else {
      assert.isTrue(asText.includes('attribute.render.simple.label'))
    }
  }))
})
