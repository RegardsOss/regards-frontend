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
// fake bind method: publishes an ID in children elements
const bind = (id) => ({ id })
// fake headless adapter for tests
export const HeadlessPlaceholder = ({ children }) => children({ bind })

/**
 chart JS adapter: prevents chart JS loading to explode mocha tests due to headless environment
 */
export default class MeasureAdapter extends React.Component {
  static propTypes = {
    // all properties are reported to measure
  }

  state = {
    RenderComponent: null,
  }

  UNSAFE_componentWillMount() {
    let RenderComponent
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'coverage') {
      // in test, avoid loading the library
      RenderComponent = HeadlessPlaceholder
      // store place holder in state
      this.setState({ RenderComponent })
    } else {
      // load required elements
      require.ensure([], (require) => {
        // load component from library
        RenderComponent = require('react-measure').Measure
        // store place holder in state
        this.setState({ RenderComponent })
      })
    }
  }

  render() {
    const { RenderComponent } = this.state
    if (!RenderComponent) {
      return null // loading
    }
    return (
      <RenderComponent {...this.props} />
    )
  }
}
