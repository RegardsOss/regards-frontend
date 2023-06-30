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

const MISSING_ERROR = 'Error was swallowed during propagation.'

/**
 * This HOC catches all error from the app and display the error to the end user
 *  @see https://github.com/piotrwitek/react-redux-typescript-guide
 */
export const withErrorBoundary = (BaseComponent) => class Hoc extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string,
      stack: PropTypes.string,
    }),
    errorInfo: PropTypes.shape({
      componentStack: PropTypes.string,
    }),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  // Enhance component name for debugging and React-Dev-Tools
  static displayName = `withErrorBoundary(${BaseComponent.name})`;

  // reference to original wrapped component
  static WrappedComponent = BaseComponent;

  state = {
    error: undefined,
    errorInfo: undefined,
  }

  componentDidCatch(error, info) {
    this.setState({
      error: error || new Error(MISSING_ERROR),
      errorInfo: info,
    })
  }

  render() {
    const { children, ...restProps } = this.props
    const { error, errorInfo } = this.state

    if (error) {
      return <BaseComponent error={error} errorInfo={errorInfo} {...(restProps)} />
    }

    return children
  }
}
