/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import styles from './styles'

/**
 * React component to display a board item.
 * Every BoardItem as a list of BoardAction.
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
class BaseBoardItemComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.element),
    renderConfirmDialog: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      title, subtitle, description, actions,
    } = this.props
    const { moduleTheme: { items, cardActionsStyles } } = this.context

    const keyedActions = map(actions, (action, index) => (HOCUtils.cloneChildrenWith(action, {
      key: index,
    })))

    return (
      <div className={items.classes}>
        {this.props.renderConfirmDialog()}
        <Card
          style={items.styles}
          containerStyle={items.contentStyles}
        >
          <CardTitle
            title={title}
            subtitle={subtitle}
            style={items.titleStyles}
          />
          <CardText>
            {description}
          </CardText>
          <CardActions style={cardActionsStyles}>
            {keyedActions}
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withModuleStyle(styles)(BaseBoardItemComponent)
