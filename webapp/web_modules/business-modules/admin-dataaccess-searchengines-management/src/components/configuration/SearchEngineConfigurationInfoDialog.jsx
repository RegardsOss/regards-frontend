/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { withAuthInfo } from '@regardsoss/authentication-utils'


export class SearchEngineConfigurationInfoDialog extends React.Component {
  static propTypes = {
    searchEngineConfiguration: CatalogShapes.SearchEngineConfiguration,
    onClose: PropTypes.func.isRequired,
    // From withAuthInfo
    accessToken: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  getSearchLink = (withAuth, type = 'search') => {
    const searchLink = find(this.props.searchEngineConfiguration.links, l => l.rel === type)
    if (searchLink) {
      return withAuth
        ? `${searchLink.href}?token=${this.props.accessToken}`
        : searchLink.href
    }
    return null
  }

  render() {
    const { searchEngineConfiguration, onClose } = this.props
    const { intl: { formatMessage }, muiTheme, moduleTheme: { searchEngineURLInfo } } = this.context
    if (!searchEngineConfiguration) {
      return null
    }

    const actions = [
      <FlatButton
        key="close"
        label={formatMessage({ id: 'dataaccess.searchengines.info.close' })}
        primary
        onClick={onClose}
      />,
    ]

    let content = null
    if (searchEngineConfiguration.content.dataset) {
      const decoratedLabel = (
        <span style={{ color: muiTheme.palette.accent1Color }}>
          {searchEngineConfiguration.content.dataset.label}
        </span>
      )
      const values = {
        label: decoratedLabel,
      }
      content = (
        <FormattedMessage
          id="dataaccess.searchengines.info.content.dataset"
          values={values}
        />
      )
    } else {
      content = formatMessage({ id: 'dataaccess.searchengines.info.content.all' })
    }

    const searchRootLink = this.getSearchLink(false)
    const searchObjectsRootLink = this.getSearchLink(false, 'search-objects')
    const searchDatasetsRootLink = this.getSearchLink(false, 'search-datasets')
    const searchCollectionsRootLink = this.getSearchLink(false, 'search-collections')
    const descriptortLink = this.getSearchLink(false, 'opensearchdescription.xml')

    return (
      <Dialog
        actions={actions}
        title={formatMessage({ id: 'dataaccess.searchengines.info.title' }, { name: searchEngineConfiguration.content.label })}
        open
        onRequestClose={onClose}
      >
        {content}
        <br />
        <br />
        {searchRootLink ? (
          <React.Fragment>
            <div style={searchEngineURLInfo}>
              {searchRootLink}
              {searchObjectsRootLink ? <br /> : null}
              {searchObjectsRootLink}
              {searchDatasetsRootLink ? <br /> : null}
              {searchDatasetsRootLink}
              {searchCollectionsRootLink ? <br /> : null}
              {searchCollectionsRootLink}
              {descriptortLink ? <br /> : null}
              {descriptortLink}
            </div>
            <br />
            <br />
          </React.Fragment>
        ) : null}
        <a style={{ color: muiTheme.palette.accent1Color }} href={this.getSearchLink(true)} target="_blanck">{formatMessage({ id: 'dataaccess.searchengines.info.test' })}</a>
        <br />
        {descriptortLink ? <a style={{ color: muiTheme.palette.accent1Color }} href={this.getSearchLink(true, 'opensearchdescription.xml')} target="_blanck">{formatMessage({ id: 'dataaccess.searchengines.info.test.descriptor' })}</a> : null}
      </Dialog>
    )
  }
}

export default withAuthInfo(SearchEngineConfigurationInfoDialog)
