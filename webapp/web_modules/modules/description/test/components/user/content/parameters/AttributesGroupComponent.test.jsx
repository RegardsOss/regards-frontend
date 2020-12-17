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
import AttributesGroupComponent from '../../../../../src/components/user/content/parameters/AttributesGroupComponent'
import styles from '../../../../../src/styles'
import { resolvedDataEntity } from '../../../../dumps/resolved.dump'

const context = buildTestContext(styles)
context.intl = {
  ...context.intl,
  locale: 'fr', // test with french locale
}

/**
 * Test AttributesGroupComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing AttributesGroupComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesGroupComponent)
  })
  resolvedDataEntity.displayModel.attributesGroups.forEach(
    (group) => it(`should render correctly resolved data dump ${group.key} ${group.showTitle ? 'with title' : 'without title'}`, () => {
      const props = { group }
      const enzymeWrapper = shallow(<AttributesGroupComponent {...props} />, { context })
      const debugContent = enzymeWrapper.debug()
      if (group.showTitle) {
        assert.include(debugContent, group.title.fr, 'Title should be shown')
      }
      // for each element, check label and value are displayed
      // TODO-V1.3: waiting for next enzyme version, that will support search in fragments (not yet available in release)
      // group.elements.forEach(({ label: groupLabel, displayedAttributes }, elementIndex) => {
      //   const elementDiv = enzymeWrapper.children().find(n => console.info('x:', n.props().title) || n.props().title === groupLabel.fr)
      //   // Nota: we must here test on tooltip and not label, as label may be to long for enzyme to log it
      //   assert.lengthOf(elementDiv, 1, 'There should be a division showing element label as tooltip')
      //   const parentWrapper = elementDiv.parent()
      //   displayedAttributes.forEach(({ render: {Constructor, props} }, attributeValueIndex) => {
      //     const renderer = parentWrapper.find(Renderer).findWhere(n => n.props().value === props.value)
      //     assert.lengthOf(renderer,  1, `Attribute value #${elementIndex}:${attributeValueIndex}: There should be attribute render`)
      //       assert.equal(renderer.props().unit, unit,  `Attribute value #${elementIndex}:${attributeValueIndex}: unit should be displayed`)
      //   })
      // })
    }))
})
