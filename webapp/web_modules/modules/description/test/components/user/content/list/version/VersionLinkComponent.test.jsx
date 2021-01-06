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
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import VersionLinkComponent from '../../../../../../src/components/user/content/list/version/VersionLinkComponent'
import styles from '../../../../../../src/styles'
import PageLinkCellComponent from '../../../../../../src/components/user/content/list/common/PageLinkCellComponent'
import { resolvedDataEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test VersionLinkComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing VersionLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(VersionLinkComponent)
  })
  it('should render correctly', () => {
    const spySelectEntity = {}
    const props = {
      entity: resolvedDataEntity.displayModel.otherVersions[0],
      onSelectEntityLink: (e) => {
        spySelectEntity.entity = e
      },
    }
    const enzymeWrapper = shallow(<VersionLinkComponent {...props} />, { context })
    // Check main action
    const linkWrapper = enzymeWrapper.find(PageLinkCellComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link component')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: 'module.description.common.version.link.label',
      tooltip: 'module.description.common.version.link.tooltip',
      LinkIconConstructor: DescriptionIcon,
      disabled: false,
      onClick: enzymeWrapper.instance().onSelectEntityLink,
    }, 'Link properties should be correctly set')
    // test show description callback invokation
    assert.isNotOk(spySelectEntity.entity, 'Show description callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.deepEqual(spySelectEntity.entity, props.entity, 'Show description callback should have been invoked with the right parameters')
  })
})
