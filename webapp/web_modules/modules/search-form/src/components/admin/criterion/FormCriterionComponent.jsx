/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Edit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import { DamDomain } from '@regardsoss/domain'
import { CardActionsComponent, Title } from '@regardsoss/components'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { AttributeModelRender } from '@regardsoss/attributes-common'
import FormCriteriaComponent from './FormCriteriaComponent'

/**
 * Component to display all criterion associated to the current form
 * @author Sébastien binda
 */
class FormCriterionComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string,
    // Function to update current redux-form
    changeField: PropTypes.func,
    // Default form criterion list
    defaultCriterion: AccessShapes.UIPluginConfArray,
    // Current form criterion list
    criterion: AccessShapes.UIPluginConfArray,
    // Current layout form
    layout: AccessShapes.ContainerContent,
    // List of availables attributes to edit criterion configuration
    selectableAttributes: DataManagementShapes.AttributeModelList,
    // List of available criterion plugins
    availableCriterion: AccessShapes.UIPluginDefinitionList,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    criteriaToEdit: null,
    criteriaViewOpened: false,
  }

  getCriteriaAttributes = (criteria) => {
    const attributes = get(criteria, 'conf.attributes', {})

    return map(attributes, (attributePath) => {
      const attribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(attributePath, this.props.selectableAttributes)
      return attribute && AttributeModelRender.getRenderLabel(attribute, this.context.intl)
    }).join(' - ')
  }

  /**
   * Handle action to close the dialog containing the criteria edition form
   */
  closeCriteriaView = () => {
    this.setState({
      criteriaViewOpened: false,
    })
  }

  /**
   * Handle action to open a new criteria edition form
   */
  handleNewCriteria = () => {
    this.setState({
      criteriaToEdit: null,
      criteriaViewOpened: true,
    })
  }

  /**
   * Update redux-form conf property for criterion.
   *
   * @param criterion criterion to add or update
   */
  updateCriterion = (criterion, position) => {
    const { currentNamespace, changeField, criterion: criteria = [] } = this.props
    const critWithUniqueId = {
      pluginInstanceId: `${Date.now()}`, // use timestamp as Unique ID
      ...criterion,
    }

    let criteriaListWithoutEdited = [...criteria]
    if (this.state.criteriaToEdit) {
      // edited criterion: replace at index in cloned list
      criteriaListWithoutEdited = criteriaListWithoutEdited
        .filter((item, index) => index !== criteria.indexOf(this.state.criteriaToEdit.criteria))
    }

    const criteriaList = [
      ...criteriaListWithoutEdited.slice(0, position),
      critWithUniqueId,
      ...criteriaListWithoutEdited.slice(position),
    ]

    changeField(`${currentNamespace}.criterion`, criteriaList)
    this.closeCriteriaView()
  }

  /**
   * Handle action to edit a criteria
   * @param criteria
   * @param idx
   */
  handleEdit = (criteria, idx) => {
    this.setState({
      criteriaToEdit: {
        criteria,
        idx,
      },
      criteriaViewOpened: true,
    })
  }

  /**
   * Action to remove a criteria from the configuration
   * @param criteria
   */
  handleDelete = (criteria, idx) => {
    const { currentNamespace, changeField } = this.props

    const criterion = filter(this.props.criterion, (crit, index) => idx !== index)
    changeField(`${currentNamespace}.criterion`, criterion)
  }

  /**
   * Reset the criterion configuration
   */
  resetCriterion = () => {
    const { currentNamespace, changeField } = this.props
    changeField(`${currentNamespace}.criterion`, this.props.defaultCriterion)
  }

  /**
   * Rendering a row for each configured criteria
   * @returns {Array}
   */
  renderCriterionRows = () => {
    const rows = []
    if (this.props.criterion && this.props.criterion.length > 0) {
      forEach(this.props.criterion, (criteria, idx) => {
        const criteriaType = this.props.availableCriterion[criteria.pluginId]
        let label = criteria.pluginId
        if (criteriaType) {
          label = criteriaType.content.name
        }
        rows.push(
          <TableRow key={idx}>
            <TableRowColumn>{label}</TableRowColumn>
            <TableRowColumn>{this.getCriteriaAttributes(criteria)}</TableRowColumn>
            <TableRowColumn>{criteria.container}</TableRowColumn>
            <TableRowColumn>
              <IconButton onClick={() => this.handleEdit(criteria, idx)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => this.handleDelete(criteria, idx)}>
                <Delete />
              </IconButton>
            </TableRowColumn>
          </TableRow>)
      })
    }
    return rows
  }

  render() {
    return (
      <CardText>
        <Title
          level={3}
          label={this.context.intl.formatMessage({ id: 'form.criterion.tab.title' })}
        />
        <Table selectable={false}>
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.name' })}</TableHeaderColumn>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.attributes' })}</TableHeaderColumn>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.container' })}</TableHeaderColumn>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.actions' })}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderCriterionRows()}
          </TableBody>
        </Table>
        <CardActionsComponent
          mainButtonLabel={this.context.intl.formatMessage({ id: 'form.criterion.new.button.label' })}
          mainButtonClick={this.handleNewCriteria}
          secondaryButtonLabel={this.context.intl.formatMessage({ id: 'form.criterion.reset.button.label' })}
          secondaryButtonClick={this.resetCriterion}
        />
        <Dialog
          autoScrollBodyContent
          open={this.state.criteriaViewOpened}
        >
          <FormCriteriaComponent
            cancel={this.closeCriteriaView}
            saveCriteria={this.updateCriterion}
            criteria={this.state.criteriaToEdit ? this.state.criteriaToEdit.criteria : null}
            criterion={this.props.criterion}
            layout={this.props.layout}
            selectableAttributes={this.props.selectableAttributes}
            availableCriterion={this.props.availableCriterion}
            currentNamespace={this.props.currentNamespace}
          />
        </Dialog>
      </CardText>
    )
  }
}

export default FormCriterionComponent
