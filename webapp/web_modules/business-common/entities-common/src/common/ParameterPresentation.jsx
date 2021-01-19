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
import HelpCircle from 'mdi-material-ui/HelpCircle'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../styles'
import messages from '../i18n'
/**
* Component to display persentation of a dynamic parameter during service application
* @author Sébastien Binda
*/
class ParameterPresentation extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    descriptionOpened: false,
  }

  handleCloseDescription = () => {
    this.setState({ descriptionOpened: false })
  }

  handleOpenDescription = () => {
    this.setState({ descriptionOpened: true })
  }

  renderDescriptionDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { label, description } = this.props
    return (
      <Dialog
        title={formatMessage({ id: 'entities.common.services.parameter.description.dialog.title' }, { parameter: label })}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'entities.common.services.parameter.description.dialog.close' })}
            primary
            onClick={this.handleCloseDescription}
          />
        </>}
        modal
        open={this.state.descriptionOpened}
      >
        {description}
      </Dialog>
    )
  }

  render() {
    const { description, children } = this.props
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.pluginServiceDialog.parameterPresentation}>
        {children}
        {description
          ? <IconButton
              style={moduleTheme.pluginServiceDialog.parameterDescriptionIcon}
              onClick={this.handleOpenDescription}
          >
            <HelpCircle />
          </IconButton>
          : null}
        {description ? this.renderDescriptionDialog() : null}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(ParameterPresentation))
