/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { SingleContentURLDialogContainer } from '../../src/dialogs/SingleContentURLDialogContainer'
import PositionedDialog from '../../src/dialogs/PositionedDialog'
import URIContentDisplayer from '../../src/content/preview/URIContentDisplayer'
import styles from '../../src/dialogs/styles'

const context = buildTestContext(styles)

describe('[COMPONENTS] Testing SingleContentURLDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SingleContentURLDialogContainer)
  })

  it('should render correctly', () => {
    const props = {
      contentURL: 'http://www.google.com',
      dialogHeightPercent: 50,
      dialogWidthPercent: 50,
      open: true,
    }
    const enzymeWrapper = shallow(<SingleContentURLDialogContainer {...props} />, { context })

    // 1 - should render in a positioned dialog
    assert.lengthOf(enzymeWrapper.find(PositionedDialog), 1, 'There should be positioned dialog')
    // 2 - should use an URIContentDisplayer to show content
    const contentDisplayer = enzymeWrapper.find(URIContentDisplayer)
    assert.lengthOf(contentDisplayer, 1, 'There should be URI content displayer')
    assert.equal(contentDisplayer.props().uri, props.contentURL, 'URI should be correctly reported')
  })
})
