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
import { connect } from '@regardsoss/redux'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { FemClient, CatalogClient } from '@regardsoss/client'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { BasicSignalSelectors, BasicSignalsSelectors } from '@regardsoss/store-utils'
import withRequestsClient from './withRequestsClient'
import withModelAttributesClient from './withModelAttributesClient'
import EditComponent from '../components/EditComponent'

/**
 * Main fem-edit plugin container
 * @author C-S
 */
export class EditContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    const { modelAttributesClient, editClient } = props
    return {
      modelAttributes: modelAttributesClient.selectors.getResult(state),
      error: editClient.selectors.getError(state),
      isFetching: editClient.selectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component methods to interact with the store
   */
  static mapDispatchToProps(dispatch, props) {
    const { modelAttributesClient, editClient } = props
    return {
      editFeatures: searchContext => dispatch(editClient.actions.notify(searchContext)),
      fetchModelAttributes: searchContext => dispatch(modelAttributesClient.actions.getCommonModelAttributes(searchContext)),
    }
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    target: AccessShapes.PluginTarget.isRequired,
    pluginInstanceId: PropTypes.string.isRequired,
    // Connected client to use to delete features on fem
    editClient: PropTypes.shape({
      actions: PropTypes.instanceOf(FemClient.RequestsActions),
      selectors: PropTypes.instanceOf(BasicSignalsSelectors),
    }).isRequired,
    modelAttributesClient: PropTypes.shape({
      actions: PropTypes.instanceOf(CatalogClient.SearchEntitiesCommonModelAttributesActions),
      selectors: PropTypes.instanceOf(BasicSignalSelectors),
    }).isRequired,
    // From mapDispatchToProps
    editFeatures: PropTypes.func.isRequired,
    fetchModelAttributes: PropTypes.func.isRequired,
    // form mapStatesToprops
    error: PropTypes.shape({
      hasError: PropTypes.bool.isRequired,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access through this.context
    ...i18nContextType,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const searchContext = this.buildSearchContext()
    this.props.fetchModelAttributes(searchContext).then(() => {
      // Ignore error, just play attributes
      this.setState({
        isLoading: false,
      })
    })
  }

  componentDidUpdate(previousProps) {
    // detect change
    if (this.props.error.hasError !== previousProps.error.hasError || this.props.isFetching !== previousProps.isFetching) {
      // close the popup when the fetch is done and there is no error
      if (!this.props.error && !this.props.isFetching) {
        this.props.onClose()
      }
    }
  }

  buildSearchContext = () => {
    const { requestParameters } = this.props.target
    return {
      searchParameters: requestParameters,
    }
  }

  cancel = () => {
    this.props.onClose()
  }

  onSubmit = ({ properties }) => {
    const searchContext = this.buildSearchContext()
    this.props.editFeatures({
      ...searchContext,
      propertiesToUpdate: properties,
    })
  }


  getAttributeModelListStub() {
    return {
      22: {
        content: {
          id: 15,
          name: 'Zodiac',
          description: 'Zodiac',
          type: 'BOOLEAN',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Zodiac',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Zodiac',
        },
        links: [],
      },
      23: {
        content: {
          id: 16,
          name: 'Acronym',
          description: 'Acronym of the constellation',
          type: 'STRING',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Acronym',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Acronym',
        },
        links: [],
      },
      24: {
        content: {
          id: 17,
          name: 'Zodiac2',
          description: 'Zodiac',
          type: 'BOOLEAN',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Zodiac',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Zodiac',
        },
        links: [],
      },
      25: {
        content: {
          id: 18,
          name: 'Acronym2',
          description: 'Acronym of the constellation',
          type: 'STRING',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Acronym',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Acronym',
        },
        links: [],
      },
      26: {
        content: {
          id: 19,
          name: 'Zodiac3',
          description: 'Zodiac',
          type: 'BOOLEAN',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Zodiac',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Zodiac',
        },
        links: [],
      },
      27: {
        content: {
          id: 20,
          name: 'Acronym3',
          description: 'Acronym of the constellation',
          type: 'STRING',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Acronym',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Acronym',
        },
        links: [],
      },
      28: {
        content: {
          id: 21,
          name: 'Zodiac4',
          description: 'Zodiac',
          type: 'BOOLEAN',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Zodiac',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Zodiac',
        },
        links: [],
      },
      29: {
        content: {
          id: 22,
          name: 'Acronym4',
          description: 'Acronym of the constellation',
          type: 'STRING',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Acronym',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Acronym',
        },
        links: [],
      },
      33: {
        content: {
          id: 23,
          name: 'Zodiac4',
          description: 'Zodiac',
          type: 'BOOLEAN',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Zodiac',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Zodiac',
        },
        links: [],
      },
      34: {
        content: {
          id: 24,
          name: 'Acronym4',
          description: 'Acronym of the constellation',
          type: 'STRING',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Acronym',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Acronym',
        },
        links: [],
      },
      30: {
        content: {
          id: 25,
          name: 'Zodiac5',
          description: 'Zodiac',
          type: 'BOOLEAN',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Zodiac',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Zodiac',
        },
        links: [],
      },
      31: {
        content: {
          id: 26,
          name: 'Acronym5',
          description: 'Acronym of the constellation',
          type: 'STRING',
          unit: 'unitless',
          fragment: {
            id: 1,
            name: 'default',
            description: 'Default fragment',
          },
          alterable: true,
          optional: false,
          label: 'Acronym',
          properties: [],
          dynamic: true,
          internal: false,
          jsonPath: 'properties.Acronym',
        },
        links: [],
      },
    }
  }

  render() {
    const { entitiesCount } = this.props.target
    const { isLoading } = this.state
    return (

      <LoadableContentDisplayDecorator
        isLoading={isLoading}
      >
        <EditComponent
          onSubmit={this.onSubmit}
          attributeModelList={this.getAttributeModelListStub()}
          onCancel={this.cancel}
          pluginInstanceId={this.props.pluginInstanceId}
          entitiesCount={entitiesCount}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

// Connect clients to props and retrieve injected clients as props
export default withModelAttributesClient(withRequestsClient(
  // REDUX connected container
  connect(EditContainer.mapStateToProps, EditContainer.mapDispatchToProps)(EditContainer),
))
