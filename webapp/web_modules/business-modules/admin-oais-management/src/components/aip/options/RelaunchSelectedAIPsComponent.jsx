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
import RelaunchOnAllIcon from 'material-ui/svg-icons/action/autorenew'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Component to relaunch selected AIPs
 * @author Picart Kévin
 */
class RelaunchSelectedAIPsComponent extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onRelaunch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { disabled, onRelaunch } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FlatButton
        label={formatMessage({ id: 'oais.button.relaunch-all.label' })}
        title={formatMessage({ id: 'oais.button.relaunch-all.title' })}
        icon={<RelaunchOnAllIcon />}
        disabled={disabled}
        onClick={onRelaunch}
      />
    )
  }
}
export default RelaunchSelectedAIPsComponent
