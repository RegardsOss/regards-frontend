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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import { CriterionBuilder } from '../../../../../../src/definitions/CriterionBuilder'
import { TagLabelHelper } from '../../../../../../src/components/user/tabs/results/common/TagLabelHelper'
import styles from '../../../../../../src/styles'
import {
  dataEntity, anotherDataEntity, datasetEntity, anotherDatasetEntity,
} from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test TagLabelHelper
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TagLabelHelper', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagLabelHelper)
  })

  const testCases = [{
    label: 'a simple word tag',
    tagCrit: CriterionBuilder.buildWordTagCriterion('hello'),
    expected: 'hello',
  }, {
    label: 'a coupling word tag',
    tagCrit: CriterionBuilder.buildWordTagCriterion('coupling:drink:c0ff33'),
    expected: 'c0ff33',
  }, {
    label: 'an unresolved tag',
    tagCrit: CriterionBuilder.buildUnresolvedEntityTagCriterion('anyID'),
    expected: 'search.filter.geometry.entity.private',
  }, {
    label: 'a data when showing version',
    tagCrit: CriterionBuilder.buildEntityTagCriterion(dataEntity),
    expected: 'attribute.render.version.label',
    showVersion: true,
  }, {
    label: 'a data when hiding version',
    tagCrit: CriterionBuilder.buildEntityTagCriterion(anotherDataEntity),
    expected: 'attribute.render.simple.label',
    showVersion: false,
  }, {
    label: 'a dataset when showing version',
    tagCrit: CriterionBuilder.buildEntityTagCriterion(datasetEntity),
    expected: 'attribute.render.simple.label',
    showVersion: true,
  }, {
    label: 'a dataset when showing version',
    tagCrit: CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity),
    expected: 'attribute.render.simple.label',
    showVersion: false,
  }]
  testCases.forEach(({
    label, tagCrit, expected, showVersion,
  }) => it(`should render correctly ${label}`, () => {
    assert.equal(TagLabelHelper.getLabel(context.intl.formatMessage, tagCrit, {
      ...UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      showVersion,
    }), expected)
  }))
})
