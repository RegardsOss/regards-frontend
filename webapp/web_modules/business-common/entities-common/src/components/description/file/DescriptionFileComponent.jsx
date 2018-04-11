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
import get from 'lodash/get'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { Measure } from '@regardsoss/adapters'
import { MarkdownFileContentDisplayer, NoContentMessageInfo, IFrameURLContentDisplayer } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import LoadingDisplayerComponent from '../LoadingDisplayerComponent'

/**
* Description file component
*/
class DescriptionFileComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // description file URL, when it should be accessed through URL
    descriptionFileURL: PropTypes.string,
    // Description file when it should be accessed by content
    descriptionFile: PropTypes.shape({
      entityId: PropTypes.string.isRequired, // IP ID
      contentType: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
    noContentMessage: PropTypes.string,
    noContentTitle: PropTypes.string,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount = () => this.updateDisplayAreaStyle(0, 0)

  onSizeChanged = ({ measureDiv: { width, height } }) => this.updateDisplayAreaStyle(width, height)

  updateDisplayAreaStyle = (width, height) => {
    if (width !== get(this.state, 'displayAreaStyle.width') ||
      height !== get(this.state, 'displayAreaStyle.height')) {
      this.setState({ displayAreaStyle: { width, height } })
    }
  }

  render() {
    const {
      loading, descriptionFileURL, descriptionFile, noContentTitle, noContentMessage,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const { rootStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.descriptionTab

    const { displayAreaStyle } = this.state
    return (
      <Measure bounds onMeasure={this.onSizeChanged}>
        {
          ({ bind }) => (
            <div style={rootStyle} {...bind('measureDiv')}>
              {
                (function renderContent() {
                  if (loading) {
                    return <LoadingDisplayerComponent message={formatMessage({ id: 'entities.common.description.loading' })} />
                  }

                  if (descriptionFileURL) {
                    // render iFrame
                    return <IFrameURLContentDisplayer style={displayAreaStyle} contentURL={descriptionFileURL} />
                  }
                  if (descriptionFile) {
                    // render MD
                    return <MarkdownFileContentDisplayer heightToFit={displayAreaStyle.height} source={descriptionFile.content} />
                  }
                  // render no data (no need for child here)
                  return (
                    <NoContentMessageInfo
                      noContent
                      title={noContentTitle || formatMessage({ id: 'entities.common.description.no.value.title' })}
                      message={noContentMessage || formatMessage({ id: 'entities.common.description.no.value.message' })}
                      Icon={NoDataIcon}
                    >
                      <div />
                    </NoContentMessageInfo >)
                }())
              }
            </div>)
        }
      </Measure>
    )
  }
}
export default DescriptionFileComponent

