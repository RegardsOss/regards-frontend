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
import { connect } from '@regardsoss/redux'
import { descriptionStateActions, descriptionStateSelectors } from '../../../clients/DescriptionStateClient'
import ToggleTreeVisibleOptionComponent from '../../../components/user/header/ToggleTreeVisibleOptionComponent'

/**
 * Toggle tree visible option container
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class ToggleTreeVisibleOptionContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      browsingTreeVisible: descriptionStateSelectors.isBrowsingTreeVisible(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      setBrowsingTreeVisible: (visible) => dispatch(descriptionStateActions.setBrowsingTreeVisible(visible)),
    }
  }

  static propTypes = {
    toggleTreeButton: PropTypes.func.isRequired,
    // from mapStateToProps
    browsingTreeVisible: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    setBrowsingTreeVisible: PropTypes.func.isRequired,
  }

  /**
   * User callback: toggles browsing tree visible option
   */
  onToggleVisible = () => {
    const { browsingTreeVisible, setBrowsingTreeVisible, toggleTreeButton } = this.props
    setBrowsingTreeVisible(!browsingTreeVisible)
    toggleTreeButton()
  }

  render() {
    const { browsingTreeVisible } = this.props
    return (
      <ToggleTreeVisibleOptionComponent
        browsingTreeVisible={browsingTreeVisible}
        onToggleVisible={this.onToggleVisible}
      />
    )
  }
}
export default connect(
  ToggleTreeVisibleOptionContainer.mapStateToProps,
  ToggleTreeVisibleOptionContainer.mapDispatchToProps)(ToggleTreeVisibleOptionContainer)
