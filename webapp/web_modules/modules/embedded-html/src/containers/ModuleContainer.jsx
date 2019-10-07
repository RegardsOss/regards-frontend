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
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'
import { LOCALES_ENUM } from '../../../../data/domain/ui'

/**
 * Main component of module menu
 * @author Sébastien Binda
 **/
export class ModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfigurationShape,
    // from mapStateToProps
    i18n: PropTypes.oneOf(UIDomain.LOCALES), // automatically add by REGARDS connect method
  }

  static defaultProps = {
    i18n: LOCALES_ENUM.en, // for init case, when locale is not yet available
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Default CSS property for width, when not user provided */
  static DEFAULT_CSS_WIDTH = '100%'

  /** Default CSS property for height, when not user provided */
  static DEFAULT_CSS_HEIGHT = '100px'


  render() {
    const renderStyles = {
      width: this.props.moduleConf.cssWidth || ModuleContainer.DEFAULT_CSS_WIDTH,
      height: this.props.moduleConf.cssHeight || ModuleContainer.DEFAULT_CSS_HEIGHT,
    }
    const { moduleConf: { urlByLocale = {} }, i18n } = this.props
    // URL: current locale URL if available. If not available, first available locale URL.
    const urlForLocale = urlByLocale[i18n] || find(urlByLocale, url => !!url)
    return urlForLocale ? (
      <IFrameURLContentDisplayer
        source={urlForLocale}
        style={renderStyles}
      />
    ) : null
  }
}

export default connect()(ModuleContainer)
