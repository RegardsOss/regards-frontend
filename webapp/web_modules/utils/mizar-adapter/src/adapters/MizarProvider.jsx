/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
export const HeadlessPlaceholder = (props) => (
  <div>
    <h1>Headless mizar adapter placeholder</h1>
    <h2>Properties: </h2>
    <p>{JSON.stringify(props)}</p>
  </div>
)

/**
 * Mizar Adapter
 * Here we make an async import to the MizarAdapter code to let Webpack split these two files in two several files (=chunk)
 */
export default class MizarProvider extends React.Component {
  state = {
    MizarAdapter: null,
  }

  UNSAFE_componentWillMount() {
    if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'coverage') {
      // load required elements
      require.ensure([], (require) => {
        // load adapter
        const MizarAdapter = require('./MizarAdapter').default
        // store libs in state
        this.setState({ MizarAdapter })
      })
    }
  }

  render() {
    const { MizarAdapter } = this.state
    if (!MizarAdapter) {
      return null // loading
    }
    return (
      <MizarAdapter {...this.props} />
    )
  }
}
