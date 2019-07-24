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
import Subheader from 'material-ui/Subheader'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributesGroupComponent from '../../../../../src/components/user/properties/attributes/AttributesGroupComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

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
  it('should render correctly an attribute group without title', () => {
    const props = {
      group: {
        key: 'g1',
        showTitle: false,
        title: {},
        elements: [{
          key: 'el1',
          label: {
            en: 'ONE',
            fr: 'UN',
          },
          attributes: [{
            key: 'attr1',
            Renderer: () => <div id="Renderer1" />,
            renderValue: 'a Value',
          }, {
            key: 'attr2',
            Renderer: () => <div id="Renderer2" />,
            renderValue: 'a Value',
            renderUnit: 'a test unit',
          }],
        }],
      },
    }
    // set locale fr
    const savedLocale = context.intl.locale
    context.intl.locale = 'fr'

    const enzymeWrapper = shallow(<AttributesGroupComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Subheader), 0, 'Group title should not be shown')
    // check each element and attribute is correctly rendered
    props.group.elements.forEach(({ label, attributes }) => {
      // 1 - check the element label is found
      assert.include(enzymeWrapper.debug(), label.fr)
      // 2 - check each attribute is rendered
      attributes.forEach(({ Renderer, renderValue, renderUnit }) => {
        const renderWrapper = enzymeWrapper.find(Renderer)
        assert.lengthOf(renderWrapper, 1, 'There should be the attribute render')
        testSuiteHelpers.assertWrapperProperties(renderWrapper, {
          value: renderValue,
          unit: renderUnit,
        }, 'Attribute properties should correctly reported to render')
      })
    })
    context.intl.locale = savedLocale
  })
  it('should render correctly an attribute group with title and switch text on locale change', () => {
    const props = {
      group: {
        key: 'g1',
        showTitle: true,
        title: {
          en: 'HELLO',
          fr: 'BONJOUR',
        },
        elements: [{
          key: 'el1',
          label: {
            en: 'EL. ONE',
            fr: 'EL. UN',
          },
          attributes: [{
            key: 'attr1',
            Renderer: () => <div id="Renderer1" />,
            renderValue: 'a Value',
          }],
        }],
      },
    }
    // set locale en
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'

    let enzymeWrapper = shallow(<AttributesGroupComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Subheader), 1, 'Group title should be shown')
    let debugText = enzymeWrapper.debug()
    assert.include(debugText, props.group.title.en, 'The group title should be rendered in english')
    assert.include(debugText, props.group.elements[0].label.en, 'The first group element label should be rendered in english')

    // set locale fr
    context.intl.locale = 'fr'
    enzymeWrapper = shallow(<AttributesGroupComponent {...props} />, { context })
    debugText = enzymeWrapper.debug()
    assert.include(debugText, props.group.title.fr, 'The group title should be rendered in french')
    assert.include(debugText, props.group.elements[0].label.fr, 'The first group element label should be rendered in french')

    // not re-testing attributes here (tested in previous test case)
    // restore locale
    context.intl.locale = savedLocale
  })
})
