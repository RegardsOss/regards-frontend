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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../../../../src/definitions/CriterionBuilder'
import TagCriterionComponent from '../../../../../../../src/components/user/tabs/results/header/filter/TagCriterionComponent'
import { TagCriterionContainer } from '../../../../../../../src/containers/user/tabs/results/header/filter/TagCriterionContainer'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TagCriterionContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TagCriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagCriterionContainer)
  })
  it('should render correctly', () => {
    const props = {
      tagCriterion: CriterionBuilder.buildWordTagCriterion('anything'),
      onUnselectTagFilter: () => {},
      settings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
    }
    const enzymeWrapper = shallow(<TagCriterionContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TagCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      tagCriterion: props.tagCriterion,
      settings: props.settings,
      onUnselectTagFilter: props.onUnselectTagFilter,
    }, 'Component should define the expected properties')
  })
})
