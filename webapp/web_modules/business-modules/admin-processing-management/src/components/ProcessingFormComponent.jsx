/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ProcessingDomain, AdminDomain } from '@regardsoss/domain'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import { ProcessingShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import {
  reduxForm, Field, ValidationHelpers, RenderSelectField, RenderCheckbox,
} from '@regardsoss/form-utils'
import get from 'lodash/get'
import map from 'lodash/map'
import MoodIcon from 'mdi-material-ui/EmoticonOutline'
import DetailIcon from 'mdi-material-ui/HelpCircle'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import MenuItem from 'material-ui/MenuItem'
import CardTitle from 'material-ui/Card/CardTitle'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import messages from '../i18n'
import styles from '../styles'

export const FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
}

/**
* Component to create/edit a processing plugin configuration
* @author Théo Lasserre
*/
export class ProcessingFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    processing: ProcessingShapes.Processing,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from redux form
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isHelpUserRoleDialogOpen: false,
  }

  UNSAFE_componentWillMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { mode, processing, initialize } = this.props
    switch (mode) {
      case FORM_MODE.CREATE:
        initialize({
          userRole: AdminDomain.DEFAULT_ROLES_ENUM.PUBLIC,
        })
        break
      case FORM_MODE.EDIT:
        initialize({
          pluginConfiguration: get(processing, 'content.pluginConfiguration'),
          userRole: get(processing, 'content.rights.role', AdminDomain.DEFAULT_ROLES_ENUM.PUBLIC),
          isLinkedToAllDatasets: get(processing, 'content.rights.isLinkedToAllDatasets', false),
        })
        break
      default:
        throw new Error('FORM MODE Unknown')
    }
  }

  renderContent = () => {
    const { mode, processing } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { processingForm: { selectUserRoleDiv, selectUserRoleFieldDiv, helpUserRoleIcon }, iconStyle, buttonStyle },
    } = this.context
    if (mode === FORM_MODE.EDIT && !processing) {
      return (
        <NoContentComponent
          titleKey="processing.form.invalid.id"
          Icon={MoodIcon}
        />
      )
    }
    return (
      [<Field
        key="processingPlugin"
        name="pluginConfiguration"
        component={RenderPluginField}
        selectLabel={formatMessage({ id: 'processing.form.plugin.label' })}
        pluginType={ProcessingDomain.PLUGIN_TYPE}
        validate={ValidationHelpers.required}
        microserviceName={STATIC_CONF.MSERVICES.PROCESSING}
        simpleGlobalParameterConf
      />,
        <div key="selectUserRole" style={selectUserRoleDiv}>
          <div style={selectUserRoleFieldDiv}>
            <Field
              name="userRole"
              component={RenderSelectField}
              type="text"
              label={formatMessage({ id: 'processing.form.select.role' })}
            >
              {map(AdminDomain.DEFAULT_ROLES_ENUM, (value, key) => (
                <MenuItem
                  key={key}
                  value={value}
                  primaryText={value}
                />
              ))}
            </Field>
            <Field
              name="isLinkedToAllDatasets"
              component={RenderCheckbox}
              label={formatMessage({ id: 'processing.form.select.isLinkedToAllDatasets' })}
            />
          </div>
          <div style={helpUserRoleIcon}>
            <IconButton
              className="selenium-edit-detail-role-field"
              title={formatMessage({ id: 'processing.form.list.tooltip.info.button' })}
              iconStyle={iconStyle}
              style={buttonStyle}
              onClick={this.showOrCloseHelpUserRoleDialog}
            >
              <DetailIcon />
            </IconButton>
          </div>
        </div>]
    )
  }

  showOrCloseHelpUserRoleDialog = () => {
    this.setState({
      isHelpUserRoleDialogOpen: !this.state.isHelpUserRoleDialogOpen,
    })
  }

  helpUserRoleDialog = () => {
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <Dialog
        actions={<>
          <FlatButton
            key="close"
            label={formatMessage({ id: 'processing.form.list.tooltip.info.close' })}
            primary
            onClick={this.showOrCloseHelpUserRoleDialog}
          />
        </>}
        title={formatMessage({ id: 'processing.form.select.role' })}
        open={this.state.isHelpUserRoleDialogOpen}
        onRequestClose={this.showOrCloseHelpUserRoleDialog}
      >
        <div style={moduleTheme.rootStyle}>
          <div style={moduleTheme.valueStyle}>
            {formatMessage({ id: 'processing.form.select.role.help' })}
          </div>
        </div>
      </Dialog>
    )
  }

  render() {
    const {
      onSubmit, handleSubmit, processing, mode,
      pristine, invalid, backUrl,
    } = this.props

    const { intl: { formatMessage }, moduleTheme } = this.context

    const buttonTitle = formatMessage({ id: `processing.form.submit.${mode}.button` })
    let title = ''
    let processName = ''
    switch (mode) {
      case FORM_MODE.CREATE:
        title = formatMessage({ id: `processing.form.${mode}.title` })
        break
      case FORM_MODE.EDIT:
        processName = ProcessingDomain.getProcessingName(processing)
        title = formatMessage({ id: `processing.form.${mode}.title` }, { name: processName })
        break
      default:
        throw new Error('FORM MODE Unknown')
    }

    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={formatMessage({ id: 'processing.form.subtitle' })}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardText style={moduleTheme.root}>
            {this.renderContent()}
            {this.helpUserRoleDialog()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={buttonTitle}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || invalid}
              secondaryButtonLabel={formatMessage({ id: 'processing.form.back.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'processing-metadata-conf',
})(ProcessingFormComponent)
export default withModuleStyle(styles)(withI18n(messages)(connectedReduxForm))
