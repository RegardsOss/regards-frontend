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
import { assert } from 'chai'
import root from 'window-or-global'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PositionedDailogComponent from '../../src/dialogs/PositionedDialog'

const context = buildTestContext()

describe('[Components] Testing PositionedDialog', () => {
  before(() => {
    root.addEventListener = () => { }
    root.removeEventListener = () => { }
    root.document = {
      body: { clientWidth: '1200', clientHeight: '600' },
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete root.document
    delete root.addEventListener
    delete root.removeEventListener
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(PositionedDailogComponent)
  })
  it('should render properly', () => {
    const props = {
      dialogWidthPercent: 50,
      dialogHeightPercent: 50,
      // dialog properties
      open: false,
    }
    const ATestComp = () => <div />

    const enzymeWrapper = shallow(
      <PositionedDailogComponent {...props}>
        <ATestComp />
      </PositionedDailogComponent>,
      { context },
    )
    assert.lengthOf(enzymeWrapper.find(ATestComp), 1, 'The positioned dialog should render children')
  })
})
