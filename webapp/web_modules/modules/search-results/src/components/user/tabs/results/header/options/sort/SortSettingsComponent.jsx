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
import FlatButton from 'material-ui/FlatButton'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import SortIcon from 'mdi-material-ui/Sort'
import SortManagerComponent from './SortManagerComponent'

/**
 * Header option to edit sort settings
 * @author Léo Mieulet
 */
class SortSettingsComponent extends React.Component {
  static propTypes = {
    // available sorting attributes
    sortableAttributes: UIShapes.SortableAttributes.isRequired,
    // user and admin sorting infos
    isInInitialSorting: PropTypes.bool.isRequired,
    initialSorting: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    currentSorting: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    // callback: user save sorting option
    onApply: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Initial type */
  state = {
    showDialog: false,
  }

  onToggleDialog = () => {
    const { showDialog } = this.state
    this.setState({ showDialog: !showDialog })
  }

  /**
   * User callback: edition done (locally wrapped)
   * @param newSorting new sorting values
   */
  onDone = (newSorting) => {
    const { onApply } = this.props
    this.onToggleDialog()
    onApply(newSorting)
  }

  /**
   * User callback: reset request (locally wrapped)
   */
  onReset = () => {
    const { onApply, initialSorting } = this.props
    this.onToggleDialog()
    onApply(initialSorting)
  }

  render() {
    const {
      sortableAttributes, isInInitialSorting, currentSorting,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const { showDialog } = this.state
    return (
      <>
        {/* 1. Option that will be displayed */}
        <FlatButton
          label={formatMessage({ id: 'search.results.toggle.sort' })}
          onClick={this.onToggleDialog}
          icon={<SortIcon />}
        />
        {/* 2. Dialog window */}
        <SortManagerComponent
          open={showDialog}
          sortableAttributes={sortableAttributes}
          isInInitialSorting={isInInitialSorting}
          currentSorting={currentSorting}
          onDone={this.onDone}
          onClose={this.onToggleDialog}
          onReset={this.onReset}
        />
      </>
    )
  }
}
export default SortSettingsComponent
