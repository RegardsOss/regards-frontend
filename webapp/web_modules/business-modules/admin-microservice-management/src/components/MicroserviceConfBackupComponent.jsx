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
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { reduxForm } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ImportFromFileDialogButton } from '@regardsoss/file-utils'

import CloudDownload from 'mdi-material-ui/CloudDownload'
import CloudUpload from 'mdi-material-ui/CloudUpload'
import RaisedButton from 'material-ui/RaisedButton'


/**
 * Display edit and create ingest processing chain form
 * @author Sébastien Binda
 */
export class MicroserviceConfBackupComponent extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    exportUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
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
            <div style={MicroserviceConfBackupComponent.contentWrapper}>

              <div style={MicroserviceConfBackupComponent.pluginWrapper}>
                <CloudUpload style={MicroserviceConfBackupComponent.styleIcon} />
                {this.context.intl.formatMessage({ id: 'microservice.conf-backup.import' })}
                <ImportFromFileDialogButton
                  onImport={this.props.handleExportFile}
                  onImportSucceed={this.props.handleBack}
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
