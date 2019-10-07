/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'
import { ModuleContainer } from './ModuleContainer'

/**
 * React component to display module administration module.
 * @author Sébastien Binda
 */
class AdminContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfigurationShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.CONF_HEIGHT = `${props.adminForm.currentNamespace}.cssHeight`
    this.CONF_WIDTH = `${props.adminForm.currentNamespace}.cssWidth`
    this.CONF_URLS = `${props.adminForm.currentNamespace}.urlByLocale`
    this.CONF_EN_URL = `${this.CONF_URLS}.${UIDomain.LOCALES_ENUM.en}`
    this.CONF_FR_URL = `${this.CONF_URLS}.${UIDomain.LOCALES_ENUM.fr}`
  }

  /** Initial state */
  state = {
    previewLocale: UIDomain.LOCALES_ENUM.en,
  }

  /**
   * User select another preview
   * @param {*} evt event
   * @param {number} index selected index
   * @param {string} value selected locale value
   */
  onPreviewLocaleSelected = (evt, index, value) => this.setState({ previewLocale: value })

  /** @return {string} error if any, undefined otherwise  */
  validateAnyPageField = (fieldValue, formValues) => {
    const urlByLocale = get(formValues, this.CONF_URLS, {})
    const firstDefinedURL = find(urlByLocale, value => !!value)
    return firstDefinedURL ? undefined : 'embedded.html.admin.html.no.url.error'
  }

  /**
   * Renders preview and error message if any
   * @return {React.Element} rendered preview
   */
  renderPreview() {
    const { project, appName, adminForm } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { previewLocale } = this.state
    // 1 - compute preview properties
    const urlByLocale = get(adminForm, `form.${this.CONF_URLS}`)
    const moduleConfiguration = {
      cssHeight: get(adminForm, `form.${this.CONF_HEIGHT}`),
      cssWidth: get(adminForm, `form.${this.CONF_WIDTH}`),
      urlByLocale,
    }
    // 2 - compute preview warning / explanation message
    const noPage = reduce(urlByLocale, (acc, value) => acc && !value, true)
    // 3 - Render with the main user component (disconnected from store to control locale)
    return (
      <React.Fragment>
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
          moduleConf={moduleConfiguration}
          i18n={previewLocale}
        />
      </React.Fragment>)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { previewLocale } = this.state
    return (
      <FormPresentation>
        <FormRow>
          {/* Styles */}
          <FieldsGroup title={formatMessage({ id: 'embedded.html.styles.group.title' })}>
            <Field
              name={this.CONF_HEIGHT}
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'embedded.html.admin.css.height.label' })}
            />
            <Field
              name={this.CONF_WIDTH}
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'embedded.html.admin.css.width.label' })}
            />
          </FieldsGroup>
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
              { UIDomain.LOCALES.map(locale => (
                <MenuItem
                  key={locale}
                  value={locale}
                  primaryText={formatMessage({ id: `embedded.html.content.preview.locale.${locale}` })}
                />))
              }
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
