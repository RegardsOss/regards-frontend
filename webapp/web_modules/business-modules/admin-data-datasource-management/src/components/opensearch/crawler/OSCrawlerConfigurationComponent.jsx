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
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  Field, RenderTextField, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'
import OpenSearchStepperComponent from '../OpenSearchStepperComponent'
import { DescriptorHelper } from '../../../domain/opensearch/DescriptorHelper'

const {
  string, number, required, url,
} = ValidationHelpers
const requiredStringValidator = [string, required]
const requiredNumberValidator = [number, required]
const requiredUrlValidator = [url, required]

/** Main values form shape */
export const OSCrawlerMainConfiguration = PropTypes.shape({
  label: PropTypes.string,
  refreshRate: PropTypes.string,
  opensearchDescriptorURL: PropTypes.string,
})

/**
  * Form for OpenSearch crawler main configuration
  * @author Maxime Bouveron
  */
export class OSCrawlerConfigurationComponent extends React.Component {
  static propTypes = {
    initialValues: OSCrawlerMainConfiguration.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // attempts fetching descriptor. (url: string) => ()
    // eslint-disable-next-line react/no-unused-prop-types
    fetchDescriptor: PropTypes.func.isRequired, // used only in asyncValidate
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * React lifecycle method: component will mount. Used here to initialize form values from last edited values (might be empty)
   */
  UNSAFE_componentWillMount() {
    const { initialize, initialValues } = this.props
    initialize(initialValues)
  }

  /**
   * On user submission
   * @param {*} fields fields as edited by user (never invalid, respects OSCrawlerConfigurationComponent.MainConfiguration)
   */
  handleSubmit = (fields) => this.props.onSubmit(fields)

  render() {
    const {
      handleSubmit, submitting, invalid, onBack, isEditing,
    } = this.props
    const { formatMessage } = this.context.intl
    return (
      <form
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <Card>
          <CardTitle
            title={formatMessage({ id: isEditing ? 'opensearch.crawler.form.crawler.title.edit' : 'opensearch.crawler.form.crawler.title.create' })}
            subtitle={formatMessage({ id: 'opensearch.crawler.form.crawler.subtitle' })}
          />

          <OpenSearchStepperComponent stepIndex={0} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'opensearch.crawler.form.crawler.name' })}
              validate={requiredStringValidator}
            />
            <Field
              name="refreshRate"
              fullWidth
              component={RenderTextField}
              type="number"
              label={formatMessage({ id: 'opensearch.crawler.form.crawler.refreshRate' })}
              validate={requiredNumberValidator}
            />
            <Field
              name="opensearchDescriptorURL"
              fullWidth
              component={RenderTextField}
              type="url"
              disabled={isEditing}
              label={formatMessage({ id: 'opensearch.crawler.form.crawler.descriptor' })}
              validate={requiredUrlValidator}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              mainButtonLabel={
                <FormattedMessage
                  id="datasource.form.create.action.next"
                />
              }
              secondaryButtonLabel={formatMessage({ id: 'datasource.form.create.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

/**
 * Possible desciptor error types
 */
const DESCRIPTOR_ERROR_TYPES = {
  INVALID_URL: 'invalid.url',
  NO_JSON_RESOURCE_URL: 'no.json.resource.url',
  NO_PAGE_INDEX_PARAMETER: 'no.page.index.parameter',
  NO_PAGE_SIZE_PARAMETER: 'no.page.size.parameter',
}

/**
 * Asynchronous validator, checks that descriptor URL is OK
 * @param {*} values form values
 * @param {*} dispatch dispatch method
 * @param {*} props component properties
 */
function asyncValidate({ opensearchDescriptorURL }, dispatch, props) {
  const { fetchDescriptor } = props
  return fetchDescriptor(opensearchDescriptorURL).then(({ payload, error }) => {
    // 1 - Fetch OK?
    if (error) {
      throw new Error(DESCRIPTOR_ERROR_TYPES.INVALID_URL) // handled internally in catch
    }
    // 2 - Has JSON consumable URL for OpenSearch?
    const urlDescriptor = DescriptorHelper.getResourceURL(payload)
    if (!urlDescriptor) {
      throw new Error(DESCRIPTOR_ERROR_TYPES.NO_JSON_RESOURCE_URL) // handled internally in catch
    }
    // 3 - Has both page size and page index parameters?
    const pageIndexParameter = DescriptorHelper.getPageIndexParameter(urlDescriptor)
    if (!pageIndexParameter) {
      throw new Error(DESCRIPTOR_ERROR_TYPES.NO_PAGE_INDEX_PARAMETER)
    }
    const pageSizeParameter = DescriptorHelper.getPageSizeParameter(urlDescriptor)
    if (!pageSizeParameter) {
      throw new Error(DESCRIPTOR_ERROR_TYPES.NO_PAGE_SIZE_PARAMETER)
    }
    // nothing to do when valid
  }).catch((err) => {
    switch (err.message) {
      case DESCRIPTOR_ERROR_TYPES.NO_JSON_RESOURCE_URL:
        // eslint-disable-next-line no-throw-literal
        throw { opensearchDescriptorURL: 'opensearch.crawler.form.crawler.descriptor.no.json.url' } // redux-form expected format
      case DESCRIPTOR_ERROR_TYPES.INVALID_URL:
        // eslint-disable-next-line no-throw-literal
        throw { opensearchDescriptorURL: 'opensearch.crawler.form.crawler.descriptor.invalid.url' } // redux-form expected format
      case DESCRIPTOR_ERROR_TYPES.NO_PAGE_INDEX_PARAMETER:
        // eslint-disable-next-line no-throw-literal
        throw { opensearchDescriptorURL: 'opensearch.crawler.form.crawler.descriptor.no.page.index.parameter' } // redux-form expected format
      case DESCRIPTOR_ERROR_TYPES.PAGE_SIZE_PARAMETER:
      default:
        // eslint-disable-next-line no-throw-literal
        throw { opensearchDescriptorURL: 'opensearch.crawler.form.crawler.descriptor.no.page.size.parameter' } // redux-form expected format
    }
  })
}

export default reduxForm({
  form: 'opensearch-crawler-form',
  asyncValidate,
  asyncBlurFields: ['opensearchDescriptorURL'],
})(OSCrawlerConfigurationComponent)
