/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Material-UI extension of the "Toggle" component, allowing to add extra left and right labels
 *
 * @author Xavier-Alexandre Brochard
 */
const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  rightLabel: {
    marginLeft: 10,
  },
  leftLabel: {},
}

const DoubleLabelToggle = ({
  rightLabel,
  leftLabel,
  ...rest
}) => (
  <div style={styles.wrapper}>
    <span style={styles.leftLabel}>
      {leftLabel}
    </span>
    <Toggle
      {...rest}
    />
    <span style={styles.rightLabel}>
      {rightLabel}
    </span>
  </div>
)

DoubleLabelToggle.propTypes = {
  rightLabel: PropTypes.string.isRequired,
  leftLabel: PropTypes.string.isRequired,
}

export default DoubleLabelToggle
