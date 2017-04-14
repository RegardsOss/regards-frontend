/**
* LICENSE_PLACEHOLDER
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
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { Model } from '@regardsoss/model'

/**
* Render for selected levels field
*/
class SelectedLevelFormRender extends React.Component {

  static propTypes = {
    // values pool as fetched and normalized
    collectionModels: React.PropTypes.objectOf(Model).isRequired,
    meta: React.PropTypes.shape({
      touched: React.PropTypes.bool,
      error: React.PropTypes.string,
    }),
    intl: React.PropTypes.shape({
      formatMessage: React.PropTypes.func,
    }),
    // from redux form
    // the selected value as fields object (holds selected levels IDs)
    // eslint-disable-next-line react/forbid-prop-types
    fields: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuVisible: false,
      menuAnchor: null,
    }
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
  renderSelectedLevelRow = ({ content: { name, description } }, index) => (
    <TableRow key={name}>
      <TableRowColumn>
        {index}
      </TableRowColumn>
      <TableRowColumn>
        {name}
      </TableRowColumn>
      <TableRowColumn>
        {description}
      </TableRowColumn>
      <TableRowColumn >
        <IconButton onTouchTap={() => this.onLevelRemoved(index)}>
          <RemoveLevel />
        </IconButton>
      </TableRowColumn>
    </TableRow>
  )

  /**
   * Renders the selected levels table
   * @return rendered
   */
  renderSelectedLevels = () => {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context
    // const { fields } = this.props
    const selectedLevels = this.getSelectedLevels()
    return (
      <div className={graphLevelsRender.selectedLevelsTable.classes} style={graphLevelsRender.selectedLevelsTable.styles}>
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
    return (
      <div className={graphLevelsRender.addButton.classes} style={graphLevelsRender.addButton.styles} >
        <RaisedButton
          label={<FormattedMessage id="search.graph.add.level" />}
          labelPosition={graphLevelsRender.addButton.labelPosition}
          icon={<PopupMenuIcon />}
          onTouchTap={this.onShowMenu}
          disabled={!selectableLevels.length}
        />
        <Popover
          open={menuVisible}
          anchorEl={menuAnchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
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
        <div className={graphLevelsRender.errorMessage.classes} style={graphLevelsRender.errorMessage.styles}>
          {error ? formatMessage({ id: error }) : null}
        </div>
      </ShowableAtRender>
    )
  }

  render() {
    const { moduleTheme: { admin: { form: { graphLevelsRender } } } } = this.context

    return (
      <div className={graphLevelsRender.classes} style={graphLevelsRender.styles} >
        {
          // render selection table
          this.renderSelectedLevels()
        }
        {
          // render selection button and menu
          this.renderLevelSelector()
        }
        {
          // render field error
          this.renderError()
        }
      </div >
    )
  }
}

export default SelectedLevelFormRender
