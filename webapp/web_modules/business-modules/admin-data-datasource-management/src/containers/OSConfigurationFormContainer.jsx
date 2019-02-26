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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import messages from '../i18n'
import { OSCrawlerConfigurationContainer } from './OSCrawlerConfigurationContainer'
import { OSQueryConfigurationContainer } from './OSQueryConfigurationContainer'
import { OSResultsConfigurationContainer } from './OSResultsConfigurationContainer'

/**
 * Show the datasource form
 */
export class OSConfigurationFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    route: PropTypes.shape({
      path: PropTypes.string,
    }),
  }


  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {}
  }

  state = {
    crawler: {},
    query: {},
  }

  forms = {
    crawler: {
      path: 'opensearch/create/crawler',
      fullPath: () => `/admin/${this.props.params.project}/data/acquisition/datasource/${this.forms.crawler.path}`,
      backUrl: () => `/admin/${this.props.params.project}/data/acquisition/datasource/create/interface`,
      nextUrl: () => this.forms.query.fullPath(),
    },
    query: {
      path: 'opensearch/create/query',
      fullPath: () => `/admin/${this.props.params.project}/data/acquisition/datasource/${this.forms.query.path}`,
      backUrl: () => this.forms.crawler.fullPath(),
      nextUrl: () => this.forms.results.fullPath(),
    },
    results: {
      path: 'opensearch/create/results',
      fullPath: () => `/admin/${this.props.params.project}/data/acquisition/datasource/${this.forms.results.path}`,
      backUrl: () => this.forms.query.fullPath(),
    },
  }

  onCrawlerSubmit = (fields) => {
    this.setState({
      crawler: fields,
    })
  }

  onQuerySubmit = (fields) => {
    // TODO: omit non used parameters
    this.setState({
      query: fields,
    })
  }

  renderSubContainer = () => {
    const { path } = this.props.route
    const { crawler, query, results } = this.forms
    switch (path) {
      case this.forms.crawler.path:
      default:
        return <OSCrawlerConfigurationContainer
          backUrl={crawler.backUrl()}
          nextUrl={crawler.nextUrl()}
          onSubmit={this.onCrawlerSubmit}
          initialValues={this.state.crawler}
        />
      case query.path:
        return <OSQueryConfigurationContainer
          backUrl={query.backUrl()}
          nextUrl={query.nextUrl()}
          onSubmit={this.onQuerySubmit}
          initialValues={this.state.query}
        />
      case results.path:
        return <OSResultsConfigurationContainer
          backUrl={results.backUrl()}
        />
    }
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={false}
        >
          {this.renderSubContainer()}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(
  OSConfigurationFormContainer.mapStateToProps,
  OSConfigurationFormContainer.mapDispatchToProps)(OSConfigurationFormContainer)
