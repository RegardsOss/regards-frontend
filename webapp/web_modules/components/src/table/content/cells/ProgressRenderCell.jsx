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
import { themeContextType } from '@regardsoss/theme'

class ProgressRenderCell extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.any.isRequired,
    // Returns progress in 0 - 100. (entity) => number
    getProgressPercent: PropTypes.func.isRequired,
    // Returns progress formatted label (optionnal). (entity) => string
    getProgressLabel: PropTypes.func,
  }

  render() {
    const { moduleTheme: { progressBar } } = this.context
    // const progress = this.props.entity.content[`${step}SipsCount`]
    // const total = this.props.entity.content.sipsCount
    const { entity, getProgressPercent, getProgressLabel } = this.props
    const label = getProgressLabel ? getProgressLabel(entity) : null
    const progress = getProgressPercent(entity) || 0

    return (
      <div style={progressBar.borderStyle} title={label}>
        <div
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          style={{ // eslint wont fix: a dynamic value must be applied to cell style at runtime (and partially comes from context)
            ...progressBar.barStyle,
            ...progressBar.backgroundStyle,
            ...{ width: `${progress}%` },
          }}
        >
          <div style={progressBar.interiorStyle}>{label}</div>
        </div>
      </div>
    )
  }
}

export default ProgressRenderCell
