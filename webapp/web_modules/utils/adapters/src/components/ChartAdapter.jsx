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
export const HeadlessPlaceholder = (props) => (
  <div>
    <h1>Headless chart placeholder</h1>
    <h2>Properties: </h2>
    <p>{JSON.stringify(props)}</p>
  </div>
)

/**
 chart JS adapter: prevents chart JS loading to explode mocha tests due to headless environment
 */
export default class ChartAdapter extends React.Component {
  static propTypes = {
    ChartComponent: PropTypes.string.isRequired,
  }

  state = {
    RenderComponent: null,
  }

  UNSAFE_componentWillMount() {
    const { ChartComponent } = this.props

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
        RenderComponent = require('react-chartjs-2')[ChartComponent]
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
