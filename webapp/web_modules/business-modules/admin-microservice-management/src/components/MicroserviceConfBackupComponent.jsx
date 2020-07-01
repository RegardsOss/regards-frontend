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
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import map from 'lodash/map'
import get from 'lodash/get'
import has from 'lodash/has'
import isArray from 'lodash/isArray'
import { CardActionsComponent, ErrorDecoratorComponent } from '@regardsoss/components'
import { reduxForm } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ImportFromFileDialogButton } from '@regardsoss/file-utils'
import CloudDownload from 'mdi-material-ui/CloudDownload'
import CloudUpload from 'mdi-material-ui/CloudUpload'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * Allows to upload and download microservice configuration
 */
export class MicroserviceConfBackupComponent extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    exportUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    isSendingConfiguration: PropTypes.bool.isRequired,
    handleExportFile: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static pluginWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  static styleIcon = {
    height: 108,
    width: 108,
    margin: '30px 0px',
  }

  static styleButton = {
    margin: '30px 0px',
  }

  static contentWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
  }

  state = {
    errors: [],
  }

  handleImportFile = (values) => {
    this.setState({
      errors: [],
    })
    return this.props.handleExportFile(values)
      .then(((result) => {
        if (result.error) {
          const errors = get(result, 'payload.response', [])
          this.setState({
            errors,
          })
        }
        // The code is good (2xx), but in fact only a part of the submitted conf file has been accepted
        if (result.meta.status === 206) {
          const errors = get(result, 'payload', [])
          this.setState({
            errors,
          })
          return {
            ...result,
            error: true,
          }
        }
        return result
      }))
  }

  renderErrors = () => {
    const { errors } = this.state
    if (errors) {
      return (
        <ErrorDecoratorComponent>
          {isArray(errors) && map(errors, (error) => (
            <div key={error.moduleInformation.name}>
              <div>
                {this.context.intl.formatMessage({ id: 'microservice.conf-backup.error.module-conf' })}
                {error.moduleInformation.name}
                (V
                {error.moduleInformation.version}
                )
                <br />
                {this.context.intl.formatMessage({ id: 'microservice.conf-backup.error.only-error' })}
                {error.onlyErrors ? this.context.intl.formatMessage({ id: 'microservice.conf-backup.error.only-error.true' }) : this.context.intl.formatMessage({ id: 'microservice.conf-backup.error.only-error.false' })}
              </div>
              {map(error.importErrors, (importError, i) => (
                <div key={i}>{importError}</div>
              ))}
            </div>
          ))}
          {has(errors, 'messages') && isArray(errors.messages) && map(errors.messages, (error, i) => (
            <div key={i}>
              {error}
            </div>
          ))}
        </ErrorDecoratorComponent>
      )
    }
    return null
  }

  render() {
    const { microserviceName, exportUrl } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'microservice.conf-backup.title' }, { name: microserviceName })}
        />
        <form>
          <CardText>
            {this.renderErrors()}
            <div style={MicroserviceConfBackupComponent.contentWrapper}>

              <div style={MicroserviceConfBackupComponent.pluginWrapper}>
                <CloudUpload style={MicroserviceConfBackupComponent.styleIcon} />
                {this.context.intl.formatMessage({ id: 'microservice.conf-backup.import' })}
                <ImportFromFileDialogButton
                  onImport={this.handleImportFile}
                  onImportSucceed={this.props.handleBack}
                  disableImportButton={this.props.isSendingConfiguration}
                  ignoreErrors
                  style={MicroserviceConfBackupComponent.styleButton}
                />
              </div>

              <div style={MicroserviceConfBackupComponent.pluginWrapper}>
                <CloudDownload style={MicroserviceConfBackupComponent.styleIcon} />
                {this.context.intl.formatMessage({ id: 'microservice.conf-backup.export' })}
                <RaisedButton
                  label={this.context.intl.formatMessage({ id: 'microservice.conf-backup.action.export' })}
                  secondary
                  href={exportUrl}
                  style={MicroserviceConfBackupComponent.styleButton}
                />
              </div>

            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'microservice.conf-backup.action.back' })}
              mainButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

export default reduxForm({
  form: 'microservice-conf-backup-form',
})(MicroserviceConfBackupComponent)
