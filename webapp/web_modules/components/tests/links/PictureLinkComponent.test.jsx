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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import Refresh from 'mdi-material-ui/Refresh'
import PictureLinkComponent from '../../src/links/PictureLinkComponent'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[COMPONENTS] Testing PictureLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PictureLinkComponent)
  })
  it('should render properly', () => {
    const props = {
      text: 'Refresh',
      IconComponent: Refresh,
      onAction: () => { },
    }

    const enzymeWrapper = shallow(<PictureLinkComponent {...props} />, { context })
    expect(enzymeWrapper.find(Refresh)).to.have.length(1)
  })
})
