/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import TestIcon from 'mdi-material-ui/Human'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PageElementOption from '../../../../../../src/components/user/content/list/common/PageElementOption'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test PageElementOption
 * @author Raphaël Mechali
 */
describe('[Description] Testing PageElementOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PageElementOption)
  })
  it('should render correctly', () => {
    const props = {
      IconConstructor: TestIcon,
      title: 'my tooltip',
      onClick: () => {},
    }
    const enzymeWrapper = shallow(<PageElementOption {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      title: props.title,
      onClick: props.onClick,
    }, 'Button properties should be correctly reported')
    assert.lengthOf(buttonWrapper.find(props.IconConstructor), 1, 'Icon should be displayed')
  })
})
