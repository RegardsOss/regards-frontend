/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ShowableAtRender, LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import InfiniteGalleryComponent from '../../src/gallery/InfiniteGalleryComponent'

const context = buildTestContext()

class FakeItem extends React.PureComponent {
  static getColumnSpanFromProps = (props, getState) => 1

  static getHeightFromProps = (getState, props, columnSpan, columnGutter, gridWidth, itemProps) => 2

  static propTypes = {
    entity: PropTypes.string.isRequired,
  }

  render() {
    return (<div id={this.props.entity.name} />)
  }
}
/**
* Test InfiniteGalleryComponent
* @author Léo Mieulet
* @author Théo Lasserre
*/
describe('[COMPONENTS] Testing InfiniteGalleryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(InfiniteGalleryComponent)
  })

  it('should render correctly empty', () => {
    const props = {
      alignCenter: true,
      columnGutter: 15,
      columnWidth: 400,
      hasMore: true,
      isEmpty: true,
      isLoading: false,
      items: [],
      itemComponent: FakeItem,
      itemProps: {
        someIdea: 42,
      },
      onInfiniteLoad: () => {
      },
      emptyComponent: <div id="empty.component" />,
      loadingComponent: <div id="loading.component" />,
      componentSize: {
        width: 400,
        height: 400,
      },
      itemOfInterest: '',
    }
    const enzymeWrapper = shallow(<InfiniteGalleryComponent {...props} />, { context })
    const loadableDecorator = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecorator, 1, 'There should be loadable decorator')
    assert.equal(loadableDecorator.props().isEmpty, true, 'Content should be hidden as it is empty')
    assert.deepEqual(loadableDecorator.props().emptyComponent, props.emptyComponent, 'Empty component should be correctly reported from props')
  })
  it('should render correctly loading', () => {
    const props = {
      alignCenter: true,
      columnGutter: 15,
      columnWidth: 400,
      hasMore: true,
      isEmpty: true,
      isLoading: true,
      items: [],
      itemComponent: FakeItem,
      itemProps: {
        someIdea: 42,
      },
      onInfiniteLoad: () => {
      },
      emptyComponent: <div id="empty.component" />,
      loadingComponent: <div id="loading.component" />,
      componentSize: {
        width: 400,
        height: 400,
      },
      itemOfInterest: '',
    }
    const enzymeWrapper = shallow(<InfiniteGalleryComponent {...props} />, { context })
    const loadableDecorator = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecorator, 1, 'There should be loadable decorator')
    assert.equal(loadableDecorator.props().isEmpty, false, 'Content should be visible, to show loading component')
    const loadingShowable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(loadingShowable, 1, 'There should loading showable component')
    assert.equal(loadingShowable.props().show, true, 'Loading component should be shown')
    assert.lengthOf(loadingShowable.findWhere((n) => n.props().id === 'loading.component'), 1,
      'The loading component should be correctly reported from props')
  })
  it('should render correctly in nominal case', () => {
    const props = {
      alignCenter: true,
      columnGutter: 15,
      columnWidth: 400,
      hasMore: true,
      isEmpty: false,
      isLoading: false,
      items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }],
      itemComponent: FakeItem,
      itemProps: {
        someIdea: 42,
      },
      onInfiniteLoad: () => {
      },
      emptyComponent: <div id="empty.component" />,
      loadingComponent: <div id="loading.component" />,
      componentSize: {
        width: 400,
        height: 400,
      },
      itemOfInterest: 'idTest',
    }
    const enzymeWrapper = shallow(<InfiniteGalleryComponent {...props} />, { context })
    const loadableDecorator = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecorator, 1, 'There should be loadable decorator')
    assert.equal(loadableDecorator.props().isEmpty, false, 'Content should be visible, to show loading component')
    const loadingShowable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(loadingShowable, 1, 'There should loading showable component')
    assert.equal(loadingShowable.props().show, false, 'Loading component should be hidden')
    // note: further tests would required to dive in renderPage (which is a bit hard to achieve)
  })
})
