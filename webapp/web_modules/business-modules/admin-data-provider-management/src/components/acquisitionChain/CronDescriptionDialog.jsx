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
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton'
import { MarkdownFileContentDisplayer } from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../../styles'
import messages from '../../i18n'

/**
* Dialog to display markdown description of cron expression expected format.
* @author Sébastien Binda
*/
class CronDescriptionDialog extends React.Component {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static markdown = `
  # Format : 
    ss mm hh dd MMM JJJ 
  - ss : seconds (0)
  - mm : minutes (0 - 59)
  - hh : hours (0 - 23)
  - dd : day of the month (1 - 31)
  - MMM : month (1-12)
  - DDD : day of the week (1-7)
    
  Note : seconds can not be other value than 0.
  # Special caracters :
  - \\* : Any value. \\* for mm means every minute.
  - / : Create steps. Exemple */5 = every 5
  - \\- : Create a range of values. 0,5 means 0 or 5.
  # Some exemples :
  ## Every day, 5 minutes after midnight
  0 5 0 * * *
  # First day of each month at 14h15
  0 15 14 1 * *
  # Every day of the week at 22h
  0 0 22 * * 1-5
  `

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { onClose, opened } = this.props

    const {
      moduleTheme: { markdownDialog },
      intl: { formatMessage },
    } = this.context

    return (
      <Dialog
        title={formatMessage({ id: 'acquisition-chain.form.general.section.cron.description.title' })}
        modal={false}
        actions={
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'acquisition-chain.form.general.section.cron.description.close' })}
            primary
            onClick={onClose}
          />
        }
        open={opened}
        onRequestClose={onClose}
        bodyStyle={markdownDialog.bodyStyle}
        contentStyle={markdownDialog.dialogContent}
        style={markdownDialog.dialogRoot}
        repositionOnUpdate={false}
      >
        <MarkdownFileContentDisplayer
          style={markdownDialog.markdownView}
          source={CronDescriptionDialog.markdown}
        />
      </Dialog>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(CronDescriptionDialog))
