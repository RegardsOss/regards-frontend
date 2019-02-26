import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  ListItem,
  Dialog,
  List,
  TextField,
  CardTitle,
  CardText,
  RaisedButton,
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
  MenuItem,
  IconButton,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import { ActionDelete } from 'material-ui/svg-icons'
import { RenderSelectField, RenderTextField, Field } from '../../../../utils/form-utils/src/main'

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
 * Dialog to add a filter to an opensearch crawler
 * @author Maxime Bouveron
 */

class AddFilterDialogComponent extends React.Component {
  static propTypes = {
    filters: PropTypes.arrayOf(PropTypes.obj),
    handleAddFilter: PropTypes.func,
    open: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    filter: '',
    currentFilter: null,
    dialogOpen: false,
  }

  toggleDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    })
  }

  handleAddFilter = (filter) => {
    this.toggleDialog()
    this.props.fields.push(filter)
  }

  handleFilter = (e) => {
    this.setState({
      filter: e.target.value.toLowerCase(),
    })
  }

  handleSelectFilter = (currentFilter) => {
    this.setState({
      currentFilter,
    })
  }

  renderList = () => {
    const selected = { backgroundColor: this.context.muiTheme.palette.primary1Color }
    const innerDivStyle = {
      innerDivStyle: { fontSize: '0.95em', paddingTop: 7, paddingBottom: 7 },
    }
    return this.props.filters
      .filter(filter => this.props.fields.getAll() ? !this.props.fields.getAll().includes(filter) : true)
      .filter(filter => filter.label.toLowerCase().includes(this.state.filter))
      .map((filter, index) => (
        <ListItem
          {...innerDivStyle}
          style={this.state.currentFilter === filter && selected}
          key={filter.label}
          onClick={() => this.handleSelectFilter(filter)}
        >
          {filter.label}
        </ListItem>
      ))
  }

  renderDialog = () => (
    <Dialog bodyStyle={{ padding: 0 }} open={this.state.dialogOpen} modal>
      <div style={{ display: 'flex', maxHeight: 400 }}>
        <div
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          className="col-xs-35 col-lg-30"
        >
          <List>
            <div style={{ padding: '0 25px' }}>
              <TextField
                style={{ width: '100%' }}
                onChange={this.handleFilter}
                placeholder="Filter..."
              />
            </div>
            {this.renderList()}
          </List>
        </div>
        <div className="col-xs-65 col-lg-70">
          {this.state.currentFilter && (
            <>
              <CardTitle>{this.state.currentFilter.label}</CardTitle>
              <CardText>
                <strong>Label:</strong>
                {this.state.currentFilter.label}
                <br />
                <strong>Description:</strong>
                {this.state.currentFilter.description}
                <br />
                <strong>Bounds:</strong>
                {this.state.currentFilter.bounds}
                <br />
                <strong>Pattern:</strong>
                {this.state.currentFilter.pattern}
                <br />
                <strong>Possible values:</strong>
                {this.state.currentFilter.possibleValues && (
                  <ul>
                    {this.state.currentFilter.possibleValues.map(value => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                )}
                <br />
              </CardText>
              <CardActionsComponent
                mainButtonLabel="Add"
                mainButtonClick={() => {
                  this.handleAddFilter(this.state.currentFilter)
                }}
                secondaryButtonLabel="Cancel"
                secondaryButtonClick={this.toggleDialog}
              />
            </>
          )}
        </div>
      </div>
    </Dialog>
  )

  render() {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Feature filter</span>
          <RaisedButton label="Add" onClick={this.toggleDialog} />
          {this.renderDialog()}
        </div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.fields.map((filter, index) => (
              <TableRow key={filter.label}>
                <TableRowColumn>{this.props.fields.get(index).label}</TableRowColumn>
                <TableRowColumn>{this.props.fields.get(index).description}</TableRowColumn>
                <TableRowColumn>
                  {this.props.fields.get(index).possibleValues ? (
                    <Field name={`${filter}.value`} component={RenderSelectField} label="Value">
                      {this.props.fields.get(index).possibleValues.map(value => (
                        <MenuItem key={value} value={value} primaryText={value} />
                      ))}
                    </Field>
                  ) : (
                    <Field name={`${filter}.value`} component={RenderTextField} label="Value" />
                  )}
                </TableRowColumn>
                <TableRowColumn>
                  <IconButton onClick={() => this.props.fields.remove(index)}>
                    <ActionDelete />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  }
}

export default AddFilterDialogComponent
