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
import { DownloadFileActions } from '@regardsoss/store-utils'
import { connect } from '@regardsoss/redux'
import { contentTypeParser } from '@regardsoss/mime-types'
import URLPicture from './URLPicture'
import LoadingPicturePlaceholder from './LoadingPicturePlaceholder'

const downloadActions = new DownloadFileActions({
  namespace: 'inner/download-picture',
  headers: {
    Accept: 'image/*',
  },
  entityEndpoint: '{pictureURL}',
  bypassErrorMiddleware: true,
})

/**
 * Download  pictures to resolve their MIME type and provide URL+MIME type to URLPicture in order to display it
 * Holds an URL to MIME type cache.
 * @author Raphaël Mechali
 */
export class URLPictureResolver extends React.Component {
  /**
   * Picture cache: keeps, by URL, the MIME type resolved
   */
  static PICTURES_CACHE = {}

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchDownload: (pictureURL) => dispatch(downloadActions.download({ pictureURL })),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    url: PropTypes.string.isRequired, // used in onPropertiesUpdated
    // from map dispatch to props
    dispatchDownload: PropTypes.func.isRequired,
    // other properties are provided to sub components pictures
  }

  /** Default state */
  state = {
    loading: false,
    resolvedMIMEType: null,
    subComponentProperties: {},
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Lifecycle method: component will unmount: block stupid react warning messages...
   */
  componentWillUnmount() {
    // block state updates to not get that terrible warning...
    this.updateBlocked = true
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { url, dispatchDownload, ...subComponentProperties } = newProps
    if (url !== oldProps.url) {
      this.onNewURL(dispatchDownload, url, subComponentProperties)
    } else if (subComponentProperties !== oldProps.subComponent) {
      // update children props in state
      this.setState({
        subComponentProperties,
      })
    }
  }

  /**
   * The component received a new URL for picture
   * @param dispatchDownload download promise  builder on url
   * @param url url to load
   * @param subComponent properties
   */
  onNewURL = (dispatchDownload, url, subComponentProperties = {}) => {
    // 1 - check URL presence in cache
    const cachedMIMEType = URLPictureResolver.PICTURES_CACHE[url]
    if (cachedMIMEType) {
      this.setState({ loading: false, resolvedMIMEType: cachedMIMEType, subComponentProperties })
    } else {
      // 1.B Picture is not locally cached, download it
      // re-init state, mark loading
      this.setState({
        loading: true,
        resolvedMIMEType: null,
        subComponentProperties,
      })
      dispatchDownload(url).then(({ payload, error }) => {
        // 2 - after file was downloaded
        let resolvedMIMEType = null
        if (!error) {
          // 2.a - download successful: resolve MIME type and store it in cache
          const blob = payload.content
          const rawContentType = blob.type
          const mimeTypeModel = contentTypeParser.getMIMEType(rawContentType)
          resolvedMIMEType = mimeTypeModel ? mimeTypeModel.mime : null
        }
        // 2.b - mark not loading, store resolved MIME type if any
        this.setState({ loading: false, resolvedMIMEType, subComponentProperties })
      })
    }
  }

  setState = (newValues) => {
    if (!this.updateBlocked) {
      super.setState(newValues)
    }
  }

  render() {
    const { url } = this.props
    const { loading, resolvedMIMEType, subComponentProperties } = this.state
    if (loading) {
      // by-pass picture display, show loading directly
      return <LoadingPicturePlaceholder {...subComponentProperties} />
    }
    return (
      <URLPicture
        mimeType={resolvedMIMEType}
        url={url}
        {...subComponentProperties}
      />
    )
  }
}
export default connect(null, URLPictureResolver.mapDispatchToProps)(URLPictureResolver)
