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
import { Subheader } from 'material-ui'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LoadingPaneComponent } from '@regardsoss/components'

/**
 * Service graphical component
 * @author Raphaël Mechali
 */
class ServiceComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    headerMessage: PropTypes.string.isRequired,
    builtObjectsMessage: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { loading, headerMessage, builtObjectsMessage } = this.props
    const { moduleTheme } = this.context
    const { intl: { formatMessage } } = this.context
    return (
      <React.Fragment>
        {/* Header message */}
        <Subheader>
          {headerMessage}
        </Subheader>
        { /* Loading or result */
          loading
            ? <LoadingPaneComponent title={formatMessage({ id: 'first.service.loading.message' })} />
            : <div style={moduleTheme.serviceMessage}>
              { builtObjectsMessage || formatMessage({ id: 'first.service.no.result.message' }) }
            </div>
        }
      </React.Fragment>
    )
  }
}
export default ServiceComponent
