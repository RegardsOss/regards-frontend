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
import {
  CardActions,
  CardTitle,
  Card,
  CardText,
  MenuItem,
} from 'material-ui'
import map from 'lodash/map'
import { CardActionsComponent, Title } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
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
import OpenSearchStepperComponent from './OpenSearchStepperComponent'

const { required } = ValidationHelpers
const requiredValidator = [required]

/** Main values form shape */
export const OSResultsMainConfiguration = PropTypes.shape({
  formValues: PropTypes.shape({
    modelName: PropTypes.string,
    totalResultsField: PropTypes.string,
    pageSizeField: PropTypes.string,
    propertiesLabel: PropTypes.string,
    propertiesGeometry: PropTypes.string,
    rawDataURLPath: PropTypes.string,
    quicklookURLPath: PropTypes.string,
    thumbnailURLPath: PropTypes.string,
    dynamic: {
      properties: PropTypes.objectOf(PropTypes.string),
    },
  }),
})

/**
 * Form for OpenSearch crawler query results conversion configuration
 * @author Maxime Bouveron
 */
export class OSResultsConfigurationComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool,
    modelList: DataManagementShapes.ModelList.isRequired,
    modelAttributeList: DataManagementShapes.ModelAttributeList.isRequired,
    onModelSelected: PropTypes.func.isRequired,
    initialValues: OSResultsMainConfiguration,
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

  /**
   * React lifecycle method: component will mount. Used here to initialize form values from last edited values (might be empty)
   */
  componentWillMount() {
    const { initialize, initialValues } = this.props
    initialize(initialValues)
  }

  /**
   * On user submission
   * @param {*} fields fields as edited by user (never invalid, respects OSCrawlerConfigurationComponent.MainConfiguration)
   */
  handleSubmit = (fields) => {
    this.props.onSubmit(fields)
  }

  handleModelChange = (event, index, value, input) => {
    input.onChange(value)
    // Remove any mapping already set up
    // this.props.change('mapping', null)
    // Fetch new attribute list
    this.props.onModelSelected(value)
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
          <CardTitle title={formatMessage({ id: 'opensearch.crawler.form.results.title' })} subtitle={formatMessage({ id: 'opensearch.crawler.form.results.subtitle' })} />
          <OpenSearchStepperComponent stepIndex={2} />
          <CardText>
            <div style={inputContainer}>
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
                {map(modelList, model => (
                  <MenuItem
                    value={model.content.name}
                    key={model.content.name}
                    primaryText={model.content.name}
                  />
                ))}
              </Field>
            </div>
            {Object.entries(modelAttributeList).length > 0 && (
              <>
                <div style={title}>
                  <Title
                    level={2}
                    label={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.results.standardAttr' })}
                  />
                </div>
                <Field
                  name="propertiesLabel"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={formatMessage({ id: 'opensearch.crawler.form.results.label' })}
                  validate={required}
                />
                <Field
                  name="propertiesGeometry"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={formatMessage({ id: 'opensearch.crawler.form.results.geometry' })}
                  validate={required}
                />
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
                  validate={required}
                />

                <Field
                  name="quicklookURLPath"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={formatMessage({ id: 'opensearch.crawler.form.results.QUICKLOOK' })}
                  validate={required}
                />

                <Field
                  name="thumbnailURLPath"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={formatMessage({ id: 'opensearch.crawler.form.results.THUMBNAIL' })}
                  validate={required}
                />
                <div style={title}>
                  <Title
                    level={2}
                    label={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.results.dynamicAttr' })}
                  />
                </div>
                {map(modelAttributeList, attribute => (
                  <Field
                    component={RenderTextField}
                    key={attribute.content.attribute.name}
                    fullWidth
                    name={`dynamic.${attribute.content.attribute.jsonPath}`}
                    type="text"
                    label={attribute.content.attribute.name}
                    validate={attribute.content.attribute.optional ? null : requiredValidator}
                  />
                ))}
            </>)}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              mainButtonLabel={<FormattedMessage id="datasource.form.create.action.finish" />}
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
