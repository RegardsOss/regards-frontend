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
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import PositionMenuItemComponent from '../../../../../../src/components/admin/content/search/options/PositionMenuItemComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test PositionMenuItemComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing PositionMenuItemComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PositionMenuItemComponent)
  })

  const testCases = [{
    label: 'the first group',
    props: {
      label: null,
      index: -1,
      group: true,
    },
    expectedLabel: 'search.results.form.configuration.search.pane.options.common.position.first.label',
  }, {
    label: 'any following group',
    props: {
      label: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: 'anything' }), {}),
      index: 8,
      group: true,
    },
    expectedLabel: 'search.results.form.configuration.search.pane.options.common.position.after.label',
  }, {
    label: 'the first criterion',
    props: {
      label: null,
      index: -1,
      group: false,
    },
    expectedLabel: 'search.results.form.configuration.search.pane.options.common.position.first.label',
  }, {
    label: 'any following criterion',
    props: {
      label: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: 'anything' }), {}),
      index: 6,
      group: false,
    },
    expectedLabel: 'search.results.form.configuration.search.pane.options.common.position.after.label',
  }]

  testCases.forEach(({ label, props, expectedLabel }) => it(`should render correctly ${label}`, () => {
    const localProps = { ...props, onClick: () => {} }
    const enzymeWrapper = shallow(<PositionMenuItemComponent {...localProps} />, { context })
    const menuItem = enzymeWrapper.find(MenuItem)
    assert.lengthOf(menuItem, 1)
    testSuiteHelpers.assertWrapperProperties(menuItem, {
      primaryText: expectedLabel,
      onClick: enzymeWrapper.instance().onClick,
    })
  }))

  it('should invoke correctly callback', () => {
    let spyOnClick = null
    const props = {
      label: null,
      index: -1,
      group: false,
      onClick: (event) => {
        spyOnClick = { event }
      },
      // callback parameters : any property that is not part of the main API
      a: 'b',
      x: 8,
      y: 500,
      groupIndex: 3,
      criterionIndex: 555,
    }
    const enzymeWrapper = shallow(<PositionMenuItemComponent {...props} />, { context })
    enzymeWrapper.instance().onClick()
    assert.deepEqual(spyOnClick, {
      event: {
        a: 'b',
        x: 8,
        y: 500,
        groupIndex: 3,
        criterionIndex: 555,
      },
    })
  })
})
