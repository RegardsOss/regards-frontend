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
import get from 'lodash/get'
import { Card, CardText, CardTitle } from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import messages from '../../i18n'
import styles from '../../styles'

/**
* Component to create/edit/diplicate a service plugin configuration
* @author Sébastien Binda
*/
export class ServiceFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    searchEngineConfiguration: CommonShapes.PluginConfiguration,
    backUrl: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { backUrl, mode, searchEngineConfiguration } = this.props
    const { intl: { formatMessage } } = this.context

    const title = mode === 'edit' ?
      formatMessage({ id: 'dataaccess.searchengines.form.edit.title' }, { name: get(searchEngineConfiguration, 'content.label', '<>') }) :
      formatMessage({ id: 'dataaccess.searchengines.form.create.title' })
    const subtitle = mode === 'edit' ?
      formatMessage({ id: 'dataaccess.searchengines.form.edit.subtitle' }) :
      formatMessage({ id: 'dataaccess.searchengines.form.create.subtitle' })
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <CardText />
      </Card>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(ServiceFormComponent))

