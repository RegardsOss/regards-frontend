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
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import SearchResultsContainer from '../../../containers/user/tabs/results/SearchResultsContainer'
import DescriptionContainer from '../../../containers/user/tabs/description/DescriptionContainer'
import DescriptionFileContainer from '../../../containers/user/tabs/description/DescriptionFileContainer'

/**
 * Tabs content display component: keeps a copy of each visible tab and swaps them as selection changes. Each child is
 * placed in a streching vertical flex layout
 * @author Raphaël Mechali
 */
class TabsContentComponent extends React.Component {
  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    appName: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      moduleId, project, appName, resultsContext,
    } = this.props
    const {
      moduleTheme: {
        user: {
          tabContent: {
            borderDisplayer, layoutContainer, hiddenTabContent, shownTabContent,
          },
        },
      },
    } = this.context
    return (
      <div style={borderDisplayer}>
        <div style={layoutContainer}>
          { /* Show one tab for each tab type. Show the selected one above using z-index */
          UIDomain.RESULTS_TABS.map((tabType) => {
            const style = resultsContext.selectedTab === tabType ? shownTabContent : hiddenTabContent
            switch (tabType) {
              case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
                return (
                  <div key={tabType} style={style}>
                    <SearchResultsContainer
                      moduleId={moduleId}
                      project={project}
                      tabType={tabType}
                      resultsContext={resultsContext}
                    />
                  </div>)
              case UIDomain.RESULTS_TABS_ENUM.DESCRIPTION:
                return (
                  <div key={tabType} style={style}>
                    <DescriptionContainer
                      moduleId={moduleId}
                      project={project}
                      appName={appName}
                      resultsContext={resultsContext}
                    />
                    <div />
                  </div>)
              case UIDomain.RESULTS_TABS_ENUM.FILE:
                return (
                  <div key={tabType} style={style}>
                    <DescriptionFileContainer resultsContext={resultsContext} />
                  </div>)
              case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS:
                return (
                  <div key={tabType} style={style}>
                    <SearchResultsContainer
                      moduleId={moduleId}
                      project={project}
                      tabType={tabType}
                      resultsContext={resultsContext}
                    />
                  </div>)
              default:
                throw new Error(`Unknown tab type ${tabType}`)
            }
          })
        }
        </div>
      </div>
    )
  }
}
export default TabsContentComponent
