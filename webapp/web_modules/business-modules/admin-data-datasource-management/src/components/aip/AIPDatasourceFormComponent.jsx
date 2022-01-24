/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import endsWith from 'lodash/endsWith'
import replace from 'lodash/replace'
import map from 'lodash/map'
import reject from 'lodash/reject'
import get from 'lodash/get'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import flow from 'lodash/flow'
import find from 'lodash/find'
import fpmap from 'lodash/fp/map'
import fpsortBy from 'lodash/fp/sortBy'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
} from 'material-ui/Table'
import {
  reduxForm, RenderTextField, RenderSelectField, Field, FieldArray, ValidationHelpers, RenderArrayTextField,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'

import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import { ShowableAtRender } from '@regardsoss/display-control'
import {
  getFullQualifiedAttributeName, IAIPDatasourceParamsEnum, DATASOURCE_REFRESH_RATE, MODEL_ATTR_TYPES,
} from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import { DamDomain } from '@regardsoss/domain'
import StaticAttributeListAIP from '../../domain/aip/StaticAttributeListAIP'
import AIPDatasourceAttributeLineConfigurationComponent from './AIPDatasourceAttributeLineConfigurationComponent'

const { findParam } = PluginConfParamsUtils

const labelValidators = [ValidationHelpers.required, ValidationHelpers.lengthLessThan(128)]

/**
 * React component to edit AIP datasource.
 */
export class AIPDatasourceFormComponent extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    modelList: DataManagementShapes.ModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    onModelSelected: PropTypes.func.isRequired,
    modelAttributeFetched: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    formValues: PropTypes.object,

    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    const { intl: { formatMessage } } = this.context

    if (this.props.isCreating) {
      return formatMessage({ id: 'aip.datasource.create.title' })
    }
    return formatMessage({ id: 'aip.datasource.edit.title' }, { name: this.props.currentDatasource.content.label })
  }

  /**
   * Returns all attributes except the one used on attributeFileSize property
   */
  getMappableAttributes = (modelAttributeList) => {
    const attributeFileSize = get(this.props.formValues, 'attributeFileSize')
    return reject(modelAttributeList, (modelAttribute) => (
      this.getFullQualifiedAttributeValue(modelAttribute.content.attribute) === attributeFileSize
    ))
  }

  /**
   * Returns all attributes having a long type
   */
  getAttributesTypeLong = (modelAttributeList) => (
    filter(modelAttributeList, (modelAttribute) => (
      modelAttribute.content.attribute.type === MODEL_ATTR_TYPES.LONG
    ))
  )

  /**
   * Return the value expected by the server
   */
  getFullQualifiedAttributeValue = (attribute) => {
    if (attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT) {
      return `${attribute.fragment.name}.${attribute.name}`
    }
    return `${attribute.name}`
  }

  /**
   * Return the mapping component, with optional at the end
   */
  getMappingAttributes = (modelAttributeList) => flow(
    fpsortBy('content.attribute.optional'),
    fpmap((modelAttribute) => (
      <AIPDatasourceAttributeLineConfigurationComponent
        key={modelAttribute.content.attribute.name}
        modelAttribute={modelAttribute}
      />
    )),
  )(modelAttributeList)

  /**
   * Remove the mapping already set up for that property
   */
  handleAttributeFileSizeChange = (event, index, value, input) => {
    input.onChange(value)
    this.props.change(`mapping.properties@${value.replace('.', '@')}`, null)
  }

  /**
   * Fetch attributes related to the model selected
   * called when the Field change
   * @param event
   * @param index
   * @param value
   * @param input
   */
  handleModelChange = (event, index, value, input) => {
    input.onChange(value)
    // Remove any mapping already set up
    this.props.change('mapping', null)
    // Fetch new attribute list
    this.props.onModelSelected(value)
  }

  isMappableAttributKey = (key, attributes) => {
    if (find(attributes, ['key', key])) {
      return true
    }
    if (find(attributes, (a) => a.content.attribute.jsonPath === key)) {
      return true
    }

    // Special  case of range attributes add lowerBound and upperBound at the end of the jsonPath
    if (endsWith(key, '.upperBound') && find(attributes, (a) => a.content.attribute.jsonPath === replace(key, '.upperBound', ''))) {
      return true
    }
    if (endsWith(key, '.lowerBound') && find(attributes, (a) => a.content.attribute.jsonPath === replace(key, '.lowerBound', ''))) {
      return true
    }
    return false
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    const { isCreating, currentDatasource, modelAttributeList } = this.props

    if (!isCreating) {
      const refreshRate = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.REFRESH_RATE), 'value')
      const modelName = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.MODEL), 'value')
      const tags = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.TAGS), 'value', [])
      const subsettingTags = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.SUBSETTING_TAGS), 'value', [])
      const subsettingCategories = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.SUBSETTING_CATEGORIES), 'value', [])
      const attributeFileSize = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.ATTRIBUTE_FILE_SIZE), 'value', '')
      const mappingRaw = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.BINDMAP_MAP), 'value', [])
      const mappableAttributs = this.getMappableAttributes(modelAttributeList)
      const staticMappableAttributs = this.getMappingAttributes(StaticAttributeListAIP)
      // Replace the caracter . inside the binding into the caracter @
      const mapping = {}
      forEach(mappingRaw, (value, key) => {
        if (!find(staticMappableAttributs, ['key', key]) && !this.isMappableAttributKey(key, mappableAttributs)) {
          console.error('unmappable attribute remove from conf', mappableAttributs, key)
        } else {
          mapping[key.replace(/\./g, '@')] = value
        }
      })
      const initialValues = {
        label: currentDatasource.content.label,
        model: modelName,
        refreshRate,
        tags,
        subsettingTags,
        subsettingCategories,
        mapping,
        attributeFileSize,
      }
      this.props.initialize(initialValues)
    } else {
      this.props.initialize({
        refreshRate: DATASOURCE_REFRESH_RATE,
      })
    }
  }

  render() {
    const {
      modelList, modelAttributeList,
      submitting, invalid, backUrl, isEditing, modelAttributeFetched,
    } = this.props
    const title = this.getTitle()
    const { intl: { formatMessage } } = this.context

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={formatMessage({ id: 'aip.datasource.form.subtitle' })}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'datasource.form.label' })}
              validate={labelValidators}
            />
            <Field
              name="refreshRate"
              fullWidth
              component={RenderTextField}
              type="number"
              label={formatMessage({ id: 'datasource.form.refreshRate' })}
            />
            <Field
              name="model"
              fullWidth
              component={RenderSelectField}
              label={formatMessage({ id: 'datasource.form.model' })}
              disabled={isEditing}
              validate={ValidationHelpers.required}
              onSelect={this.handleModelChange}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.name}
                  key={model.content.name}
                  primaryText={model.content.name}
                  className={`selenium-pickModel-${model.content.name}`}
                />
              ))}
            </Field>

            <ShowableAtRender
              show={modelAttributeFetched && !isEmpty(modelAttributeList)}
            >
              <Field
                name="attributeFileSize"
                fullWidth
                component={RenderSelectField}
                label={formatMessage({ id: 'datasource.form.attributeFileSize' })}
                onSelect={this.handleAttributeFileSizeChange}
              >
                <MenuItem
                  value=""
                  key="undefined-filesize"
                  primaryText=""
                />
                {map(this.getAttributesTypeLong(modelAttributeList), (modelAttribute, id) => (
                  <MenuItem
                    value={this.getFullQualifiedAttributeValue(modelAttribute.content.attribute)}
                    key={modelAttribute.content.attribute.name}
                    primaryText={getFullQualifiedAttributeName(modelAttribute.content.attribute)}
                    className={`selenium-pickAttributeFileSize-${modelAttribute.content.attribute.name}`}
                  />
                ))}
              </Field>
            </ShowableAtRender>
            <FieldArray
              name="tags"
              component={RenderArrayTextField}
              fieldsListLabel={formatMessage({ id: 'datasource.form.tags' })}
            />
            <FieldArray
              name="subsettingTags"
              component={RenderArrayTextField}
              fieldsListLabel={formatMessage({ id: 'datasource.form.subsettingTags' })}
            />
            <FieldArray
              name="subsettingCategories"
              component={RenderArrayTextField}
              fieldsListLabel={formatMessage({ id: 'datasource.form.subsettingCategories' })}
            />
            <ShowableAtRender
              show={modelAttributeFetched}
            >
              <Table
                selectable={false}
              >
                <TableHeader
                  enableSelectAll={false}
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn>{formatMessage({ id: 'aip.datasource.form.table.staticAttributes' })}</TableHeaderColumn>
                    <TableHeaderColumn>{formatMessage({ id: 'aip.datasource.form.table.type' })}</TableHeaderColumn>
                    <TableHeaderColumn>{formatMessage({ id: 'aip.datasource.form.table.value' })}</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  preScanRows={false}
                  showRowHover
                >
                  {this.getMappingAttributes(StaticAttributeListAIP)}
                </TableBody>
              </Table>
              <ShowableAtRender
                show={!isEmpty(modelAttributeList)}
              >
                <Table
                  selectable={false}
                >
                  <TableHeader
                    enableSelectAll={false}
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn>{formatMessage({ id: 'aip.datasource.form.table.fragmentAndLabel' })}</TableHeaderColumn>
                      <TableHeaderColumn>{formatMessage({ id: 'aip.datasource.form.table.type' })}</TableHeaderColumn>
                      <TableHeaderColumn>{formatMessage({ id: 'aip.datasource.form.table.value' })}</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                    preScanRows={false}
                    showRowHover
                  >
                    {this.getMappingAttributes(this.getMappableAttributes(modelAttributeList))}
                  </TableBody>
                </Table>
              </ShowableAtRender>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'datasource.form.mapping.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'datasource.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'aip-datasource-form',
})(AIPDatasourceFormComponent)
