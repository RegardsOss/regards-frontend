/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert, expect } from 'chai'
import values from 'lodash/values'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import InfiniteGalleryComponent from '../../src/gallery/InfiniteGalleryComponent'

const context = buildTestContext()

class FakeItem extends React.PureComponent {
  static getColumnSpanFromProps = (props, getState) => 1
  static getHeightFromProps = (getState, props, columnSpan, columnGutter, gridWidth, itemProps) => 2
  render() {
    return (<div />)
  }
}
/**
* Test InfiniteGalleryComponent
* @author Léo Mieulet
*/
describe('[COMPONENTS] Testing InfiniteGalleryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(InfiniteGalleryComponent)
  })


  it('should render correctly', () => {
    const props = {
      alignCenter: true,
      columnGutter: 15,
      columnWidth: 400,
      hasMore: true,
      isLoading: false,
      items: values(DumpProvider.get('AccessProjectClient', 'DataobjectEntity')),
      itemComponent: FakeItem,
      itemProps: {
        someIdea: 42,
      },
      onInfiniteLoad: () => {
      },
    }
    const enzymeWrapper = shallow(<InfiniteGalleryComponent {...props} />, { context })
    expect(enzymeWrapper.find('div')).to.have.length(2)
    // This component is too low level to get FakeItem rendered
  })
})
