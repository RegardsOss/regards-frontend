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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { AnchorComponent } from '../../src/links/AnchorComponent'
import styles from '../../src/links/styles'

const context = buildTestContext(styles)

describe('[Components] Testing AnchorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AnchorComponent)
  })

  it('should render properly', () => {
    const props = {
      children: (<span />),
    }
    const enzymeWrapper = shallow(<AnchorComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(FloatingActionButton), 0, 'The anchor shall not be visible')
    assert.lengthOf(enzymeWrapper.find('span'), 1, 'The component display its children')
    enzymeWrapper.setState({
      isVisible: true,
    })
    assert.lengthOf(enzymeWrapper.find(FloatingActionButton), 1, 'The anchor shall be visible')
  })
})
