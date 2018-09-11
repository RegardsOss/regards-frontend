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
import { AccessShapes } from '@regardsoss/shape'
import RaisedButton from 'material-ui/RaisedButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import Reset from 'material-ui/svg-icons/action/settings-backup-restore'
import { Container } from '@regardsoss/layout'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Shows form layout and receives onExpandChange from the dynamic module
 * @author Raphaël Mechali
 */
class FormLayout extends React.Component {
  static propTypes = {
    layout: AccessShapes.ContainerContent.isRequired,
    plugins: AccessShapes.UIPluginConfArray,
    pluginsProps: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      getDefaultState: PropTypes.func.isRequired,
      savePluginState: PropTypes.func.isRequired,
    }),
    onSearch: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      onClearAll, onSearch, layout, plugins, pluginsProps,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <React.Fragment>
        <Container
          appName="user"
          container={layout}
          plugins={plugins}
          pluginProps={pluginsProps}
          formHeader
        />
        <div
          style={moduleTheme.user.buttonsContainer}
        >
          <RaisedButton
            label={formatMessage({ id: 'form.reset.button.label' })}
            icon={<Reset />}
            style={this.context.moduleTheme.user.resetButton}
            onClick={onClearAll}
          />
          <RaisedButton
            label={formatMessage({ id: 'form.search.button.label' })}
            primary
            icon={<SearchIcon />}
            style={this.context.moduleTheme.user.searchButton}
            onClick={onSearch}
          />
        </div>
      </React.Fragment>
    )
  }
}
export default FormLayout
