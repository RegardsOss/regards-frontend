/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { modulesManager } from '@regardsoss/modules'
import {
  RenderTextField, Field, FormPresentation, FormRow, FieldsGroup,
} from '@regardsoss/form-utils'
import { ModuleContainer } from './ModuleContainer'

/**
 * React component to display module administration module.
 * @author Sébastien Binda
 */
class AdminContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeConfigurationModuleFields,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Height to use for preview when module is used as a page */
  static PREVIEW_PAGE_HEIGHT = '400px'

  /** Height field name */
  CONF_HEIGHT = `${this.props.adminForm.currentNamespace}.cssHeight`

  /** Width field name */
  CONF_WIDTH = `${this.props.adminForm.currentNamespace}.cssWidth`

  /** URLs group fields name */
  CONF_URLS = `${this.props.adminForm.currentNamespace}.urlByLocale`

  /** EN URL field name */
  CONF_EN_URL = `${this.CONF_URLS}.${UIDomain.LOCALES_ENUM.en}`

  /** FR URL field name */
  CONF_FR_URL = `${this.CONF_URLS}.${UIDomain.LOCALES_ENUM.fr}`

  /** Initial state */
  state = {
    previewLocale: UIDomain.LOCALES_ENUM.en,
    moduleConf: null,
  }

  /**
  * Lifecycle method: component will mount. Used here to detect first properties change and update local state
  */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { adminForm: { isPage, form } } = newProps
    this.onPreviewDataChanged(this.state.previewLocale, isPage, form)
  }

  /**
   * User select another preview
   * @param {*} evt event
   * @param {number} index selected index
   * @param {string} newLocale selected locale value
   */
  onPreviewLocaleSelected = (evt, index, newLocale) => {
    const { adminForm: { isPage, form } } = this.props
    this.onPreviewDataChanged(newLocale, isPage, form)
  }

  /**
   * Inner callback: Preview module data changed, update state
   * @param {string} previewLocale
   * @param {boolean} isPage is module displayed as page
   * @param {*} form current form data
   *
   */
  onPreviewDataChanged = (previewLocale, isPage, form) => {
    const nextState = {
      previewLocale,
      moduleConf: {
        preview: true,
        previewLocale,
        cssHeight: isPage ? AdminContainer.PREVIEW_PAGE_HEIGHT : get(form, this.CONF_HEIGHT),
        cssWidth: get(form, this.CONF_WIDTH),
        urlByLocale: get(form, this.CONF_URLS),
      },
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  /** @return {string} error if any, undefined otherwise  */
  validateAnyPageField = (fieldValue, formValues) => {
    const urlByLocale = get(formValues, this.CONF_URLS, {})
    const firstDefinedURL = find(urlByLocale, (value) => !!value)
    return firstDefinedURL ? undefined : 'embedded.html.admin.html.no.url.error'
  }

  /**
   * Renders preview and error message if any
   * @return {React.Element} rendered preview
   */
  renderPreview() {
    const { project, appName, adminForm: { form } } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { moduleConf } = this.state
    // compute preview properties
    const urlByLocale = get(form, this.CONF_URLS)
    // compute preview warning / explanation message
    const noPage = reduce(urlByLocale, (acc, value) => acc && !value, true)
    // Render with the main user component (disconnected from store to control locale)
    return (
      <>
        { // No page error
          noPage ? (
            <div style={moduleTheme.admin.previewErrorMessage}>
              {formatMessage({ id: 'embedded.html.content.preview.no.page' })}
            </div>) : null
        }
        <ModuleContainer
          appName={appName}
          project={project}
          type={modulesManager.AllDynamicModuleTypes.EMBEDDED_HMTL}
          moduleConf={moduleConf}
        />
      </>)
  }

  render() {
    const { adminForm: { isPage } } = this.props
    const { intl: { formatMessage } } = this.context
    const { previewLocale } = this.state
    return (
      <FormPresentation>
        <FormRow>
          {/* URLs by language */}
          <FieldsGroup title={formatMessage({ id: 'embedded.html.content.group.title' })}>
            <Field
              name={this.CONF_EN_URL}
              fullWidth
              component={RenderTextField}
              type="text"
              validate={this.validateAnyPageField}
              label={formatMessage({ id: 'embedded.html.admin.html.url.en' })}
            />
            <Field
              name={this.CONF_FR_URL}
              fullWidth
              component={RenderTextField}
              type="text"
              validate={this.validateAnyPageField}
              label={formatMessage({ id: 'embedded.html.admin.html.url.fr' })}
            />
          </FieldsGroup>
          {/* Styles */}
          <FieldsGroup title={formatMessage({ id: 'embedded.html.styles.group.title' })}>
            <Field
              name={this.CONF_HEIGHT}
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'embedded.html.admin.css.height.label' })}
              disabled={isPage}
            />
            <Field
              name={this.CONF_WIDTH}
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'embedded.html.admin.css.width.label' })}
              disabled={isPage}
            />
          </FieldsGroup>
        </FormRow>
        {/* Preview */}
        <FormRow>
          <FieldsGroup
            title={formatMessage({ id: 'embedded.html.content.preview.title' })}
            spanFullWidth
          >
            {/* 1. Preview locale selector */}
            <SelectField
              floatingLabelText={formatMessage({ id: 'embedded.html.content.preview.locale.selector' })}
              value={previewLocale}
              onChange={this.onPreviewLocaleSelected}
              fullWidth
            >
              {UIDomain.LOCALES.map((locale) => (
                <MenuItem
                  key={locale}
                  value={locale}
                  primaryText={formatMessage({ id: `embedded.html.content.preview.locale.${locale}` })}
                />))}
            </SelectField>
            { // 2. Preview rendering
              this.renderPreview()
            }
          </FieldsGroup>
        </FormRow>
      </FormPresentation>)
  }
}

export default AdminContainer
