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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import Toggle from 'material-ui/Toggle'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import ToggleDatasetDetails from '../../../src/components/user/ToggleDatasetDetails'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ToggleDatasetDetails', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleDatasetDetails)
  })
  it('should show / hide the dataset attributes toggle according with areDatasetAttributesAvailable property', () => {
    const props = {
      datasetAttributesVisible: false,
      areDatasetAttributesAvailable: false,
      onSetDatasetAttributesVisible: () => { },
    }

    // check button is hidden when areDatasetAttributesAvailable is false
    const enzymeWrapper = shallow(<ToggleDatasetDetails {...props} />, { context })
    let showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be a dataset attributes showable render')
    assert.isFalse(showables.at(0).props().show, 'The toggle should be visible when dataset attributes are not available')

    // check is it now visible
    enzymeWrapper.setProps({
      ...props,
      areDatasetAttributesAvailable: true,
    })
    showables = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showables.at(0).props().show, 'The toggle should be visible when dataset attributes are available')
  })
  it('should check / uncheck the dataset attributes toggle according with module state', () => {
    const props = {
      datasetAttributesVisible: false,
      areDatasetAttributesAvailable: true,
      onSetDatasetAttributesVisible: () => { },
    }

    // check button is hidden when areDatasetAttributesAvailable is false
    const enzymeWrapper = shallow(<ToggleDatasetDetails {...props} />, { context })
    let toggles = enzymeWrapper.find(Toggle)
    assert.lengthOf(toggles, 1, 'There should be a dataset attributes toggle')
    assert.isFalse(toggles.at(0).props().toggled, 'The toggle should not be toggled when dataset attributes are not visible')

    // check is it now visible
    enzymeWrapper.setProps({
      ...props,
      datasetAttributesVisible: true,
    })
    toggles = enzymeWrapper.find(Toggle)
    assert.isTrue(toggles.at(0).props().toggled, 'The toggle should be toggled when dataset attributes are visible')
  })
})
