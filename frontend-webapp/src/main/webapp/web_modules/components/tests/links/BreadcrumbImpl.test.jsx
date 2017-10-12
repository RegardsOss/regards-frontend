/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BreadcrumbImpl from '../../src/links/BreadcrumbImpl'
import BreadcrumbElement from '../../src/links/BreadcrumbElement'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[Components] Testing BreadcrumbImpl', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BreadcrumbImpl)
  })
  it('should render properly', () => {
    const props = {
      elements: [{
        label: 'l1',
        onAction: () => { },
      }, {
        label: 'l2',
        onAction: () => { },
      }],
      RootIconConstructor: () => <div />,
    }
    const enzymeWrapper = shallow(<BreadcrumbImpl {...props} />, { context })
    const elementsWrapper = enzymeWrapper.find(BreadcrumbElement)
    assert.lengthOf(elementsWrapper, 2, 'There shold be one rendered element for each breadcrumb entry')
  })
})