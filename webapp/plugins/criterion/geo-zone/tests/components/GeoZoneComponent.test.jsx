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
import TextField from 'material-ui/TextField'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { IconElementSelector } from '@regardsoss/components'
import { UIDomain } from '@regardsoss/domain'
import GeoZoneComponent from '../../src/components/GeoZoneComponent'
import { SEARCH_MODES_ENUM } from '../../src/domain/SearchMode'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test GeoZoneComponent
 * @author Raphaël Mechali
 */
describe('[Geo zone criterion] Testing GeoZoneComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GeoZoneComponent)
  })
  it('should render correctly checked (french locale)', () => {
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'my label',
        [UIDomain.LOCALES_ENUM.fr]: 'mon libellé',
      },
      onSelectMode: () => { },
      searchMode: SEARCH_MODES_ENUM.CONTAINS,
      onTextInput: () => { },
      lonMin: '43.269292062599305',
      lonMax: '45.049161325625775',
      latMin: '1.9591403285917248',
      latMax: '5.81275237864844',
    }
    const enzymeWrapper = shallow(<GeoZoneComponent {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.fr,
        },
      },
    })
    const iconElementWrapper = enzymeWrapper.find(IconElementSelector)
    assert.lengthOf(iconElementWrapper, 1, 'There should be the IconElementSelector')
    testSuiteHelpers.assertWrapperProperties(iconElementWrapper, {
      value: props.searchMode,
      onChange: props.onSelectMode,
    }, 'IconElementSelector properties should be correctly computed / reported')

    const textFieldWrapper = enzymeWrapper.find(TextField)
    assert.lengthOf(textFieldWrapper, 4, 'There should be 4 TextField')
  })
  it('should render correctly unchecked (english locale)', () => {
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'my label',
        [UIDomain.LOCALES_ENUM.fr]: 'mon libellé',
      },
      onSelectMode: () => { },
      searchMode: SEARCH_MODES_ENUM.CONTAINS,
      onTextInput: () => { },
      lonMin: '43.269292062599305',
      lonMax: '45.049161325625775',
      latMin: '1.9591403285917248',
      latMax: '5.81275237864844',
    }
    const enzymeWrapper = shallow(<GeoZoneComponent {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.en,
        },
      },
    })
    const iconElementWrapper = enzymeWrapper.find(IconElementSelector)
    assert.lengthOf(iconElementWrapper, 1, 'There should be the IconElementSelector')
    testSuiteHelpers.assertWrapperProperties(iconElementWrapper, {
      value: props.searchMode,
      onChange: props.onSelectMode,
    }, 'IconElementSelector properties should be correctly computed / reported')

    const textFieldWrapper = enzymeWrapper.find(TextField)
    assert.lengthOf(textFieldWrapper, 4, 'There should be 4 TextField')
  })
})
