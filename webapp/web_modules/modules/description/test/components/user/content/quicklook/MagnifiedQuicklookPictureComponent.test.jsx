/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MagnifiedQuicklookPictureComponent from '../../../../../src/components/user/content/quicklook/MagnifiedQuicklookPictureComponent'
import styles from '../../../../../src/styles'
import { buildQuicklookGroupFor } from '../../../../dumps/quicklook.dumps'

const context = buildTestContext(styles)

/**
 * Test MagnifiedQuicklookPictureComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing MagnifiedQuicklookPictureComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MagnifiedQuicklookPictureComponent)
  })
  it('should render correctly', () => {
    const props = {
      quicklookFile: buildQuicklookGroupFor('any', true),
      onToggleMagnified: () => {},
    }
    const enzymeWrapper = shallow(<MagnifiedQuicklookPictureComponent {...props} />, { context })
    const rootWrapper = enzymeWrapper.find('div')
    assert.lengthOf(rootWrapper, 1, 'There should be root wrapper')
    assert.equal(rootWrapper.props().onClick, props.onToggleMagnified, 'Root wrapper should provide toggle magnified callback')
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be picture wrapper')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: props.quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, 'Picture wrapper should show the right picture and an alternative internationalized message')
  })
})
