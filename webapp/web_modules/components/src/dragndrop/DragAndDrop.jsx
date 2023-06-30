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

import FileUpload from 'mdi-material-ui/FileUploadOutline'
import { withResourceDisplayControl } from '@regardsoss/display-control'

/**
  * DragAndDrop component
  * @author Théo Lasserre
  */
export class DragAndDrop extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object.isRequired,
    handleDrop: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  state = {
    dragging: false,
  }

  dropRef = React.createRef()

  componentDidMount() {
    this.dragCounter = 0
    const div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount() {
    const div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter += 1
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true })
    }
  }

  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter -= 1
    if (this.dragCounter > 0) return
    this.setState({ dragging: false })
  }

  handleDrop = (e) => {
    const {
      handleDrop,
    } = this.props
    e.preventDefault()
    e.stopPropagation()
    this.setState({ dragging: false })
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }

  render() {
    const {
      title, subtitle, style, children,
    } = this.props
    return (
      <div
        ref={this.dropRef}
      >
        {this.state.dragging
          && <div
            style={style.dropDivStyle}
          >
            <div
              style={style.dropTextStyle}
            >
              <FileUpload style={style.dropIconStyle} />
              <div>
                <div style={style.dropTitleStyle}>{title}</div>
                <div style={style.dropSubtitleStyle}>{subtitle}</div>
              </div>

            </div>
          </div>}
        {children}
      </div>
    )
  }
}

export default withResourceDisplayControl(DragAndDrop)
