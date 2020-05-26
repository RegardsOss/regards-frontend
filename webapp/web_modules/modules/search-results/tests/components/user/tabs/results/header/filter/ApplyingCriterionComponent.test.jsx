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
import Chip from 'material-ui/Chip'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../../../../src/definitions/CriterionBuilder'
import ApplyingCriterionComponent from '../../../../../../../src/components/user/tabs/results/header/filter/ApplyingCriterionComponent'
import styles from '../../../../../../../src/styles'
import { datasetEntity } from '../../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test ApplyingCriterionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ApplyingCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplyingCriterionComponent)
  })

  /** Prepare rendering for each possible case */
  const testCases = [{
    caseLabel: 'entities selection',
    props: {
      label: 'search.filter.entities.selection.label',
      selectedCriterion: {
        entitiesCount: 25,
        requestParameters: {},
      },
    },
  }, {
    caseLabel: 'geometry selection',
    props: {
      label: 'search.filter.geometry.label',
      selectedCriterion: {
        point1: [1, 2],
        point2: [3, 4],
        requestParameters: { geo: 'blabla' },
      },
    },
  }, {
    caseLabel: 'Search criteria',
    props: {
      label: 'search.filter.search.criteria.label',
      selectedCriterion: null,
    },
  }, {
    caseLabel: 'Search criteria',
    props: {
      label: CriterionBuilder.buildEntityTagCriterion(datasetEntity).label,
      selectedCriterion: CriterionBuilder.buildEntityTagCriterion(datasetEntity),
    },
  }]

  testCases.forEach(({ caseLabel, props: testProps }) => it(`should render correctly for ${caseLabel}`, () => {
    let spiedDeletedCrit = null
    const props = {
      ...testProps,
      onUnselectCriterion: (crit) => {
        spiedDeletedCrit = crit
      },
      filterIcon: <div />,
    }
    const enzymeWrapper = shallow(<ApplyingCriterionComponent {...props} />, { context })
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1)
    assert.include(enzymeWrapper.debug(), props.label, 'Label should be display')
    assert.equal(chipWrapper.props().onRequestDelete, enzymeWrapper.instance().onUnselectCriterion, 'Callback should be correctly reported')
    // test delete callback
    enzymeWrapper.instance().onUnselectCriterion()
    assert.deepEqual(spiedDeletedCrit, props.selectedCriterion, 'Criterion shoud be correctly provided when deleting')
  }))
})
