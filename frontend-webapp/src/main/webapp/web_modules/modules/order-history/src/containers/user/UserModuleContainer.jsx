/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
* User module container
* @author Raphaël Mechali
*/
export default class UserModuleContainer extends React.Component {

  static propTypes = {
    // TODO client to pull history for user or all users
    showUserName: PropTypes.bool.isRequired,
    // from mapStateToProps
    // from mapDispatchToProps
  }

  static defaultProps = {
    showUserName: false, // when used in User interface, this module must not show the user name
    // TODO default actions to pull history for user (defaults to user history)
  }

  render() {
    return (
      <div />
    )
  }
}
