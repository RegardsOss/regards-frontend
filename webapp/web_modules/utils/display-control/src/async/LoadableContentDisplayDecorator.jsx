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
import isFunction from 'lodash/isFunction'
import ShowableAtRender from '../ShowableAtRender'
import LoadingComponent from './loading/LoadingComponent'
import DefaultErrorComponent from './error/DefaultErrorComponent'
import DefaultEmptyComponent from './empty/DefaultEmptyComponent'

/**
 * Component handling the proper display of a subcomponent with async loading content.
 * If the subcomponent is waiting for content to load, display a waiting loading component.
 * If the content fetched with error, display a generic error.
 * Else, display the subcomponent.
 *
 * @author Xavier-Alexandre Brochard
 */
class LoadableContentDisplayDecorator extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isLoading: PropTypes.bool,
    loadingComponent: PropTypes.element,
    isContentError: PropTypes.bool,
    contentErrorComponent: PropTypes.element,
    isEmpty: PropTypes.bool,
    emptyComponent: PropTypes.element,
  }

  static defaultProps = {
    isLoading: false,
    loadingComponent: <LoadingComponent />,
    isContentError: false,
    contentErrorComponent: <DefaultErrorComponent />,
    isEmpty: false,
    emptyComponent: <DefaultEmptyComponent />,
  }

  /**
   * Don't try to render the child if it's loading
   * Then execute the children function if it is, or just render it
   * @returns {XML}
   */
  renderChild = () => {
    if (this.props.isLoading) {
      return (<div />)
    }
    if (isFunction(this.props.children)) {
      return this.props.children()
    }
    return this.props.children
  }

  render() {
    const {
      isLoading, loadingComponent, isContentError, contentErrorComponent, isEmpty, emptyComponent,
    } = this.props
    return (
      <>
        <ShowableAtRender show={isLoading}>
          {loadingComponent}
        </ShowableAtRender>
        <ShowableAtRender show={isContentError && !isLoading}>
          {contentErrorComponent}
        </ShowableAtRender>
        <ShowableAtRender show={isEmpty && !isContentError && !isLoading}>
          {emptyComponent}
        </ShowableAtRender>
        <ShowableAtRender show={!isEmpty && !isContentError && !isLoading}>
          {this.renderChild()}
        </ShowableAtRender>
      </>
    )
  }
}
export default LoadableContentDisplayDecorator
