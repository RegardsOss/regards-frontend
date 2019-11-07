/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
/**
 * Switch between the two tables
 * @author Simon MILHAU
 */
class OAISSwitchTables extends React.Component {
  static propTypes = {
    onSwitch: PropTypes.func.isRequired,
    isPackageManagerVisible: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { isPackageManagerVisible, onSwitch } = this.props
    return (
      <React.Fragment>
        <FlatButton
          label={formatMessage({ id: 'oais.button.switch-to.packages' })}
          title={formatMessage({ id: 'oais.button.switch-to.packages-title' })}
          onClick={onSwitch}
          disabled={isPackageManagerVisible}
        />
        <FlatButton
          label={formatMessage({ id: 'oais.button.switch-to.requests' })}
          title={formatMessage({ id: 'oais.button.switch-to.requests-title' })}
          onClick={onSwitch}
          disabled={!isPackageManagerVisible}
        />
      </React.Fragment>
    )
  }
}

export default OAISSwitchTables
