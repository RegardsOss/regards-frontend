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
import { themeContextType } from '@regardsoss/theme'
import PageTextCellComponent from './PageTextCellComponent'

/**
 * Page link cell component (displays as a text cell when disabled)
 * @author Raphaël Mechali
 */
class PageLinkCellComponent extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    LinkIconConstructor: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      text, tooltip, LinkIconConstructor, disabled, onClick,
    } = this.props
    const { moduleTheme: { user: { main: { content: { listPage } } } } } = this.context
    if (disabled) {
      // render as simple text (remove icon that expresses action)
      return <PageTextCellComponent text={text} />
    }
    return (
      <div
        title={tooltip}
        onClick={onClick}
        style={listPage.linkAndIconCell}
      >
        <LinkIconConstructor style={listPage.elementIcon} />
        <div style={listPage.linkText}>
          {text}
        </div>
      </div>
    )
  }
}
export default PageLinkCellComponent
