/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import styles from './styles'

/**
 * Loading picture placeholder for pictures that are not loaded yet
 *
 * @author Raphaël Mechali
 */
export class LoadingPicturePlaceholder extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { style: userStyle } = this.props
    const { moduleTheme: { placeholderURLIconStyle } } = this.context

    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const renderStyle = { // eslint wont fix: user props and context merged (only available in render)
      ...placeholderURLIconStyle,
      ...userStyle,
    }

    return (
      <div style={renderStyle} />
    )
  }
}

export default withModuleStyle(styles)(LoadingPicturePlaceholder)
