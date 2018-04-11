/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LoadingComponent } from '@regardsoss/display-control'
import ReactTransitionGroup from 'react-transition-group'
import { MakesFade } from './transitions/MaterialDesignMotions'

class ShowableAtLoad extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoading, children } = this.props
    const loadingComponent = <MakesFade><LoadingComponent /></MakesFade>
    const notLoadingContent = React.createElement(MakesFade, null, children)

    return (
      <div>
        <ReactTransitionGroup>
          {isLoading ? loadingComponent : null}
        </ReactTransitionGroup>
        <ReactTransitionGroup>
          {!isLoading ? notLoadingContent : null}
        </ReactTransitionGroup>
      </div>
    )
  }
}

export default ShowableAtLoad
