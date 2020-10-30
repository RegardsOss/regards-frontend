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
import FilesSectionPageComponent from '../../../../../../src/components/user/content/list/file/FilesSectionPageComponent'
import styles from '../../../../../../src/styles'
import { BROWSING_SECTIONS_ENUM } from '../../../../../../src/domain/BrowsingSections'
import { resolvedDataEntity } from '../../../../../dumps/resolved.dump'
import ListSectionPageComponent from '../../../../../../src/components/user/content/list/common/ListSectionPageComponent'

const context = buildTestContext(styles)

/**
 * Test FilesSectionPageComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FilesSectionPageComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FilesSectionPageComponent)
  })
  it('should render correctly', () => {
    const props = {
      section: BROWSING_SECTIONS_ENUM.FILES,
      files: resolvedDataEntity.displayModel.otherFiles,
      onSelectInnerLink: () => {},
    }
    const enzymeWrapper = shallow(<FilesSectionPageComponent {...props} />, { context })
    const subcomponentWrapper = enzymeWrapper.find(ListSectionPageComponent)
    assert.lengthOf(subcomponentWrapper, 1, 'There should be list render')
    testSuiteHelpers.assertWrapperProperties(subcomponentWrapper, {
      elements: props.files,
      buildElementNode: enzymeWrapper.instance().renderFile,
    }, 'List render properties should be correctly set')
    // Cannot test inner render into file link component (redux connection)
  })
})
