/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import trim from 'lodash/trim'
import merge from 'lodash/merge'
import set from 'lodash/set'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { RenderTextField, Field, RenderCheckbox, reduxForm, ValidationHelpers } from '@regardsoss/form-utils'
import MenuItem from 'material-ui/MenuItem'
import { themeContextType, defaultCustomConfiguration } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { ThemeEditor } from '@regardsoss/vendors'
import SelectField from 'material-ui/SelectField'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

// Varchar 16
const nameValidators = [ValidationHelpers.validAlphaNumericUnderscore, ValidationHelpers.lengthMoreThan(3), ValidationHelpers.lengthLessThan(16)]

/**
 * Display the theme form component
 * @author Léo Mieulet
 */
export class ThemeFormComponent extends React.Component {
  static propTypes = {
    currentTheme: AccessShapes.Theme,
    backUrl: PropTypes.string,
    isCreating: PropTypes.bool,
    onSubmit: PropTypes.func,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }
  static UNDEFINED_THEME = ''
  static DARK_THEME = 'dark'
  static LIGHT_THEME = 'light'

  // Generate the basic configuration using the Dark or Light theme

  state = {
    value: ThemeFormComponent.UNDEFINED_THEME,
    configuration: {},
    // used to reset the configuration to a previous state (on creation = baseTheme, edition = currentTheme)
    initialConfiguration: {},
    // used to split Material components and regards components
    customConfigurationKeys: [],
    // used to refresh the demo
    lastRefresh: 0,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state.lastRefresh, nextState.lastRefresh) || !isEqual(this.state.value, nextState.value)
  }

  getTitle = () => {
    if (this.props.isCreating) {
      return this.context.intl.formatMessage({ id: 'theme.create.title' })
    }
    return this.context.intl.formatMessage({ id: 'theme.edit.title' }, { name: this.props.currentTheme.content.name })
  }

  getRegardsComponentsKeys = (currentConfiguration) => {
    // Let's generate the theme to execute ours additionals configurations
    const generatedTheme = getMuiTheme(currentConfiguration.mainTheme)
    const customConfiguration = defaultCustomConfiguration(generatedTheme)
    return Object.keys(customConfiguration)
  }

  /**
   * Add a new theme property inside the overall configuration
   */
  handleAddOverwrite = (keys, val, base) => {
    const { configuration } = this.state
    // Hope we will never see a dot inside the theme property
    const confToAdd = set({}, keys.join('.'), val)
    let updatedConf = cloneDeep(configuration)
    updatedConf = merge(updatedConf, confToAdd)
    this.setState({
      configuration: updatedConf,
      lastRefresh: Date.now(),
    })
  }

  /**
   * Remove a theme property inside the overall configuration
   */
  handleRemoveOverwrite = (keys) => {
    const { configuration } = this.state
    const updatedConf = cloneDeep(configuration)
    const propertyToRemove = keys.pop()
    // Hope we will never see a dot inside the theme property
    const pathToAlteredObject = keys.join('.')
    const objectToAlter = cloneDeep(get(updatedConf, pathToAlteredObject))
    delete objectToAlter[propertyToRemove]
    set(updatedConf, pathToAlteredObject, objectToAlter)
    this.setState({
      configuration: updatedConf,
      lastRefresh: Date.now(),
    })
  }

  /**
   * Reset the configuration to a previous state
   * (on creation = baseTheme, edition = currentTheme)
   */
  handleResetOverwrite = (keys) => {
    const { configuration, initialConfiguration } = this.state
    const updatedConf = cloneDeep(configuration)
    const previousObjectConf = cloneDeep(get(initialConfiguration, keys.join('.')))
    const propertyToReset = keys.pop()
    // Hope we will never see a dot inside the theme property
    const pathToAlteredObject = keys.join('.')
    const objectToAlter = cloneDeep(get(updatedConf, pathToAlteredObject))
    if (isUndefined(previousObjectConf)) {
      console.error("Didn't exist before, removing")
      delete objectToAlter[propertyToReset]
    } else {
      console.error('retrieve an old value, patching')
      set(objectToAlter, propertyToReset, previousObjectConf)
    }
    set(updatedConf, pathToAlteredObject, objectToAlter)
    this.setState({
      configuration: updatedConf,
      lastRefresh: Date.now(),
    })
  }

  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentTheme } = this.props
      const currentConfiguration = currentTheme.content.configuration
      const customConfigurationKeys = this.getRegardsComponentsKeys(currentConfiguration)

      this.props.initialize({
        active: currentTheme.content.active,
      })
      this.setState({
        initialConfiguration: currentConfiguration,
        configuration: currentConfiguration,
        lastRefresh: Date.now(),
        customConfigurationKeys,
      })
    } else {
      this.props.initialize({
        active: false,
      })
    }
  }


  /**
   *  Add to the alteration of the theme (=> its configuration) the base theme the user selected
   */
  handleSelectBaseTheme = (event, index, value) => {
    const { configuration } = this.state
    let updatedConf = merge(configuration, {
      mainTheme: value === ThemeFormComponent.DARK_THEME ? darkBaseTheme : lightBaseTheme,
    })
    delete updatedConf.mainTheme.themeName
    // Let's generate the theme to execute ours additionals configurations
    const generatedTheme = getMuiTheme(updatedConf.mainTheme)
    const customConfigurationKeys = this.getRegardsComponentsKeys(generatedTheme)

    updatedConf = merge(
      updatedConf,
      {
        // add our alternative theme
        alternativeTheme: {},
      },
    )
    this.setState({
      lastRefresh: Date.now(),
      configuration: updatedConf,
      initialConfiguration: updatedConf,
      customConfigurationKeys,
      value,
    })
  }

  sendForm = (values) => {
    const { isCreating, currentTheme } = this.props
    const { configuration } = this.state
    const result = {
      ...values,
      configuration,
    }
    if (!isCreating) {
      result.id = currentTheme.content.id
      result.name = currentTheme.content.name
    }
    this.props.onSubmit(result)
  }

  render() {
    const {
      pristine, submitting, isCreating,
    } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.sendForm)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={isCreating}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'theme.form.name' })}
                validate={nameValidators}
                normalize={trim}
                disabled={!isCreating}
              />
              <SelectField
                floatingLabelText={this.context.intl.formatMessage({ id: 'theme.form.baseTheme' })}
                value={this.state.value}
                onChange={this.handleSelectBaseTheme}
              >
                <MenuItem value={ThemeFormComponent.UNDEFINED_THEME} primaryText="" />
                <MenuItem value={ThemeFormComponent.LIGHT_THEME} primaryText="Light" />
                <MenuItem value={ThemeFormComponent.DARK_THEME} primaryText="Dark" />
              </SelectField>
            </ShowableAtRender>
            <Field
              name="active"
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'theme.form.active' })}
            />
            <ShowableAtRender show={!isEmpty(this.state.configuration)}>
              <ThemeEditor
                overwrites={this.state.configuration}
                customConfigurationKeys={this.state.customConfigurationKeys}
                handleAddOverwrite={this.handleAddOverwrite}
                handleRemoveOverwrite={this.handleRemoveOverwrite}
                handleResetOverwrite={this.handleResetOverwrite}
                hackingKey={this.state.lastRefresh}
              />
            </ShowableAtRender>

          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'theme.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={(isCreating && pristine) || submitting}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'theme.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'model-form',
})(ThemeFormComponent)
