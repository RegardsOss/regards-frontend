/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import IFrameURLContentDisplayer from '../content/preview/IFrameURLContentDisplayer'
import LoadableContentDialogContainer from './LoadableContentDialogContainer'
import styles from './styles'

/**
 * Loadable content dialog showing only one content with its URL
 */
export class SingleContentURLDialogContainer extends React.Component {
  static propTypes = {
    contentURL: CommonShapes.URL.isRequired,
    open: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }

  componentWillReceiveProps({ contentURL: nextURL }) {
    const { contentURL } = this.props
    if (nextURL !== contentURL) {
      this.setState({ loaded: false })
    }
  }

  onContentLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    const {
      contentURL, open, dialogWidthPercent, dialogHeightPercent, loadingMessage, ...otherDialogProps
    } = this.props
    const { loaded } = this.state
    const { moduleTheme: { urlContentDialog } } = this.context

    return (
      <LoadableContentDialogContainer
        loaded={loaded}
        open={open}
        loadingMessage={loadingMessage}
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        bodyStyle={urlContentDialog.bodyStyle}
        {...otherDialogProps}
      >
        <IFrameURLContentDisplayer contentURL={contentURL} onContentLoaded={this.onContentLoaded} />
      </LoadableContentDialogContainer>
    )
  }
}

export default withModuleStyle(styles)(SingleContentURLDialogContainer)
