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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { MarkdownFileContentDisplayer } from '@regardsoss/components'

import styles from '../../styles'

/**
 * Display markdown plugin catalog service description
 */
class ServideDescriptionComponent extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { description: { markdownView } } } = this.context
    const { description } = this.props
    return (<MarkdownFileContentDisplayer
      style={markdownView}
      source={description}
    />)
  }
}

export default withModuleStyle(styles)(ServideDescriptionComponent)
