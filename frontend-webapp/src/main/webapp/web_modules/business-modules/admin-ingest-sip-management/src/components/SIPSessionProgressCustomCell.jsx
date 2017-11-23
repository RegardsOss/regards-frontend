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
import { themeContextType } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'

class SIPSessionProgressCustomCell extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    sessions: PropTypes.objectOf(IngestShapes.IngestSession),
    entity: IngestShapes.IngestSession,
    step: PropTypes.string,
  }

  render() {
    const { moduleTheme: { sip: { session: { bars } } } } = this.context
    const session = this.props.sessions[this.props.entity.content.id]
    const { step } = this.props
    const progress = session.content[`${step}SipsCount`]
    const total = session.content.sipsCount

    return (
      <div style={{ ...bars.borderStyle, ...bars[step].borderStyle }}>
        <div
          style={{
            ...bars.barStyle,
            ...bars[step].backgroundStyle,
            ...{ width: `${progress / total * 100}%` },
          }}
        >
          <div style={bars.interiorStyle}>
            {progress} / {total}
          </div>
        </div>
      </div>
    )
  }
}

export default SIPSessionProgressCustomCell
