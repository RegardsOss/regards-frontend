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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'

import { formValueSelector } from 'redux-form'
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
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'
import { DescriptorHelper } from '../../../domain/opensearch/DescriptorHelper'
import OSQueryFiltersFieldComponent from './OSQueryFiltersFieldComponent'
import OpenSearchStepperComponent from '../OpenSearchStepperComponent'

/** Expected shape */
export const OSQueryConfiguration = PropTypes.shape({
  // Optionnaly restored in edition, unused here
  webserviceURL: PropTypes.string,
  pageIndexParam: PropTypes.string,
  pageSizeParam: PropTypes.string,
  startPageIndex: PropTypes.string,
  // Edited form values
  lastUpdateParam: PropTypes.string,
  pagesSize: PropTypes.string,
  webserviceParameters: PropTypes.objectOf(PropTypes.string),
})

/**
 * Form for OpenSearch crawler query configuration
 * @author Maxime Bouveron
 */
export class OSQueryConfigurationComponent extends React.Component {
  static propTypes = {
    initialValues: OSQueryConfiguration.isRequired,
    isEditing: PropTypes.bool.isRequired,
    urlDescriptor: DataManagementShapes.OpenSearchURLDescription.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    selectedPageSize: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    pageSizeParam: null,
    minPageSize: 1,
    maxPageSize: null,
    pageIndexParam: null,
    firstPageIndex: 0,
    webserviceURL: '',
    availableParameters: [],
    pageSizeValidators: [],
  }

  /**
   * React lifecycle method: component will mount. Used here to initialize form values from last edited values (might be empty)
   */
  UNSAFE_componentWillMount() {
    const { initialize, initialValues, urlDescriptor } = this.props
    // convert values to initialize from provided values (keep only useful ones and convert to usable filters with model)
    const usedInitialValues = {
      lastUpdateParam: initialValues.lastUpdateParam,
      startPageIndex: initialValues.startPageIndex,
      pagesSize: initialValues.pagesSize,
      // Restore only parameters still found
      webserviceParameters: reduce(initialValues.webserviceParameters || {}, (acc, queryValue, parameterName) => {
        const matchingParameter = urlDescriptor.parameter.find(({ name }) => name === parameterName)
        return matchingParameter ? [...acc, { ...matchingParameter, queryValue }] : acc
      }, []),
    }
    initialize(usedInitialValues)

    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { urlDescriptor } = newProps
    if (!isEqual(oldProps.urlDescriptor, urlDescriptor)) {
      const {
        pageSizeParam,
        minPageSize,
        maxPageSize,
        pageIndexParam,
        firstPageIndex,
      } = DescriptorHelper.parsePageData(urlDescriptor)
      this.setState({
        pageSizeParam,
        minPageSize,
        maxPageSize,
        pageIndexParam,
        firstPageIndex,
        webserviceURL: DescriptorHelper.getWebserviceURL(urlDescriptor),
        // Available parameters: remove page index and size as they are used by the plugin request then sort alphabetically
        availableParameters: get(newProps.urlDescriptor, 'parameter', [])
          .filter((p) => p.name !== pageSizeParam && p.name !== pageIndexParam)
          .sort((p1, p2) => StringComparison.compare(p1.name, p2.name)),
        // update field validators
        pageSizeValidators: [
          ValidationHelpers.required,
          ValidationHelpers.getIntegerInRangeValidator(minPageSize, maxPageSize || Number.MAX_VALUE),
        ],
      })
    }
  }

  /**
   * On user submission
   * @param {*} fields fields as edited by user (never invalid, respects OSCrawlerConfigurationComponent.MainConfiguration)
   */
  handleSubmit = (fields) => {
    const {
      webserviceURL, pageSizeParam, pageIndexParam, firstPageIndex,
    } = this.state
    // convert to format expected by parent container and commit
    this.props.onSubmit({
      webserviceURL,
      pageIndexParam,
      pageSizeParam,
      startPageIndex: firstPageIndex && firstPageIndex.toString(),
      // Edited form values
      lastUpdateParam: fields.lastUpdateParam,
      pagesSize: fields.pagesSize,
      // Transform edition model - Array of model with query value - into storage model - map of parameter name with query value
      webserviceParameters: fields.webserviceParameters.reduce((acc, { name, queryValue }) => ({
        ...acc,
        [name]: queryValue,
      }), {}),
    })
  }

  render() {
    const {
      handleSubmit, onBack, submitting,
      selectedPageSize, invalid, isEditing,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const {
      pageSizeParam,
      minPageSize,
      maxPageSize,
      pageIndexParam,
      firstPageIndex, // expected as string by parent
      webserviceURL,

      availableParameters,
      pageSizeValidators,
    } = this.state

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title={formatMessage({ id: isEditing ? 'opensearch.crawler.form.query.title.edit' : 'opensearch.crawler.form.query.title.create' })} subtitle={formatMessage({ id: 'opensearch.crawler.form.query.subtitle' })} />
          <OpenSearchStepperComponent stepIndex={1} />
          <CardText>
            {/* 1. Update parameter selector */}
            <Field
              name="lastUpdateParam"
              component={RenderSelectField}
              type="text"
              label={formatMessage({ id: 'opensearch.crawler.form.query.lastUpdate' })}
              fullWidth
            >
              {availableParameters.map((filter) => (
                <MenuItem key={`${filter.value}`} value={filter.name} primaryText={filter.name} />
              ))}
            </Field>
            {/* 2. Page size */}
            <Field
              name="pagesSize"
              component={RenderTextField}
              type="number"
              label={// Label: show allowed bounds
                formatMessage({ id: 'opensearch.crawler.form.query.pageSize' }, {
                  minBound: minPageSize
                    ? formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.min.inclusive.bound' }, { bound: minPageSize.toString() })
                    : formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.min.free.bound' }),
                  maxBound: maxPageSize
                    ? formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.max.inclusive.bound' }, { bound: maxPageSize.toString() })
                    : formatMessage({ id: 'opensearch.crawler.form.query.input.field.numeric.max.free.bound' }),
                })
              }
              validate={pageSizeValidators}
              fullWidth
            />
            {/* 3. Query filters */}
            <FieldArray
              name="webserviceParameters"
              component={OSQueryFiltersFieldComponent}
              availableParameters={availableParameters}
              webserviceURL={webserviceURL}
              pageSizeParam={pageSizeParam}
              selectedPageSize={selectedPageSize}
              pageIndexParam={pageIndexParam}
              firstPageIndex={firstPageIndex}
              invalid={invalid}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              mainButtonLabel={formatMessage({ id: 'datasource.form.create.action.next' })}
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

// prepare redux form
const formId = 'opensearch-query-form'
const connectedReduxForm = reduxForm({
  form: formId,
})(OSQueryConfigurationComponent)

// connect to select the page size value
const selector = formValueSelector(formId)
export default connect((state) => ({
  selectedPageSize: selector(state, 'pagesSize'),
}))(connectedReduxForm)
