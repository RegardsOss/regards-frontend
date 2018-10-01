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
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementClient } from '@regardsoss/client'
import { DataManagementShapes, CatalogShapes } from '@regardsoss/shape'
import { AuthenticateShape } from '@regardsoss/authentication-utils'
import { HOCUtils } from '@regardsoss/display-control'
import { attributesBoundsActions, attributesBoundsSelectors } from '../../clients/AttributesBoundsClient'
import { CriteriaArray } from '../../shapes/ModuleConfiguration'

/** Attributes default selector */
const attributeModelSelectors = DataManagementClient.AttributeModelSelectors()

/**
 * Plugins configuration provider: it resolves plugin configuration with attribute models and fetches
 * in background the current attributes bounds.
 * It clones children to provide the attribute plugins which contains the configuration
 * Note: it also updates each time the authentication or initial query changes (form context changed)
 * @author Raphaël Mechali
 */
export class PluginsConfigurationProvider extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      attributeModels: attributeModelSelectors.getList(state),
      attributesBounds: attributesBoundsSelectors.getList(state),
      boundsFetchingError: attributesBoundsSelectors.hasError(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchClearBounds: () => dispatch(attributesBoundsActions.flush()),
      dispatchFetchBounds: (attributesPath, initialQuery) => dispatch(attributesBoundsActions.fetchAttributesBounds(attributesPath, initialQuery)),
    }
  }

  static propTypes = {
    // from parent container
    // eslint-disable-next-line react/no-unused-prop-types
    criteria: CriteriaArray, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    initialQuery: PropTypes.string, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape, // used in onPropertiesUpdated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: DataManagementShapes.AttributeModelList, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    attributesBounds: CatalogShapes.AttributeBoundsMap.isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    boundsFetchingError: PropTypes.bool.isRequired, // used in onPropertiesUpdated
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchClearBounds: PropTypes.func.isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchBounds: PropTypes.func.isRequired, // used in onPropertiesUpdated
  }

  /** Types of attributes that accept bounds */
  static BOUNDABLE_TYPES = [
    DamDomain.MODEL_ATTR_TYPES.INTEGER,
    DamDomain.MODEL_ATTR_TYPES.DOUBLE,
    DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601,
    DamDomain.MODEL_ATTR_TYPES.LONG,
  ]

  /** Request ID (used to handle concurrency) */
  static REQUEST_ID = 0


  /**
   * Resolves criteria attributes: builds criteria configuration and keeps a set of attributes that where found
   * @param {*} attributeModels attribute models, see propTypes
   * @param {[*]} criteria criteria array, see propTypes
   * @param {Function} addBoundsState function like (attributeModel) => (attributeModelWithBounds). That function must COPY the input attribute
   * @return [*] plugins that could be rebuilt (with added bounds state)
   */
  // Algorithm: (1) for each plugin, resolve each attribute (2). Filter only plugins that are enabled
  // and for which each attribute could be retrieved
  static resolveCriteriaAttributes(attributeModels, criteria, addBoundsState) {
    return criteria.reduce((plugins, criterion) => {
      const { active, conf, ...otherProps } = criterion
      // handle only enabled plugins
      if (active) {
        const configuredAttributes = get(conf, 'attributes', {})
        // In plugin configuration, replace each configured attribute by its model OR FAIL IF SOME ARE MISSING
        const resolvedAttributes = reduce(configuredAttributes,
          (rCA, configurationAttrPath, configurationKey) => {
            const model = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(configurationAttrPath, attributeModels)
            // If model was found, restore configured attribute key and complete model with bounds state
            return model ? { ...rCA, [configurationKey]: addBoundsState(model.content) } : rCA
          }, {})
        if (values(configuredAttributes).length === values(resolvedAttributes).length) {
          // all attribute were found, keep that criterion and the found models (build its conf)
          return [
            ...plugins, {
              active,
              conf: { // replace attributes by resolved attributes content
                attributes: resolvedAttributes,
              },
              ...otherProps,
            }]
        } // else: skip that plugin, it could not be restored
      } // else: skip that plugin as it is disabled
      return plugins
    }, [])
  }

  /**
   * Filters, in plugin configurations attribute models, the list of attributes for which bounds should be fetched
   * @param {[*]} plugins completed plugins configurations, with attribute model (and bounds information)
   * @return {[string]} json path of attributes for which bounds should be fetched
   */
  static getAttributesToFetchIn(plugins) {
    const attributesToFetchMap = plugins.reduce((acc, { conf: { attributes = {} } }) => ({
      // previously found attributes with bounds
      ...acc,
      // search in current criterion attributes
      ...reduce(attributes, (acc2, attribute) => attribute.boundsInformation.exists ? {
        ...acc2,
        [attribute.jsonPath]: attribute.jsonPath, // map of A:A (key is used only to check item is unique)
      } : acc2, {}),
    }), {})
    return values(attributesToFetchMap)
  }

  /**
   * Updates attributes in complted plugins configuration
   * @param {*} plugins  plugins
   * @param {Function} addBoundsState function like (attributeModelWithBounds) => (attributeModelWithBounds). That function must COPY the input attribute
   */
  static updateAttributes(plugins, addBoundsState) {
    return plugins.map(plugin => ({
      ...plugin,
      conf: {
        ...plugin.conf,
        attributes: reduce(plugin.conf.attributes, (acc, attribute, key) => ({
          ...acc,
          [key]: addBoundsState(attribute),
        }), {}),
      },
    }))
  }

  /**
   * Generates initial state for attribute model, according with attribute type (should its bounds be fetched or not)
   * @param {*} attributeModel attribute model
   * @return {*} attribute model with bounds information
   */
  static withLoadingBoundInfo(attributeModel) {
    const isBoundableAttribute = PluginsConfigurationProvider.BOUNDABLE_TYPES.includes(attributeModel.type)
    return {
      ...attributeModel,
      boundsInformation: {
        exists: isBoundableAttribute, // that attribute type MAY have bounds (some optional attributes may not...)
        loading: isBoundableAttribute,
        error: false,
      },
    }
  }

  /**
   * Adds to an attribute, if it should, fetched information
   * @param {*} attributesBounds fetched attribute bounds (see propTypes)
   * @param {*} attributeModel attribute model with bounds information
   * @return {*} attribute model with bounds information
   */
  static withFetchedBounds(attributesBounds, attributeModel) {
    if (attributeModel.boundsInformation.exists) { // that model should be updated
      const bounds = attributesBounds[attributeModel.jsonPath]
      return {
        ...attributeModel,
        boundsInformation: {
          exists: true,
          loading: false,
          error: false,
          // might be undefined, for an optional attribute for instance
          lowerBound: get(bounds, 'content.lowerBound'),
          upperBound: get(bounds, 'content.upperBound'),
        },
      }
    }
    // nothing to change in that model
    return attributeModel
  }

  /**
   * Adds to an attribute, if it should, fetching error information
   * @param {*} attributeModel attribute model with bounds information
   * @return {*} attribute model with boundsInformation
   */
  static withFetchingError(attributeModel) {
    if (attributeModel.boundsInformation.exists) { // that model should be updated
      return {
        ...attributeModel,
        boundsInformation: {
          exists: true,
          loading: false,
          error: true,
        },
      }
    }
    // nothing to change in that model
    return attributeModel
  }

  /** Initial state */
  state = {
    plugins: [], // plugins configuration as it has been currently resolved
    children: [], // children array
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
   componentWillMount = () => this.onPropertiesUpdated({}, this.props)

   /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
   componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

   /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
   onPropertiesUpdated = (oldProps, newProps) => {
     const {
       initialQuery, authentication, attributeModels, criteria, children,
       boundsFetchingError, attributesBounds, dispatchFetchBounds, dispatchClearBounds,
     } = newProps
     const nextState = { ...this.state }
     if (!isEqual(initialQuery, oldProps.initialQuery)
     || !isEqual(authentication, oldProps.authentication)
     || !isEqual(attributeModels, oldProps.attributeModels)
     || !isEqual(criteria, oldProps.criteria)) {
       // 1 - Context or attributes changed:
       // 1.a - resolve and rebuild criteria configuration with attribute models (holding bounds state)
       nextState.plugins = PluginsConfigurationProvider.resolveCriteriaAttributes(attributeModels, criteria, PluginsConfigurationProvider.withLoadingBoundInfo)
       // 1.b - compute attributes that have bounds. Start fetching if there is any
       const attributesToFetch = PluginsConfigurationProvider.getAttributesToFetchIn(nextState.plugins)
       if (attributesToFetch.length) {
         dispatchClearBounds() // clear currently stored data
         dispatchFetchBounds(attributesToFetch, initialQuery)
       }
     } else if (!isEqual(attributesBounds, oldProps.attributesBounds) || !isEqual(boundsFetchingError, oldProps.boundsFetchingError)) {
       // 3 - Request finished with new attribute bounds or error, update attributes
       const updater = boundsFetchingError ? PluginsConfigurationProvider.withFetchingError
         : PluginsConfigurationProvider.withFetchedBounds.bind(null, attributesBounds) // update with bounds, left curly
       nextState.plugins = PluginsConfigurationProvider.updateAttributes(nextState.plugins, updater)
     }

     // update when children changed or state was recomputed (ie: plugins runtime configurations was updated)
     if (!isEqual(nextState.plugins, this.state.plugins) || children !== oldProps.children) {
       // update children list in next state
       nextState.children = HOCUtils.cloneChildrenWith(children, { plugins: nextState.plugins })
       this.setState(nextState)
     }
   }

   render() {
     const { children } = this.state
     return HOCUtils.renderChildren(children)
   }
}
export default connect(
  PluginsConfigurationProvider.mapStateToProps,
  PluginsConfigurationProvider.mapDispatchToProps)(PluginsConfigurationProvider)
