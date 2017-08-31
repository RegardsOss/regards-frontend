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
 * */
import map from 'lodash/map'
import join from 'lodash/join'
import split from 'lodash/split'
import Badge from 'material-ui/Badge'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Help from 'material-ui/svg-icons/action/help'
import { Checkbox as BasicRenderCheckbox } from 'redux-form-material-ui'
import { Field as BasicField } from 'redux-form'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  RenderTextField,
  RenderSelectField,
  Field,
  reduxForm,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import ContainerShape from '../model/ContainerShape'
import ContainerTypes from '../default/ContainerTypes'

const labelStyle = { width: '100%' }
const dynamicContentWrapperStyle = { display: 'flex' }
const buttonStyle = { marginTop: 20 }
const checkboxStyle = { marginTop: 15 }
const badgeStyle = { paddingLeft: 0 }
const badgeBadgeStyle = { top: 20 }
const smallIconStyle = {
  width: 20,
  height: 20,
}
const classesFormat = (values, name) => join(values, ',')
const classesParse = (value, name) => split(value, ',')

/**
 * React container to edit a container configuration
 */
class ContainerConfigurationComponent extends React.Component {

  static propTypes = {
    container: ContainerShape,
    hideDynamicContentOption: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,

    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static defaultProps = {
    hideDynamicContentOption: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    advanced: false,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  onAdvancedClick = () => {
    this.setState({
      advanced: !this.state.advanced,
    })
  }

  handleInitialize = () => {
    this.props.initialize({ ...this.props.container })
  }

  selectContainerType = (event, index, value, input) => {
    input.onChange(value)
  }

  renderDynamicContent = () => {
    const { muiTheme, intl: { formatMessage } } = this.context

    if (!this.props.hideDynamicContentOption) {
      return (
        <div style={dynamicContentWrapperStyle}>
          <Badge
            style={badgeStyle}
            badgeStyle={badgeBadgeStyle}
            badgeContent={<IconButton
              tooltip={formatMessage({ id: 'container.form.dynamicContent.info' })}
              tooltipPosition="top-right"
              iconStyle={smallIconStyle}
            >
              <Help color={muiTheme.palette.disabledColor} />
            </IconButton>}
          >
            <BasicField
              name="dynamicContent"
              style={checkboxStyle}
              component={BasicRenderCheckbox}
              label={formatMessage({ id: 'container.form.dynamicContent' })}
              labelStyle={labelStyle}
            />
          </Badge>
        </div>
      )
    }
    return null
  }

  render() {
    const { pristine, submitting, container, handleSubmit, onSubmit, onCancel } = this.props
    const { intl: { formatMessage } } = this.context
    const { advanced } = this.state
    const iconToggleAdvanced = advanced ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Field
            name="id"
            fullWidth
            component={RenderTextField}
            type="text"
            disabled={container !== null}
            label={formatMessage({ id: 'container.form.id' })}
            validate={ValidationHelpers.required}
          />
          <Field
            name="type"
            fullWidth
            component={RenderSelectField}
            type="text"
            onSelect={this.selectContainerType}
            label={formatMessage({ id: 'container.form.type' })}
            validate={ValidationHelpers.required}
          >
            {map(ContainerTypes, (type, typeName) => (
              <MenuItem
                value={typeName}
                key={typeName}
                primaryText={typeName}
              />
            ))}
          </Field>
          {this.renderDynamicContent()}
          <ShowableAtRender
            show={advanced}
          >
            <Field
              name="classes"
              format={classesFormat}
              parse={classesParse}
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'container.form.classes' })}
            />
            <Field
              name="styles"
              format={JSON.stringify}
              parse={JSON.parse}
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'container.form.styles' })}
            />
          </ShowableAtRender>
          <RaisedButton
            label={formatMessage({ id: 'container.form.advanced.mode' })}
            primary
            icon={iconToggleAdvanced}
            onTouchTap={this.onAdvancedClick}
            style={buttonStyle}
          />
          <CardActionsComponent
            mainButtonLabel={
              formatMessage({
                id: container ? 'container.form.update.button' : 'container.form.submit.button',
              })
            }
            mainButtonType="submit"
            isMainButtonDisabled={pristine || submitting}
            secondaryButtonLabel={formatMessage({ id: 'container.form.cancel.button' })}
            secondaryButtonTouchTap={onCancel}
          />
        </div>
      </form>
    )
  }

}

const UnconnectedContainerConfigurationComponent = ContainerConfigurationComponent
export {
  UnconnectedContainerConfigurationComponent,
}


export default reduxForm({
  form: 'edit-layout-container-form',
})(ContainerConfigurationComponent)
