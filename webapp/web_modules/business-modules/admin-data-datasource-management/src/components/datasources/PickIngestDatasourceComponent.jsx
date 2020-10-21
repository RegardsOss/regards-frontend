/**
* Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import { themeContextType } from '@regardsoss/theme'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import FileImport from 'mdi-material-ui/FileImport'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * React component to pick the type of datasource
 */

export class PickIngestDatasourceComponent extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      url,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { pickDatsource: { styleIcon, styleButton, pluginWrapper } },
    } = this.context
    return (
      <div style={pluginWrapper}>
        <FileImport style={styleIcon} />
        {formatMessage({ id: 'datasource.form.create.pick-interface.description.aip' })}
        <Link to={url}>

          <RaisedButton
            label={formatMessage({ id: 'datasource.form.create.pick-interface.action.select' })}
            secondary
            style={styleButton}
          />
        </Link>
      </div>
    )
  }
}

export default withResourceDisplayControl(PickIngestDatasourceComponent)
