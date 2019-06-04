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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  Field,
  FieldArray,
  reduxForm,
  RenderSelectField,
  RenderTextField,
  ValidationHelpers,
  StringComparison,
} from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  Card, CardActions, CardText, CardTitle, MenuItem,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import OSQueryFiltersFieldComponent from './OSQueryFiltersFieldComponent'
import OpenSearchStepperComponent from '../OpenSearchStepperComponent'

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
    urlDescriptor: DataManagementShapes.OpenSearchURLDescription.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // TODO initial values prop type
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

  state = {
    availableParameters: [],
  }

  /**
   * React lifecycle method: component will mount. Used here to initialize form values from last edited values (might be empty)
   */
  componentWillMount() {
    const { initialize, initialValues } = this.props
    // TODO CONVERT FROM init values (TO RENAME) => to field values (using URL descriptor)
    initialize(initialValues)
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(oldProps.urlDescriptor, newProps.urlDescriptor)) {
      this.setState({
        availableParameters: get(newProps.urlDescriptor, 'parameter', []).sort((p1, p2) => StringComparison.compare(p1.name, p2.name)),
      })
    }
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
      handleSubmit, urlDescriptor, onBack, submitting, invalid, isEditing,
    } = this.props
    const { availableParameters } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title={formatMessage({ id: isEditing ? 'opensearch.crawler.form.query.title.edit' : 'opensearch.crawler.form.query.title.create' })} subtitle={formatMessage({ id: 'opensearch.crawler.form.query.subtitle' })} />
          <OpenSearchStepperComponent stepIndex={1} />
          <CardText>
            {/* 1. Update parameter selector */}
            <Field
              name="lastUpdate"
              component={RenderSelectField}
              type="text"
              label={formatMessage({ id: 'opensearch.crawler.form.query.lastUpdate' })}
              validate={required}
              fullWidth
            >
              {availableParameters.map(filter => (
                <MenuItem key={`${filter.value}`} value={filter.name} primaryText={filter.name} />
              ))}
            </Field>
            {/* 2. Page size */}
            <Field
              name="pageSize"
              component={RenderTextField}
              type="number"
              label={formatMessage({ id: 'opensearch.crawler.form.query.pageSize' })}
              validate={requiredNumberValidator}
              fullWidth
            />
            {/* 3. Query filters */}
            <FieldArray
              name="filters"
              component={OSQueryFiltersFieldComponent}
              availableParameters={availableParameters}
              openSearchTemplateURL={urlDescriptor.template}
            />
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
