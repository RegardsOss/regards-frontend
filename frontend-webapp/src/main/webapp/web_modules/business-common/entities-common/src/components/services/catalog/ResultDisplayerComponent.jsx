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
import { FileContentDisplayer } from '@regardsoss/components'

/**
* Displays a catalog plugin service result file
* @author Raphaël Mechali
*/
class ResultDisplayerComponent extends React.Component {

  static propTypes = {
    // The file: not required (if the is nothing, the displayer will show a simple message)
    file: PropTypes.shape({
      // file content (maybe string or binary resolved)
      content: PropTypes.instanceOf(Blob).isRequired,
      contentType: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { file } = this.props
    return (
      <FileContentDisplayer file={file} />
    )
  }
}
export default ResultDisplayerComponent
