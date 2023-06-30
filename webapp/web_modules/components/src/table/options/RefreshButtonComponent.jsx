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
import FlatButton from 'material-ui/FlatButton'
import Refresh from 'mdi-material-ui/Refresh'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Refresh button component
 * @author Raphaël Mechali
 */
class RefreshButtonComponent extends React.Component {
  static propTypes = {
    canFetch: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { canFetch, onRefresh } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FlatButton
        icon={<Refresh />}
        label={formatMessage({ id: 'table.option.refresh.label' })}
        title={formatMessage({ id: 'table.option.refresh.tooltip' })}
        disabled={!canFetch}
        onClick={onRefresh}
        style={{
          backgroundColor: 'rgb(255, 109, 0)',
          borderRadius: '2px',
          border: 'none',
          marginTop: '2px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
        }}
      />
    )
  }
}
export default RefreshButtonComponent
