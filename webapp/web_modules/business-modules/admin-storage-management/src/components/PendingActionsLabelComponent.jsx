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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import messages from '../i18n'
import styles from '../styles'
/**
 * @author Théo Lasserre
 */
class PendingActionsLabelComponent extends React.Component {
  static propTypes = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { typeStyle } } = this.context
    return (
      <>
        <hr />
        <span style={typeStyle}>{formatMessage({ id: 'storage.location.type.pending.name' })}</span>
        {formatMessage({ id: 'storage.location.type.pending.description' })}
        <hr />
      </>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(PendingActionsLabelComponent))
