/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import SectionCellComponent from '../../../../../../src/components/user/tree/cells/links/SectionCellComponent'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SectionCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing SectionCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SectionCellComponent)
  })
  it('should render correctly selected', () => {
    const spyOnSelectInnerLink = {}
    const props = {
      type: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
      selected: true,
      onSelectInnerLink: (section) => {
        spyOnSelectInnerLink.section = section
      },
      tabTitles: {},
    }
    const enzymeWrapper = shallow(<SectionCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: `module.description.tree.section.${props.type}.label`,
      tooltip: `module.description.tree.section.${props.type}.tooltip`,
      selected: true,
      disabled: false,
      onClick: enzymeWrapper.instance().onClick,
      section: true,
    }, 'Link properties should be correctly set')
    assert.isNotOk(spyOnSelectInnerLink.section, 'On select callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.equal(spyOnSelectInnerLink.section, props.type, 'On select callback should have been invoked with right parameters')
  })
  it('should render correctly unselected', () => {
    const props = {
      type: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
      selected: false,
      onSelectInnerLink: () => {},
      tabTitles: {},
    }
    const enzymeWrapper = shallow(<SectionCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: `module.description.tree.section.${props.type}.label`,
      tooltip: `module.description.tree.section.${props.type}.tooltip`,
      selected: false,
      disabled: false,
      onClick: enzymeWrapper.instance().onClick,
      section: true,
    }, 'Link properties should be correctly set')
  })
  it('should render correctly with specific PARAMETERS tab titles', () => {
    const spyOnSelectInnerLink = {}
    const props = {
      type: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
      selected: true,
      onSelectInnerLink: (section) => {
        spyOnSelectInnerLink.section = section
      },
      tabTitles: {
        [UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS]: {
          [UIDomain.LOCALES_ENUM.en]: 'TestParametersEn',
          [UIDomain.LOCALES_ENUM.fr]: 'TestParametersFr',
        },
      },
    }
    const enzymeWrapper = shallow(<SectionCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.tabTitles[UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS][UIDomain.LOCALES_ENUM.en],
      tooltip: props.tabTitles[UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS][UIDomain.LOCALES_ENUM.en],
      selected: true,
      disabled: false,
      onClick: enzymeWrapper.instance().onClick,
      section: true,
    }, 'Link properties should be correctly set')
    assert.isNotOk(spyOnSelectInnerLink.section, 'On select callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.equal(spyOnSelectInnerLink.section, props.type, 'On select callback should have been invoked with right parameters')
  })
  it('should render correctly with specific INFORMATION tab titles', () => {
    const spyOnSelectInnerLink = {}
    const props = {
      type: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
      selected: true,
      onSelectInnerLink: (section) => {
        spyOnSelectInnerLink.section = section
      },
      tabTitles: {
        [UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION]: {
          [UIDomain.LOCALES_ENUM.en]: 'TestParametersEn',
          [UIDomain.LOCALES_ENUM.fr]: 'TestParametersFr',
        },
      },
    }
    const enzymeWrapper = shallow(<SectionCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.tabTitles[UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION][UIDomain.LOCALES_ENUM.en],
      tooltip: props.tabTitles[UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION][UIDomain.LOCALES_ENUM.en],
      selected: true,
      disabled: false,
      onClick: enzymeWrapper.instance().onClick,
      section: true,
    }, 'Link properties should be correctly set')
    assert.isNotOk(spyOnSelectInnerLink.section, 'On select callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.equal(spyOnSelectInnerLink.section, props.type, 'On select callback should have been invoked with right parameters')
  })
})
