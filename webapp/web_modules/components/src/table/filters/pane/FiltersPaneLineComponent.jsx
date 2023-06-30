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
import isEmpty from 'lodash/isEmpty'
import { themeContextType } from '@regardsoss/theme'

/**
 * @author Théo Lasserre
 */
export class FiltersPaneLineComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    multiline: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    additionnalLineStyle: PropTypes.objectOf( // eslint wont fix: broken rule, used in onPropertiesUpdated
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
    additionnalLabelStyle: PropTypes.objectOf( // eslint wont fix: broken rule, used in onPropertiesUpdated
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    additionnalLineStyle: {},
    additionnalLabelStyle: {},
    label: '',
    multiline: false,
  }

  render() {
    const {
      label, children, additionnalLineStyle, additionnalLabelStyle, multiline,
    } = this.props
    const {
      moduleTheme: {
        searchPane: {
          childrenStyles: {
            mainLineDivStyle, mainMultilineDivStyle, multilineDivStyle, filterLabelStyle,
            lineDivStyle,
          },
        },
      },
    } = this.context
    const mainStyle = multiline ? mainMultilineDivStyle : mainLineDivStyle
    const fieldStyle = multiline ? multilineDivStyle : lineDivStyle
    return (
      <div style={{ ...mainStyle, ...additionnalLineStyle }}>
        {
          !isEmpty(label)
            && <div style={{ ...filterLabelStyle, ...additionnalLabelStyle }}>
              {label}
            </div>
        }
        <div style={fieldStyle}>{children}</div>
      </div>
    )
  }
}
export default FiltersPaneLineComponent
