/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton'
import { MarkdownFileContentDisplayer } from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import styles from '../styles'
import messages from '../i18n'

/**
* Dialog to display markdown description of a plugin.
* @author Sébastien Binda
*/
class PluginDescriptionDialog extends React.Component {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    pluginMetaData: CommonShapes.PluginMetaDataContent.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { pluginMetaData, onClose, opened } = this.props

    const {
      moduleTheme: { markdownDialog },
      intl: { formatMessage },
    } = this.context

    return (
      <Dialog
        title={formatMessage(
          { id: 'plugin.configuration.form.description.title' },
          { plugin: pluginMetaData.pluginId })}
        modal={false}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'plugin.parameter.description.dialog.close' })}
            primary
            onClick={onClose}
          />
        </>}
        open={opened}
        onRequestClose={onClose}
        bodyStyle={markdownDialog.bodyStyle}
        contentStyle={markdownDialog.dialogContent}
        style={markdownDialog.dialogRoot}
        repositionOnUpdate={false}
      >
        <MarkdownFileContentDisplayer
          style={markdownDialog.markdownView}
          source={pluginMetaData.userMarkdown}
        />
      </Dialog>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(PluginDescriptionDialog))
