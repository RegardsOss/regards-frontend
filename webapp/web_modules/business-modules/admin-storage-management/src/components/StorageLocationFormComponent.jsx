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
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import MoodIcon from 'mdi-material-ui/EmoticonOutline'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { browserHistory } from 'react-router'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CardActionsComponent, NoContentComponent, HelpMessageComponent } from '@regardsoss/components'
import {
  RenderTextField, reduxForm, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { storage } from '@regardsoss/units'
import { StorageDomain } from '@regardsoss/domain'
import { RenderPluginField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { StorageShapes } from '@regardsoss/shape'
import messages from '../i18n'
import styles from '../styles'

/**
* Component to create/edit/diplicate a storage location plugin configuration
* @author Sébastien Binda
*/
const validateName = (value) => value && !/^[a-zA-Z0-9_-]+$/g.test(value)
  ? 'invalid.name.expression' : undefined

class StorageLocationFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    entity: StorageShapes.StorageMonitoring,
    backUrl: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    // from redux form
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static kbUnit = storage.StorageUnitScale.getMatchingUnit('kB')

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    unit: storage.StorageUnitScale.bytesScale.units[2],
  }

  componentDidMount(prevProps) {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { mode, entity, initialize } = this.props
    if (mode === 'edit' && entity) {
      initialize({
        name: get(entity, 'content.name'),
        allocatedSize: get(entity, 'content.configuration.allocatedSizeInKo') ? this.calculateUnitAndReturnValue(entity.content.configuration.allocatedSizeInKo) : null,
        pluginConfiguration: get(entity, 'content.configuration.pluginConfiguration'),
      })
    }
  }

  getAllocatedSizeInKo = (value) => {
    if (isNil(value)) {
      return null
    }
    const kbValue = new storage.StorageCapacity(parseFloat(value), this.state.unit).convert(StorageLocationFormComponent.kbUnit).value
    // truncate value at 3 decimal then round value
    return Math.round(kbValue)
  }

  calculateUnitAndReturnValue = (value) => {
    if (isNil(value)) {
      return null
    }
    const capacity = new storage.StorageCapacity(value, StorageLocationFormComponent.kbUnit).scaleAndConvert(storage.StorageUnitScale.bytesScale)
    this.setState({ unit: capacity.unit })
    const floatValue = capacity.value
    // truncate value at 3 decimal
    return Math.round(floatValue * 1000) / 1000
  }

  onBack = () => {
    const { backUrl } = this.props
    browserHistory.push(backUrl)
  }

  /**
   * Update a storageLocationConf entity from the given updated PluginConfiguration.
   */
  updateStorageLocationConf = (fields) => {
    const { onUpdate, entity } = this.props
    const pluginConfiguration = fields.pluginConfiguration ? {
      ...PluginFormUtils.formatPluginConf(fields.pluginConfiguration),
    } : null
    const storageLocationConfToUpdate = {
      name: get(entity, 'content.name'),
      configuration: {
        ...get(entity, 'content.configuration', {}),
        allocatedSizeInKo: this.getAllocatedSizeInKo(fields.allocatedSize),
        pluginConfiguration,
      },
    }
    onUpdate(get(entity, 'content.name'), storageLocationConfToUpdate).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  /**
   * Create a storageLocationConf entity from the given updated PluginConfiguration.
   */
  createStorageLocationConf = (fields) => {
    const { onCreate } = this.props
    const pluginConf = fields.pluginConfiguration ? fields.pluginConfiguration : null
    const formatedPluginConf = PluginFormUtils.formatPluginConf(pluginConf)
    const storageLocationConf = {
      name: fields.name,
      configuration: {
        allocatedSizeInKo: this.getAllocatedSizeInKo(fields.allocatedSize),
        pluginConfiguration: formatedPluginConf,
      },
    }
    onCreate(storageLocationConf).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  changeUnit = (event, index, unit) => {
    this.setState({ unit })
  }

  renderUnits = () => (
    <DropDownMenu value={this.state.unit} onChange={this.changeUnit}>
      {map(storage.StorageUnitScale.bytesScale.units.slice(2), (u) => <MenuItem
        key={u.symbol}
        value={u}
        primaryText={<storage.FormattedStorageUnit unit={u} />}
      />,
      )}
    </DropDownMenu>
  )

  renderContent = () => {
    const { mode, entity } = this.props
    const { intl: { formatMessage } } = this.context
    const pluginType = StorageDomain.PluginTypeEnum.STORAGE
    const allocatedSizeStyle = { width: '120px' }
    const unitsStyle = { display: 'inline-block', marginTop: '8px' }
    if (mode !== 'create' && !entity) {
      return (
        <NoContentComponent
          titleKey="storage.location.form.invalid.id"
          Icon={MoodIcon}
        />
      )
    }
    return (
      <div>
        <Field
          name="name"
          fullWidth
          component={RenderTextField}
          type="text"
          value=""
          label={formatMessage({ id: 'storage.location.form.name.label' })}
          validate={validateName}
          disabled={mode !== 'create'}
        />
        <div>
          <Field
            name="allocatedSize"
            component={RenderTextField}
            label={formatMessage({ id: 'storage.location.form.allocated-size.label' })}
            validate={ValidationHelpers.javaDoubleValidator}
            style={allocatedSizeStyle}
          />
          <div style={unitsStyle}>
            {this.renderUnits()}
          </div>
        </div>
        <Field
          key="storagePlugin"
          name="pluginConfiguration"
          component={RenderPluginField}
          defaultPluginConfLabel={get(entity, 'content.name')}
          selectLabel={formatMessage({ id: 'storage.location.form.plugin.label' })}
          pluginType={pluginType}
          microserviceName={STATIC_CONF.MSERVICES.STORAGE}
          hideDynamicParameterConf
          hideGlobalParameterConf
        />
      </div>
    )
  }

  render() {
    const {
      backUrl, handleSubmit, entity, mode,
      pristine, invalid,
    } = this.props

    let onSubmitAction
    if (mode === 'create') {
      onSubmitAction = this.createStorageLocationConf
    } else {
      onSubmitAction = get(entity, 'content.configuration.id') ? this.updateStorageLocationConf : this.createStorageLocationConf
    }

    const { intl: { formatMessage }, moduleTheme } = this.context

    const title = mode === 'edit'
      ? formatMessage({ id: 'storage.location.form.edit.title' }, { name: get(entity, 'content.name') })
      : formatMessage({ id: 'storage.location.form.create.title' })
    const buttonTitle = mode === 'edit'
      ? formatMessage({ id: 'storage.location.form.submit.edit.button' })
      : formatMessage({ id: 'storage.location.form.submit.button' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={formatMessage({ id: 'storage.location.form.subtitle' })}
        />
        <form onSubmit={handleSubmit(onSubmitAction)}>
          <CardText style={moduleTheme.root}>
            <HelpMessageComponent message={formatMessage({ id: 'storage.location.form.help-message' })} />
            {this.renderContent()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={buttonTitle}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || invalid}
              secondaryButtonLabel={formatMessage({ id: 'storage.location.form.back.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'storage-form',
})(StorageLocationFormComponent)
export default withModuleStyle(styles)(withI18n(messages)(connectedReduxForm))
