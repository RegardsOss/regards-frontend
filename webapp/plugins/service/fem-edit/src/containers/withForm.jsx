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
import {
  reduxForm,
} from '@regardsoss/form-utils'

/**
 * This component wires the form required by this plugin,
 * Indeed, plugin forms needs the pluginInstanceId to be ready to use,
 * On UI Plugin we're connected to form asynchronously
 * whereas we do it synchroniously in REGARDS
 * @param React component
 * @returns React class that injects form
 * @author Léo Mieulet
 */
export default (Component) => class WithForm extends React.Component {
  static propTypes = {
    pluginInstanceId: PropTypes.string.isRequired,
  }

  /**
   * Constructor
   * Build the reduxForm a single time for the plugin lifetime
   * @param {*} props props
   */
  constructor(props) {
    super(props)
    this.reduxForm = reduxForm({
      form: `fem-edit-form-${props.pluginInstanceId}`,
    })(Component)
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { pluginInstanceId, ...otherProps } = this.props
    return React.createElement(
      this.reduxForm,
      otherProps,
    )
  }
}
