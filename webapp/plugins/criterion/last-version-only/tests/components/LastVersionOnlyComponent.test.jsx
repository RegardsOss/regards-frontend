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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import Checkbox from 'material-ui/Checkbox'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import LastVersionOnlyComponent from '../../src/components/LastVersionOnlyComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test LastVersionOnlyComponent
 * @author Raphaël Mechali
 */
describe('[Last version only criterion] Testing LastVersionOnlyComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LastVersionOnlyComponent)
  })
  it('should render correctly checked (french locale)', () => {
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'my label',
        [UIDomain.LOCALES_ENUM.fr]: 'mon libellé',
      },
      checked: true,
      onToggled: () => {},
    }
    const enzymeWrapper = shallow(<LastVersionOnlyComponent {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.fr,
        },
      },
    })
    const checkbox = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkbox, 1, 'There should be the checkbox')
    testSuiteHelpers.assertWrapperProperties(checkbox, {
      label: props.label[UIDomain.LOCALES_ENUM.fr],
      checked: true,
      onCheck: props.onToggled,
      title: 'criterion.last.data.only.tooltip',
    }, 'Checkbox properties should be correctly computed / reported')
  })
  it('should render correctly unchecked (english locale)', () => {
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'my label',
        [UIDomain.LOCALES_ENUM.fr]: 'mon libellé',
      },
      checked: false,
      onToggled: () => {},
    }
    const enzymeWrapper = shallow(<LastVersionOnlyComponent {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.en,
        },
      },
    })
    const checkbox = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkbox, 1, 'There should be the checkbox')
    testSuiteHelpers.assertWrapperProperties(checkbox, {
      label: props.label[UIDomain.LOCALES_ENUM.en],
      checked: false,
      onCheck: props.onToggled,
      title: 'criterion.last.data.only.tooltip',
    }, 'Checkbox properties should be correctly computed / reported')
  })
})
