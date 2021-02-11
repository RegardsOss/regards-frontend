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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IconButton from 'material-ui/RaisedButton'
import DownloadIcon from 'mdi-material-ui/CloudDownload'
import DownloadButton from '../../src/buttons/DownloadButton'

const context = buildTestContext()

/**
* DownloadButton test.
* @author Raphaël Mechali
*/
describe('[Components] Testing DownloadButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadButton)
  })
  it('should render correctly enabled (by default)', () => {
    const props = {
      ButtonConstructor: IconButton,
      ButtonIcon: DownloadIcon, // not mandatory, can use a simple label
      tooltip: 'say something',
      downloadURL: './local',
      primary: true,
    }
    const enzymeWrapper = shallow(<DownloadButton {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'The icon button should be rendered')
    assert.isNotOk(iconButtonWrapper.props().disabled, 'Button should not be disabled')
    const link = enzymeWrapper.find('a')
    assert.lengthOf(link, 1, 'There should be an HTML link')
    assert.equal(link.props().href, props.downloadURL, 'it should have right URL')
  })
  it('should render correctly disabled ', () => {
    const props = {
      ButtonConstructor: IconButton,
      ButtonIcon: DownloadIcon, // not mandatory, can use a simple label
      tooltip: 'say something',
      downloadURL: './local',
      disabled: true,
      primary: true,
    }
    const enzymeWrapper = shallow(<DownloadButton {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'The icon button should be rendered')
    assert.isTrue(iconButtonWrapper.props().disabled, 'Button should be disabled')
    const link = enzymeWrapper.find('a')
    assert.lengthOf(link, 0, 'There should be no HTML link')
  })
})
