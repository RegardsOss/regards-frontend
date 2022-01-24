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
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ItemLink from '../../../src/components/user/ItemLink'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ItemLink', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ItemLink)
  })
  it('should render correctly with icon additive line component', () => {
    const props = {
      locked: true,
      selected: true,
      onSelect: () => { },
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity'),
      Icon: Toggle,
      additiveLineComponent: <FlatButton label="hello again" />,
      displayState: ItemLink.States.DEFAULT,
      onStateChange: () => { },
      onMouseOver: () => { },
      onMouseOut: () => { },
      onLinkClicked: () => { },
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
    }
    const enzymeWrapper = shallow(<ItemLink {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(FlatButton), 1, 'The additive line component (a flat button here) should be rendered')
    assert.lengthOf(enzymeWrapper.find(Toggle), 1, 'The icon (a toggle here) should be rendered')
  })
  it('Should render correctly in all states', () => {
    const props = {
      locked: true,
      selected: true,
      onSelect: () => { },
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity'),
      Icon: Toggle,
      additiveLineComponent: <FlatButton label="hello again" />,
      onStateChange: () => { },
      onMouseOver: () => { },
      onMouseOut: () => { },
      onLinkClicked: () => { },
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
    }
    shallow(<ItemLink displayState={ItemLink.States.DEFAULT} {...props} />, { context })
    shallow(<ItemLink displayState={ItemLink.States.HOVER} {...props} />, { context })
    shallow(<ItemLink displayState={ItemLink.States.SELECTED} {...props} />, { context })
    shallow(<ItemLink displayState={ItemLink.States.SELECTED_HOVER} {...props} />, { context })
    shallow(<ItemLink displayState={ItemLink.States.LOCKED} {...props} />, { context })
  })
})
