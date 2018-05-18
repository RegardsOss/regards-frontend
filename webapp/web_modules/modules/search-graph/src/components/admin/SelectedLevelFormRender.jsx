/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import filter from 'lodash/filter'
import find from 'lodash/find'
import { FormattedMessage } from 'react-intl'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import RemoveLevel from 'material-ui/svg-icons/action/delete'
import PopupMenuIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { DataManagementShapes } from '@regardsoss/shape'

/**
* Render for selected levels field
*/
class SelectedLevelFormRender extends React.Component {
  static propTypes = {
    // values pool as fetched and normalized
    collectionModels: DataManagementShapes.ModelList.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    // from redux form
    // the selected value as fields object (holds selected levels IDs)
    // eslint-disable-next-line react/forbid-prop-types
    fields: PropTypes.object.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    menuVisible: false,
    menuAnchor: null,
  }

  /**
   * Called when user selects a graph level from collection types
   * @param event touch event
   * @param level selected level value
   */
  onLevelSelected = (event, level) => {
    // add the level collection type name to selected field values
    this.props.fields.push(level.name)
    this.onHideMenu()
  }

  /**
   * Called when user removed a graph level from collection types
   * @param index elemnent index
   */
  onLevelRemoved = (index) => {
    const { fields } = this.props
    fields.remove(index)
  }

  onShowMenu = (event) => {
    event.preventDefault()
    this.setState({ menuVisible: true, menuAnchor: event.currentTarget })
  }

  onHideMenu = () => {
    this.setState({ menuVisible: false })
  }

  /**
   * Returns selectable levels, ie not selected, with data, from current state selection
   * @return [{ content: {name, description}}]
   */
  getSelectableLevels = () => {
    const { fields, collectionModels } = this.props
    const allSelectedArray = fields.getAll() || []
    return filter(collectionModels, ({ content: { name } }) => !allSelectedArray.includes(name))
  }

  /**
   * Returns selected levels, with data, from current state selection
   * @return [{ content: {name, description}}]
   */
  getSelectedLevels = () => {
    const { fields, collectionModels } = this.props
    // rebuild selected levels list, avoid appending null to the selected levels list (may happen in module edition)
    const allSelectedArray = fields.getAll() || []
    return allSelectedArray.reduce((acc, name) => {
      // search selected element by name in collections
      const foundElt = find(collectionModels, ({ content: { name: currName } }) => currName === name)
      return foundElt ? [...acc, foundElt] : acc
    }, [])
  }

  /**
   * Renders hint row when there is no selection
   */
  renderHintRow = () => {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context
    const { intl: { formatMessage } } = this.props
    return (
      <TableRow >
        <TableRowColumn
          colSpan="4"
          style={graphLevelsRender.selectedLevelsTable.hintMessage.styles}
        >
          {formatMessage({ id: 'search.graph.levels.selection.no.selection.hint' })}
        </TableRowColumn>
      </TableRow>
    )
  }

  /**
   * Renders a level table row
   * @param level  : collection type for level { content: { name, description}}
   * @return rendered
   */
  renderSelectedLevelRow = ({ content: { name, description } }, index) => {
    const { intl: { formatMessage } } = this.props
    return (
      <TableRow key={name}>
        <TableRowColumn title={index}>
          {index}
        </TableRowColumn>
        <TableRowColumn title={name}>
          {name}
        </TableRowColumn>
        <TableRowColumn title={description}>
          {description}
        </TableRowColumn>
        <TableRowColumn >
          <IconButton onClick={() => this.onLevelRemoved(index)} title={formatMessage({ id: 'search.graph.selected.levels.column.actions.remove.tooltip' })}>
            <RemoveLevel />
          </IconButton>
        </TableRowColumn>
      </TableRow >
    )
  }

  /**
   * Renders the selected levels table
   * @return rendered
   */
  renderSelectedLevels = () => {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context
    // const { fields } = this.props
    const selectedLevels = this.getSelectedLevels()
    return (
      <div style={graphLevelsRender.selectedLevelsTable.styles}>
        <Table
          fixedHeader={false}
          selectable={false}
          multiSelectable={false}
          displayRowCheckbox={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={graphLevelsRender.selectedLevelsTable.columnLevel.styles} >
                <FormattedMessage id="search.graph.selected.levels.column.index" />
              </TableHeaderColumn>
              <TableHeaderColumn style={graphLevelsRender.selectedLevelsTable.columnName.styles}>
                <FormattedMessage id="search.graph.selected.levels.column.name" />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage id="search.graph.selected.levels.column.description" />
              </TableHeaderColumn>
              <TableHeaderColumn style={graphLevelsRender.selectedLevelsTable.columnActions.styles}>
                <FormattedMessage id="search.graph.selected.levels.column.actions" />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              selectedLevels ?
                // render selection
                selectedLevels.map((level, index) => this.renderSelectedLevelRow(level, index)) :
                // render hint row when there is no selection
                this.renderHintRow()
            }
          </TableBody>
        </Table >
      </div>)
  }

  renderLevelSelector = () => {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context
    const { intl: { formatMessage } } = this.props
    const { menuVisible, menuAnchor } = this.state
    const selectableLevels = this.getSelectableLevels()
    const anchorStyle = { horizontal: 'left', vertical: 'bottom' }
    const targetStyle = { horizontal: 'left', vertical: 'top' }
    return (
      <div style={graphLevelsRender.addButton.styles} >
        <RaisedButton
          label={this.context.intl.formatMessage({ id: 'search.graph.add.level' })}
          labelPosition={graphLevelsRender.addButton.labelPosition}
          icon={<PopupMenuIcon />}
          onClick={this.onShowMenu}
          disabled={!selectableLevels.length}
        />
        <Popover
          open={menuVisible}
          anchorEl={menuAnchor}
          anchorOrigin={anchorStyle}
          targetOrigin={targetStyle}
          onRequestClose={this.onHideMenu}
        >
          <Menu onChange={this.onLevelSelected}>
            {
              map(selectableLevels, ({ content }) => (
                <MenuItem
                  key={content.id}
                  value={content}
                  primaryText={formatMessage({ id: 'search.graph.collection.model.label' }, {
                    name: content.name,
                    description: content.description,
                  })}
                />
              ))
            }
          </Menu>
        </Popover>
      </div >)
  }

  renderError = () => {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context
    const { meta: { error }, intl: { formatMessage } } = this.props
    // const errorText = touched && error &&
    return (
      <ShowableAtRender show={!!error}>
        <div style={graphLevelsRender.errorMessage.styles}>
          {error ? formatMessage({ id: error }) : null}
        </div>
      </ShowableAtRender>
    )
  }

  render() {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context

    return (
      <div style={graphLevelsRender.styles} >
        <div style={graphLevelsRender.tableContainer.styles}>
          {
            // render selection table
            this.renderSelectedLevels()
          }
          {
            // render selection button and menu
            this.renderLevelSelector()
          }
        </div>
        {
          // render field error
          this.renderError()
        }
      </div >
    )
  }
}

export default SelectedLevelFormRender
