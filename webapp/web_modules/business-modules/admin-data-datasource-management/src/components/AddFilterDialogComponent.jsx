import omit from 'lodash/omit'
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
import {
  RenderSelectField, RenderTextField, Field, ValidationHelpers,
} from '../../../../utils/form-utils/src/main'

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
    this.props.fields.push(omit(filter, 'value'))
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
    return this.props.filters.parameter
      .filter(filter => this.props.fields.getAll()
        ? !this.props.fields.getAll().find(field => field.name === filter.name)
        : true,
      ) // TODO ouch
      .filter(filter => filter.name.toLowerCase().includes(this.state.filter))
      .map((filter, index) => (
        <ListItem
          {...innerDivStyle}
          style={this.state.currentFilter === filter ? selected : null}
          key={filter.name}
          onClick={() => this.handleSelectFilter(filter)}
        >
          {filter.name}
        </ListItem>
      ))
  }

  renderParameterAttribute = (name, key) => this.state.currentFilter[key] && (
  <div style={{ marginBottom: 5 }}>
    <strong>{`${name} : `}</strong>
    <span>{this.state.currentFilter[key]}</span>
  </div>
  )

  getOptions = (filter) => {
    if (filter.options) return filter.options
    if (filter.option) return filter.option
    return false
  }

  getValidation = (filter) => {
    const {
      number, required, lessThan, moreThan,
    } = ValidationHelpers

    const validation = [required]

    if (filter.maxInclusive || filter.minInclusive) if (filter.maxInclusive) validation.push(number)
    if (filter.maxInclusive) validation.push(lessThan(parseInt(filter.maxInclusive, 10)))
    if (filter.minInclusive) validation.push(moreThan(parseInt(filter.minInclusive, 10)))

    return validation
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
              <CardTitle>{this.state.currentFilter.name}</CardTitle>
              <CardText>
                {this.renderParameterAttribute('Name', 'name')}
                {this.renderParameterAttribute('Title', 'title')}
                {this.renderParameterAttribute('Max Inclusive', 'maxInclusive')}
                {this.renderParameterAttribute('Min Inclusive', 'minInclusive')}
                {this.renderParameterAttribute('Pattern', 'pattern')}
                {this.getOptions(this.state.currentFilter) && (
                  <>
                    <strong>Possible values:</strong>
                    <ul>
                      {this.getOptions(this.state.currentFilter).map(option => (
                        <li key={option.value}>{option.value}</li>
                      ))}
                    </ul>
                  </>
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
        {this.props.fields.length > 0 && (
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
                <TableRow key={filter.name}>
                  <TableRowColumn>{this.props.fields.get(index).name}</TableRowColumn>
                  <TableRowColumn>{this.props.fields.get(index).title}</TableRowColumn>
                  <TableRowColumn>
                    {this.getOptions(this.props.fields.get(index)) ? (
                      <Field name={`${filter}.value`} component={RenderSelectField} label="Value">
                        {this.getOptions(this.props.fields.get(index)).map(option => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            primaryText={option.value}
                          />
                        ))}
                      </Field>
                    ) : (
                      <Field
                        name={`${filter}.value`}
                        component={RenderTextField}
                        label="Value"
                        // validate={this.getValidation(this.props.fields.get(index))} TODO : Doesn't really work
                      />
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
        )}
      </>
    )
  }
}

export default AddFilterDialogComponent
