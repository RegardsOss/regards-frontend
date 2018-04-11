/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DefaultIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/display-control'
import NoContentComponent from '../content/NoContentComponent'

/**
* Shows icon and messages for a no content area, shows area otherwise
*/
class NoContentMessageInfo extends React.Component {
  static propTypes = {
    noContent: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    message: PropTypes.node,
    Icon: PropTypes.func,
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    rootStyles: PropTypes.object,
  }

  static defaultProps = {
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      title, message, noContent, Icon, children, rootStyles,
    } = this.props
    return (
      <div style={rootStyles}>
        <ShowableAtRender show={noContent}>
          <NoContentComponent title={title} message={message} Icon={Icon} />
        </ShowableAtRender>
        <ShowableAtRender show={!noContent}>
          {children}
        </ShowableAtRender>
      </div>
    )
  }
}
export default NoContentMessageInfo
