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
 * Component to display a sub section into a form associated to the upper field.
 * This widget display the given children into a section with a top arrow.
 */
export class SubSectionCard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    marginLeft: PropTypes.number, // Section left margin. Defautl value : 15
    arrowMarginLeft: PropTypes.number, // Top arrow left margin from border. Default value : 10.
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    marginLeft: 15,
    arrowMarginLeft: 10,
  }

  static contextTypes = {
    ...themeContextType,
  }

  UNSAFE_componentWillMount() {
    const { moduleTheme: { subSection } } = this.context
    this.pointerStyle = { ...subSection.pointerStyle, marginLeft: `${this.props.marginLeft + this.props.arrowMarginLeft}px` }
    this.sectionStyle = { ...subSection.sectionStyle, marginLeft: `${this.props.marginLeft}px` }
    this.titleStyle = subSection.titleStyle
  }

  render() {
    return (
      <div>
        <div id="subsectionCardTopArrow" style={this.pointerStyle} />
        <div id="subsection-card" style={this.sectionStyle}>
          {this.props.title ? <div id="subsection-card-title" style={this.titleStyle}>{this.props.title}</div> : null}
          <div id="subsection-card-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default withModuleStyle(styles, true)(SubSectionCard)
