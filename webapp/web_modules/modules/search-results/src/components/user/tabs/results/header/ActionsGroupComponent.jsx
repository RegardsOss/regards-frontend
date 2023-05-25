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
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import ColumnsSettingsIcon from 'mdi-material-ui/ViewColumn'
import MenuItem from 'material-ui/MenuItem'
import SortIcon from 'mdi-material-ui/Sort'
import FlatButton from 'material-ui/FlatButton'
import { DropDownButton } from '@regardsoss/components'
import ColumnsSettingsComponent from './options/columns/ColumnsSettingsComponent'
import SortManagerComponent from './options/sort/SortManagerComponent'

const ELEMENT_TYPE = {
  EDIT_COLUMNS: 'EDIT_COLUMNS',
  SORT_MANAGER: 'SORT_MANAGER',
}

/**
 * @author Théo Lasserre
 */
class ActionsGroupComponent extends React.Component {
  static propTypes = {
    selectedMode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired,
    enableSorting: PropTypes.bool.isRequired,
    // available sorting attributes
    sortableAttributes: UIShapes.SortableAttributes.isRequired,
    // // user and admin sorting infos
    isInInitialSorting: PropTypes.bool.isRequired,
    initialSorting: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    currentSorting: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    // // callback: user save sorting option
    onApplySorting: PropTypes.func.isRequired,
    // // presentation models props
    presentationModels: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel])).isRequired,
    onResetPresentationModels: PropTypes.func.isRequired,
    onApplyPresentationModels: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Initial type */
  state = {
    [ELEMENT_TYPE.EDIT_COLUMNS]: {
      open: false,
    },
    [ELEMENT_TYPE.SORT_MANAGER]: {
      open: false,
    },
  }

  toggleDialog = (elementType) => {
    const { open } = this.state[elementType]
    this.setState({
      [elementType]: {
        open: !open,
      },
    })
  }

  onReset = (elementType) => {
    const { onResetPresentationModels, onApplySorting, initialSorting } = this.props
    this.toggleDialog(elementType)
    switch (elementType) {
      case ELEMENT_TYPE.EDIT_COLUMNS:
        onResetPresentationModels()
        break
      case ELEMENT_TYPE.SORT_MANAGER:
        onApplySorting(initialSorting)
        break
      default:
    }
  }

  onDoneColumnEdit = (presentationModels) => {
    const { onApplyPresentationModels } = this.props
    this.toggleDialog(ELEMENT_TYPE.EDIT_COLUMNS)
    onApplyPresentationModels(presentationModels)
  }

  onDoneSorting = (sortingCriteria) => {
    const { onApplySorting } = this.props
    this.toggleDialog(ELEMENT_TYPE.SORT_MANAGER)
    onApplySorting(sortingCriteria)
  }

  renderElement = (elementType) => {
    const {
      sortableAttributes, presentationModels, isInInitialSorting, currentSorting,
    } = this.props
    const { open } = this.state[elementType]
    if (open) {
      switch (elementType) {
        case ELEMENT_TYPE.EDIT_COLUMNS:
          return (
            <ColumnsSettingsComponent
              open={open}
              presentationModels={presentationModels}
              onDone={this.onDoneColumnEdit}
              onResetColumns={() => this.onReset(elementType)}
              onClose={() => this.toggleDialog(elementType)}
            />)
        case ELEMENT_TYPE.SORT_MANAGER:
          return (
            <SortManagerComponent
              open={open}
              sortableAttributes={sortableAttributes}
              isInInitialSorting={isInInitialSorting}
              currentSorting={currentSorting}
              onDone={this.onDoneSorting}
              onReset={() => this.onReset(elementType)}
              onClose={() => this.toggleDialog(elementType)}
            />
          )
        default:
      }
    }
    return null
  }

  isElementDisabled = (elementType) => {
    const { selectedMode, enableSorting } = this.props
    switch (elementType) {
      case ELEMENT_TYPE.EDIT_COLUMNS:
        return selectedMode !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE
      case ELEMENT_TYPE.SORT_MANAGER:
        return !enableSorting
      default:
    }
    return false
  }

  getValue = () => {
    if (this.state[ELEMENT_TYPE.EDIT_COLUMNS].open) {
      return ELEMENT_TYPE.EDIT_COLUMNS
    }
    if (this.state[ELEMENT_TYPE.SORT_MANAGER].open) {
      return ELEMENT_TYPE.SORT_MANAGER
    }
    return null
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <>
        <DropDownButton
          ButtonConstructor={FlatButton}
          label={formatMessage({ id: 'search.results.configure.actions.option' })}
          labelPosition="before"
          disabled={this.isElementDisabled(ELEMENT_TYPE.EDIT_COLUMNS) && this.isElementDisabled(ELEMENT_TYPE.SORT_MANAGER)}
          value={this.getValue()}
        >
          {
          !this.isElementDisabled(ELEMENT_TYPE.EDIT_COLUMNS)
            ? <MenuItem
                key={ELEMENT_TYPE.EDIT_COLUMNS}
                onClick={() => this.toggleDialog(ELEMENT_TYPE.EDIT_COLUMNS)}
                primaryText={formatMessage({ id: 'search.results.configure.columns.option' })}
                leftIcon={<ColumnsSettingsIcon />}
                value={ELEMENT_TYPE.EDIT_COLUMNS}
            />
            : null
        }
          { !this.isElementDisabled(ELEMENT_TYPE.SORT_MANAGER)
            ? <MenuItem
                key={ELEMENT_TYPE.SORT_MANAGER}
                onClick={() => this.toggleDialog(ELEMENT_TYPE.SORT_MANAGER)}
                primaryText={formatMessage({ id: 'search.results.toggle.sort' })}
                leftIcon={<SortIcon />}
                value={ELEMENT_TYPE.SORT_MANAGER}
            />
            : null}

        </DropDownButton>
        {this.renderElement(ELEMENT_TYPE.EDIT_COLUMNS)}
        {this.renderElement(ELEMENT_TYPE.SORT_MANAGER)}
      </>
    )
  }
}
export default ActionsGroupComponent
