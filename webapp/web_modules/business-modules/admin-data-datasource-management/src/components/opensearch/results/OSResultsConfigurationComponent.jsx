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
import isNil from 'lodash/isNil'
import reduce from 'lodash/reduce'
import isPlainObject from 'lodash/isPlainObject'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import map from 'lodash/map'
import { CardActionsComponent, Title } from '@regardsoss/components'

import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  RenderSelectField,
  ValidationHelpers,
  Field,
  RenderTextField,
  reduxForm,
} from '@regardsoss/form-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import { DamDomain } from '@regardsoss/domain'
import OpenSearchStepperComponent from '../OpenSearchStepperComponent'

const { required } = ValidationHelpers
const requiredValidator = [required]

/** Main values form shape */
export const OSResultsConfiguration = PropTypes.shape({
  modelName: PropTypes.string,
  attributeToJSonField: PropTypes.objectOf(PropTypes.string),
  rawDataURLPath: PropTypes.string,
  quicklookURLPath: PropTypes.string,
  thumbnailURLPath: PropTypes.string,
  totalResultsField: PropTypes.string,
  pageSizeField: PropTypes.string,
})

/**
 * Form for OpenSearch crawler query results conversion configuration
 * @author Maxime Bouveron
 */
export class OSResultsConfigurationComponent extends React.Component {
  static propTypes = {
    initialValues: OSResultsConfiguration.isRequired,
    isEditing: PropTypes.bool,
    modelList: DataManagementShapes.ModelList.isRequired,
    modelAttributeList: DataManagementShapes.ModelAttributeList.isRequired,
    onModelSelected: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static STANDARD_ATTRIBUTES = [
    { // label
      model: DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.label),
      attributeRequired: true,
    }, { // provider id
      model: DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId),
      attributeRequired: true,
    }]

  /**
   * Flattens fields by their path in object. Example: { a: { b: '1' }, c: '2 } => { 'a.b' : 1, c: '2' }
   * @param {*} values values to flatten
   * @param {*} parentPath parent path (null when no parent)
   * @return {*} flatten object, with only one level, where each field is the concatenated path
   */
  static flattenByPath(values, parentPath = null) {
    return reduce(values, (acc, value, key) => {
      const keyWithPath = parentPath ? `${parentPath}.${key}` : key
      if (isPlainObject(value)) {
        // compound object: flatten sub elements
        return { ...acc, ...this.flattenByPath(value, keyWithPath) }
      }
      // final value, add it directly
      return { ...acc, [keyWithPath]: value }
    }, {})
  }

  /**
   * Flattens fields by their path in flatten object. Example: { 'a.b' : 1, c: '2' } => { a: { b: '1' }, c: '2 }
   * @param {*} flattenValues flatten values, to 'unflatten'
   * @param {*} parentPath parent path (null when no parent)
   */
  static unflattenOnPath(flattenValues) {
    return reduce(flattenValues, (acc, value, flattenPath) => {
      const nextAcc = { ...acc }
      const pathItems = flattenPath.split('.')
      // loop through path items to create / re-use each map object then push the value in last one
      let currentParent = nextAcc
      for (let i = 0; i < pathItems.length; i += 1) {
        const currentPathItem = pathItems[i]
        if (i === pathItems.length - 1) {
          // A - last element, set field value in final parent
          currentParent[currentPathItem] = value
        } else {
          // B - getting down in parents path: recover (1) or create sub map (2)
          const nextParent = { ...(currentParent[currentPathItem] || {}) }
          // update reference in current parent
          currentParent[currentPathItem] = nextParent
          // prepare for next loop
          currentParent = nextParent
        }
      }
      return nextAcc
    }, {})
  }

  /**
   * React lifecycle method: component will mount. Used here to initialize form values from last edited values (might be empty)
   */
  UNSAFE_componentWillMount() {
    const { initialize, initialValues } = this.props
    initialize({
      ...initialValues,
      // "unflatten" values as redux form expects them in map
      attributeToJSonField: OSResultsConfigurationComponent.unflattenOnPath(initialValues.attributeToJSonField),
    })
  }

  handleModelChange = (event, index, value, input) => {
    input.onChange(value)
    // Fetch new attribute list
    this.props.onModelSelected(value)
  }

  /**
   * On user submission
   * @param {*} fields fields as edited by user (never invalid, respects OSCrawlerConfigurationComponent.MainConfiguration)
   */
  handleSubmit = (fields) => {
    const { modelAttributeList, onSubmit } = this.props
    // A - flatten attributs by their path in edited object (avoid groups)
    const flatten = OSResultsConfigurationComponent.flattenByPath(fields.attributeToJSonField)
    // B - Clear any attribute that is related with another model selection or empty
    const allowedAttributesPath = [
      ...OSResultsConfigurationComponent.STANDARD_ATTRIBUTES.map(({ model: { content: { jsonPath } } }) => jsonPath),
      ...map(modelAttributeList, ({ content: { attribute } }) => attribute.jsonPath),
    ]
    const attributeToJSonField = reduce(flatten, (acc, value, key) => {
      if (!isNil(value) && allowedAttributesPath.includes(key)) {
        return { ...acc, [key]: value }
      }
      return acc
    }, {})
    // C - commit at expected parent format
    onSubmit({
      ...fields,
      attributeToJSonField,
    })
  }

  render() {
    const {
      isEditing, handleSubmit, modelList, modelAttributeList, submitting, invalid, onBack,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { openSearchCrawler } } = this.context
    const { title, inputContainer } = openSearchCrawler.resultsMapping
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'opensearch.crawler.form.results.title' })}
            subtitle={formatMessage({ id: 'opensearch.crawler.form.results.subtitle' })}
          />
          <OpenSearchStepperComponent stepIndex={2} />
          <CardText>
            <div style={inputContainer}>
              {/* Results metadata and model */}
              <Field
                name="totalResultsField"
                component={RenderTextField}
                fullWidth
                type="text"
                label={formatMessage({ id: 'opensearch.crawler.form.results.totalResults' })}
                validate={required}
              />
              <Field
                name="pageSizeField"
                component={RenderTextField}
                fullWidth
                type="text"
                label={formatMessage({ id: 'opensearch.crawler.form.results.pageSize' })}
                validate={required}
              />
              <Field
                name="modelName"
                component={RenderSelectField}
                fullWidth
                label={formatMessage({ id: 'opensearch.crawler.form.results.model' })}
                disabled={isEditing}
                validate={ValidationHelpers.required}
                onSelect={this.handleModelChange}
              >
                {map(modelList, ({ content: { name } }) => (
                  <MenuItem
                    value={name}
                    key={name}
                    primaryText={name}
                  />
                ))}
              </Field>
            </div>
            {/* Standard attributes */}
            <div style={title}>
              <Title
                level={2}
                label={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.results.standardAttr' })}
              />
            </div>
            {OSResultsConfigurationComponent.STANDARD_ATTRIBUTES.map(({ model: { content: { jsonPath } }, attributeRequired }) => (
              <Field
                key={jsonPath}
                name={`attributeToJSonField.${jsonPath}`}
                component={RenderTextField}
                fullWidth
                type="text"
                label={formatMessage({ id: `opensearch.crawler.form.results.${jsonPath}` })}
                validate={attributeRequired ? null : requiredValidator}
              />))}
            {/* Associated files  */}
            <div style={title}>
              <Title
                level={2}
                label={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.results.associatedFiles' })}
              />
            </div>
            <Field
              name="rawDataURLPath"
              component={RenderTextField}
              fullWidth
              type="text"
              label={formatMessage({ id: 'opensearch.crawler.form.results.RAWDATA' })}
            />

            <Field
              name="quicklookURLPath"
              component={RenderTextField}
              fullWidth
              type="text"
              label={formatMessage({ id: 'opensearch.crawler.form.results.QUICKLOOK' })}
            />

            <Field
              name="thumbnailURLPath"
              component={RenderTextField}
              fullWidth
              type="text"
              label={formatMessage({ id: 'opensearch.crawler.form.results.THUMBNAIL' })}
            />
            <div style={title}>
              <Title
                level={2}
                label={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.results.dynamicAttr' })}
              />
            </div>
            { /** Render specific model attributes */
              map(modelAttributeList, ({ content: { attribute } }) => (
                <Field
                  key={attribute.jsonPath}
                  component={RenderTextField}
                  fullWidth
                  name={`attributeToJSonField.${attribute.jsonPath}`}
                  type="text"
                  label={attribute.label}
                  validate={attribute.optional ? null : requiredValidator}
                />
              ))
            }
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              mainButtonLabel={formatMessage({ id: 'datasource.form.create.action.finish' })}
              secondaryButtonLabel={this.context.intl.formatMessage({
                id: 'datasource.form.create.action.previous',
              })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'opensearch-results-form',
})(OSResultsConfigurationComponent)
