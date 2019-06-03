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
import { FormattedMessage } from 'react-intl'
import Subheader from 'material-ui/Subheader'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  Field,
  FieldArray,
  reduxForm,
  RenderSelectField,
  RenderTextField,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  Card, CardActions, CardText, CardTitle, MenuItem,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import OSQueryFiltersFieldComponent from './OSQueryFiltersFieldComponent'
import OpenSearchStepperComponent from './OpenSearchStepperComponent'

const { number, required } = ValidationHelpers

const requiredNumberValidator = [number, required]

/** Expected form shape */
export const OSCrawlerQueryConfiguration = PropTypes.shape({
  filters: PropTypes.objectOf(PropTypes.string),
  lastUpdate: PropTypes.string,
  pageSize: PropTypes.number,
  totalResultsField: PropTypes.string,
  pageSizeField: PropTypes.string,
})

/**
 * Form for OpenSearch crawler query configuration
 * @author Maxime Bouveron
 */
export class OSQueryConfigurationComponent extends React.Component {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    filters: DataManagementShapes.OpenSearchURLDescription.isRequired,
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

  render() {
    const {
      handleSubmit, filters, onBack, submitting, invalid, isEditing,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { openSearchCrawler } } = this.context
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title={formatMessage({ id: isEditing ? 'opensearch.crawler.form.query.title.edit' : 'opensearch.crawler.form.query.title.create' })} subtitle={formatMessage({ id: 'opensearch.crawler.form.query.subtitle' })} />
          <OpenSearchStepperComponent stepIndex={1} />
          <CardText>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
              {/* 1. Parameters names (update and page size) */}
              <Subheader style={openSearchCrawler.subHeader}>
                {formatMessage({ id: 'opensearch.crawler.form.query.parameters' })}
              </Subheader>
              <Field
                name="lastUpdate"
                component={RenderSelectField}
                type="text"
                label={formatMessage({ id: 'opensearch.crawler.form.query.lastUpdate' })}
                validate={required}
              >
                {filters.parameter.map(filter => (
                  <MenuItem key={`${filter.name}-lastUpdate`} value={filter.name} primaryText={filter.name} />
                ))}
              </Field>
              <Field
                name="pageSize"
                component={RenderTextField}
                type="number"
                label={formatMessage({ id: 'opensearch.crawler.form.query.pageSize' })}
                validate={requiredNumberValidator}
              />
            </div>
            {/* 2. Query filters */}
            <Subheader style={openSearchCrawler.subHeader}>
              {formatMessage({ id: 'opensearch.crawler.form.query.filters' })}
            </Subheader>
            <FieldArray name="filters" component={OSQueryFiltersFieldComponent} filters={filters} />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              mainButtonLabel={<FormattedMessage id="datasource.form.create.action.next" />}
              secondaryButtonLabel={formatMessage({
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
  form: 'opensearch-query-form',
})(OSQueryConfigurationComponent)
