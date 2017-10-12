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
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'

/**
* Presents a dynamic module. XXX-V2 merge with DynamicModule
* @author Raphaël Mechali
*/
class DynamicModuleImpl extends React.Component {

  static propTypes = {
    // module title component
    title: PropTypes.node.isRequired,
    // module title bar options
    options: PropTypes.arrayOf(PropTypes.node),
    // toggle expand callback
    onExpandChange: PropTypes.func.isRequired,
    // is expanded?
    expanded: PropTypes.bool,
    // used to create callback on main module area
    onKeyPress: PropTypes.func,
    // children here are the module content (none, one many)
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { title, options, children, onExpandChange, expanded, onKeyPress } = this.props
    const { moduleTheme: { module: { cardHeaderStyle, cardHeaderContentStyle, titleBarDivStyle,
      titleDivStyle, optionsDivStyle } } } = this.context
    return (
      <Card
        onExpandChange={onExpandChange}
        expanded={expanded}
      >
        <CardHeader
          style={cardHeaderStyle}
          textStyle={cardHeaderContentStyle}
          title={/* render title and options on the title bar */
            <div style={titleBarDivStyle}>
              <div style={titleDivStyle}>
                {title}
              </div>
              <div style={optionsDivStyle}>
                {options}
              </div>
            </div>
          }
          showExpandableButton
        />
        <CardMedia expandable onKeyPress={onKeyPress}>
          {children}
        </CardMedia>
      </Card>
    )
  }
}
export default DynamicModuleImpl
