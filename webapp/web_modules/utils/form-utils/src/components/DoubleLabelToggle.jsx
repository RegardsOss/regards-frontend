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
import Toggle from 'material-ui/Toggle'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../styles'

/**
 * Material-UI extension of the "Toggle" component, allowing to add extra left and right labels
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
class DoubleLabelToggle extends React.Component {
  static propTypes = {
    rightLabel: PropTypes.string.isRequired,
    leftLabel: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { rightLabel, leftLabel, ...rest } = this.props
    const { moduleTheme: { doubleLabelToggleStyles } } = this.context
    return (
      <div style={doubleLabelToggleStyles.wrapper}>
        <span>
          {leftLabel}
        </span>
        <Toggle
          {...rest}
        />
        <span style={doubleLabelToggleStyles.rightLabel}>
          {rightLabel}
        </span>
      </div>
    )
  }
}

export default withModuleStyle(styles)(DoubleLabelToggle)
