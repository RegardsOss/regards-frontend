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
import { CardText } from 'material-ui/Card'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import styles from '../../styles'

/**
 * A presentation container for form (in CardText, as it is the most common use case in REGARDS)
 * Note: as it is an HOC, it stack context to let its children render in parent context
 *
 * @author Raphaël Mechali
 */
class FormPresentation extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { children } = this.props
    const { moduleTheme: { formContainer } } = this.context
    return (
      <CardText className={formContainer.class}>
        {HOCUtils.renderChildren(children)}
      </CardText>
    )
  }
}

export default withModuleStyle(styles, true)(FormPresentation)
