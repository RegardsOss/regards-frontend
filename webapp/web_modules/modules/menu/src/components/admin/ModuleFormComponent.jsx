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
import get from 'lodash/get'
import RadioButton from 'material-ui/RadioButton'
import Subheader from 'material-ui/Subheader'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  RenderTextField, RenderCheckbox, RenderRadio, Field, FieldArray, ValidationHelpers,
} from '@regardsoss/form-utils'
import { UIDomain } from '@regardsoss/domain'
import { HOME_ICON_TYPES_ENUM } from '../../domain/HomeIconType'
import NavigationArrayFieldRender from './navigation/NavigationArrayFieldRender'
import MenuPreviewComponent from './MenuPreviewComponent'

/**
 * Module form component
 * @author Raphaël Mechali
 */
class ModuleFormComponent extends React.Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    adminForm: AccessShapes.moduleAdminForm,
    dynamicModules: AccessShapes.ModuleArray,
    roleList: AdminShapes.RoleList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static validateOptionalEmail = (value) => value && ValidationHelpers.email(value)

  static validateOptionalUrl = (value) => value && ValidationHelpers.url(value)

  constructor(props) {
    super(props)
    const { currentNamespace } = props.adminForm
    this.CONF_CONTACTS = `${currentNamespace}.contacts`
    this.CONF_ABOUT_PAGE = `${currentNamespace}.projectAboutPage`
    this.CONF_AUTH = `${currentNamespace}.displayAuthentication`
    this.CONF_CART = `${currentNamespace}.displayCartSelector`
    this.CONF_NOTIF = `${currentNamespace}.displayNotificationsSelector`
    this.CONF_LOCALE = `${currentNamespace}.displayLocaleSelector`
    this.CONF_THEME = `${currentNamespace}.displayThemeSelector`
    this.HOME_CONFIGURATION_ROOT = `${currentNamespace}.home`
    this.CONF_HOME_ICON_TYPE = `${this.HOME_CONFIGURATION_ROOT}.icon.type`
    this.CONF_HOME_ICON_URL = `${this.HOME_CONFIGURATION_ROOT}.icon.url`
    this.CONF_HOME_TITLE_EN = `${this.HOME_CONFIGURATION_ROOT}.title.en`
    this.CONF_HOME_TITLE_FR = `${this.HOME_CONFIGURATION_ROOT}.title.fr`
    this.CONF_NAVIGATION = `${currentNamespace}.navigation`
  }

  /**
   * Lifecycle method component will mount, used here to initialize default form values
   */
  UNSAFE_componentWillMount = () => {
    // initialize EN and FR titles
    const { adminForm: { form, changeField } } = this.props
    if (!get(form, this.CONF_HOME_TITLE_EN)) {
      changeField(this.CONF_HOME_TITLE_EN, 'Home page')
    }
    if (!get(form, this.CONF_HOME_TITLE_FR)) {
      changeField(this.CONF_HOME_TITLE_FR, 'Page d\'accueil')
    }
  }

  /**
   * Validates custom icon URL
   * @param textURL user entered text
   * @param values the rest of form values
   * @return error intl key if any error, undefined otherwise
   */
  validateCustomHomeIcon = (textURL, values) => {
    const iconType = get(values, this.CONF_HOME_ICON_TYPE)
    if (iconType === HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON) {
      // when in custom icon type, that field is required
      return ValidationHelpers.required(textURL) || ValidationHelpers.url(textURL)
    }
    return undefined // no error in any other case
  }

  /** Callback for navigation field to update */
  changeNavigationFieldValue = (newValue) => {
    const { adminForm: { changeField } } = this.props
    changeField(this.CONF_NAVIGATION, newValue)
  }

  render() {
    const {
      appName, project, adminForm, dynamicModules, roleList,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { admin: { subheaderStyle, firstSubheaderStyle, radioButtonGroupLabelStyle } } } = this.context
    const portal = appName === UIDomain.APPLICATIONS_ENUM.PORTAL

    return (
      <div>
        <Subheader style={firstSubheaderStyle}>
          {formatMessage({ id: 'user.menu.form.options.title' })}
        </Subheader>
        {/* Contact: always available */}
        <Field
          name={this.CONF_CONTACTS}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'menu.form.contacts' })}
          validate={ModuleFormComponent.validateOptionalEmail}
        />
        {/* About page: always available */}
        <Field
          name={this.CONF_ABOUT_PAGE}
          fullWidth
          component={RenderTextField}
          label={formatMessage({ id: 'menu.form.projectpage' })}
          validate={ModuleFormComponent.validateOptionalUrl}
        />
        { /** Authentication, basket and notifications: any but portal */
          portal ? null : (
            <>
              <Field
                name={this.CONF_AUTH}
                component={RenderCheckbox}
                label={formatMessage({ id: 'menu.form.displayauthentication' })}
              />
              <Field
                name={this.CONF_CART}
                component={RenderCheckbox}
                label={formatMessage({ id: 'menu.form.displaycart' })}
                noSpacing
              />
              <Field
                name={this.CONF_NOTIF}
                component={RenderCheckbox}
                label={formatMessage({ id: 'menu.form.displaynotifications' })}
                noSpacing
              />
            </>)
        }
        {/* Locale: always available */}
        <Field
          name={this.CONF_LOCALE}
          component={RenderCheckbox}
          label={formatMessage({ id: 'menu.form.displaylocale' })}
          noSpacing
        />
        {/* Theme: always available */}
        <Field
          name={this.CONF_THEME}
          component={RenderCheckbox}
          label={formatMessage({ id: 'menu.form.displaytheme' })}
          noSpacing
        />
        {/* Home page and navigation: any but portal */
        portal ? null : (
          <>
            <Subheader style={subheaderStyle}>
              {formatMessage({ id: 'user.menu.form.navigation.home.title' })}
            </Subheader>
            {/* Home icon type */}
            <div style={radioButtonGroupLabelStyle}>
              {formatMessage({ id: 'menu.form.home.page.icon.type.label' })}
            </div>
            <Field
              name={this.CONF_HOME_ICON_TYPE}
              component={RenderRadio}
              defaultSelected={HOME_ICON_TYPES_ENUM.DEFAULT_HOME_ICON}
              fullWidth
            >
              <RadioButton
                value={HOME_ICON_TYPES_ENUM.NONE}
                label={formatMessage({ id: 'menu.form.home.page.icon.type.none' })}
              />
              <RadioButton
                value={HOME_ICON_TYPES_ENUM.DEFAULT_HOME_ICON}
                label={formatMessage({ id: 'menu.form.home.page.icon.type.default' })}
              />
              <RadioButton
                value={HOME_ICON_TYPES_ENUM.MODULE_ICON}
                label={formatMessage({ id: 'menu.form.home.page.icon.type.module' })}
              />
              <RadioButton
                value={HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON}
                label={formatMessage({ id: 'menu.form.home.page.icon.type.custom' })}
              />
            </Field>
            {/* Home icon URL */}
            <Field
              name={this.CONF_HOME_ICON_URL}
              disabled={
                // enabled only when in custom URL mode
                get(adminForm.form, this.CONF_HOME_ICON_TYPE) !== HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON
              }
              component={RenderTextField}
              fullWidth
              type="text"
              label={formatMessage({ id: 'menu.form.home.page.icon.custom.url' })}
              validate={this.validateCustomHomeIcon}
            />
            {/* Home titles by locale */}
            <Field
              name={this.CONF_HOME_TITLE_EN}
              component={RenderTextField}
              fullWidth
              type="text"
              label={formatMessage({ id: 'menu.form.home.page.title.en' })}
              validate={ValidationHelpers.required}
            />
            <Field
              name={this.CONF_HOME_TITLE_FR}
              component={RenderTextField}
              fullWidth
              type="text"
              label={formatMessage({ id: 'menu.form.home.page.title.fr' })}
              validate={ValidationHelpers.required}
            />
            <Subheader style={subheaderStyle}>
              {formatMessage({ id: 'user.menu.form.navigation.layout.title' })}
            </Subheader>
            {/* Navigation configuration */}
            <FieldArray
              name={this.CONF_NAVIGATION}
              component={NavigationArrayFieldRender}
              dynamicModules={dynamicModules}
              roleList={roleList}
              homeConfiguration={get(adminForm, `form.${this.HOME_CONFIGURATION_ROOT}`)}
              navigationItems={get(adminForm, `form.${this.CONF_NAVIGATION}`, [])}
              changeNavigationFieldValue={this.changeNavigationFieldValue}
            />
          </>)
        }
        {/* Preview: always available */}
        <Subheader style={subheaderStyle}>
          {formatMessage({ id: 'user.menu.form.preview.title' })}
        </Subheader>
        <MenuPreviewComponent
          appName={appName}
          project={project}
          roleList={roleList}
          moduleConfiguration={get(adminForm, `form.${adminForm.currentNamespace}`)}
        />
      </div>
    )
  }
}

export default ModuleFormComponent
