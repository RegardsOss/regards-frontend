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
import compose from 'lodash/fp/compose'
import find from 'lodash/find'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import { AccessProjectClient } from '@regardsoss/client'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'
import { LOCALES } from '../../../../data/domain/ui'
import messages from '../i18n'
import styles from '../styles'

// get default layout client actions and reducers instances - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.getLayoutSelectors()

// get default modules client actions and reducers instances - required to check a basket exists AND is in a dynamic container
const modulesSelectors = AccessProjectClient.getModuleSelectors()

/**
 * Main component of module menu
 * @author Sébastien Binda
 **/
export class ModuleContainer extends React.Component {
  /** Style to use when rendering a page in final app */
  static PAGE_RENDER_STYLE = {
    flexGrow: 1,
    flexShrink: 1,
  }

  /** Default CSS property for width, when not user provided */
  static DEFAULT_CSS_WIDTH = '100%'

  /** Default CSS property for height, when not user provided */
  static DEFAULT_CSS_HEIGHT = '100px'

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      dynamicContainerId: layoutSelectors.getDynamicContainerId(state),
      modules: modulesSelectors.getList(state),
    }
  }

  /**
   * React lifecycle method, called on properties change to build next state
   * @return {*} Next state or null when there is no difference
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      id, dynamicContainerId, modules, moduleConf,
    } = nextProps
    const nextState = { ...prevState }
    // 1 - Prepare styles (preview, page styles or configuration)
    if (moduleConf.preview) {
      // 1.a - preview: use parent provided styles, from configuration
      nextState.renderStyles = {
        width: moduleConf.cssWidth,
        height: moduleConf.cssHeight,
      }
    } else {
      // 1.b - in user app: page or element?
      const thisModuleDefinition = find(modules, (m) => m.content.id === id)
      if (thisModuleDefinition && dynamicContainerId === thisModuleDefinition.content.container) {
        // 1.b.1 - page style, grow the available height in user app
        nextState.renderStyles = ModuleContainer.PAGE_RENDER_STYLE
      } else {
        // 1.b.2 configuration styles, from configuration or defaulting
        nextState.renderStyles = {
          width: moduleConf.cssWidth || ModuleContainer.DEFAULT_CSS_WIDTH,
          height: moduleConf.cssHeight || ModuleContainer.DEFAULT_CSS_HEIGHT,
        }
      }
    }
    // 2 - Prepare the locales URL by locale (it remains possible for URL to be empty in each locale,
    // in specific configuration case)
    const anyNonEmptyLocale = find(moduleConf.urlByLocale, (url) => !!url)
    nextState.urlByLocale = LOCALES.reduce((acc, locale) => ({
      ...acc,
      [locale]: get(moduleConf.urlByLocale, locale) || anyNonEmptyLocale,
    }), {})

    return !isEqual(prevState, nextState) ? nextState : null
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfigurationShape,

    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    renderStyles: {},
    urlByLocale: {},
  }

  render() {
    const { moduleConf: { previewLocale } } = this.props
    const { renderStyles, urlByLocale } = this.state
    const { intl: { locale }, moduleTheme: { user: { iFrame } } } = this.context
    // define the runtime locale (preview or context one when not in preview)
    const runtimeLocale = previewLocale || locale
    // URL: current locale URL if available. If not available, first available locale URL.
    const urlForLocale = urlByLocale[runtimeLocale]
    return urlForLocale ? (
      <IFrameURLContentDisplayer
        source={urlForLocale}
        style={renderStyles}
        iFrameStyle={iFrame}
      />
    ) : null
  }
}

export default compose(
  connect(ModuleContainer.mapStateToProps),
  withI18n(messages),
  withModuleStyle(styles))(ModuleContainer)
