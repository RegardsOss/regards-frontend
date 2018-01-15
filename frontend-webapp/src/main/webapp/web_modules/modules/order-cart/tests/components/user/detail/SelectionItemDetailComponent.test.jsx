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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PositionedDialog } from '@regardsoss/components'
import SelectionItemDetailComponent from '../../../../src/components/user/detail/SelectionItemDetailComponent'
import SelectionDetailResultsTableContainer from '../../../../src/containers/user/detail/SelectionDetailResultsTableContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SelectionItemDetailComponent
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing SelectionItemDetailComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectionItemDetailComponent)
  })
  it('should render correctly when hidden', () => {
    const props = {
      showDatasets: true,
      visible: false,
      onClose: () => { },
    }

    const renderWrapper = shallow(<SelectionItemDetailComponent {...props} />, { context })

    const dialogWrapper = renderWrapper.find(PositionedDialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be one and only one dialog')
    assert.isFalse(dialogWrapper.props().open, 'The dialog should be in hidden state')
  })
  it('should render correctly when visible and provide height to sub components', () => {
    const props = {
      showDatasets: true,
      datasetLabel: 'un-petit-vieux-dataset',
      date: '2017-09-08T16:00:02.625Z',
      openSearchRequest: 'mamie=tropCool',
      visible: true,
      onClose: () => { },
    }

    const renderWrapper = shallow(<SelectionItemDetailComponent {...props} />, { context })

    const dialogWrapper = renderWrapper.find(PositionedDialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be one and only one dialog')
    assert.isTrue(dialogWrapper.props().open, 'The dialog should be in visible state')

    const tableWrapper = renderWrapper.find(SelectionDetailResultsTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be one and only one table to show detail')
    assert.equal(tableWrapper.props().openSearchRequest, props.openSearchRequest, 'The table request should be provided')
    assert.isDefined(tableWrapper.props().availableHeight, 'The table available height should be provided')
  })

  it('should render correctly when hiding datasets', () => {
    const props = {
      showDatasets: false,
      datasetLabel: 'un-petit-vieux-dataset',
      date: '2017-09-08T16:00:02.625Z',
      openSearchRequest: 'mamie=tropCool',
      visible: true,
      onClose: () => { },
    }

    shallow(<SelectionItemDetailComponent {...props} />, { context })
  })
})
