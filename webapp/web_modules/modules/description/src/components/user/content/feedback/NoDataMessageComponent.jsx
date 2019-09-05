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
import values from 'lodash/values'
import ErrorIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import EmptyIcon from 'mdi-material-ui/MonitorOff'
import { i18nContextType } from '@regardsoss/i18n'
import { NoContentComponent } from '@regardsoss/components'

/**
 * Shows no data / error message in description module
 * @author Raphaël Mechali
 */
class NoDataMessageComponent extends React.Component {
  /** Possible no data types */
  static NO_DATA_TYPE_ENUM = {
    /** Entity is invalid for configuration */
    INVALID_ENTITY: 'INVALID_ENTITY',
    /** Entity model retrieval failed */
    MODEL_RETRIEVAL_FAILED: 'MODEL_RETRIEVAL_FAILED',
    /** No parameter to show */
    NO_PARAMETER: 'NO_PARAMETER',
    /** No preview for MIME type */
    NO_PREVIEW_FOR_FILE: 'NO_PREVIEW_FOR_FILE',
    /** File download error */
    FILE_DOWNLOAD_ERROR: 'FILE_DOWNLOAD_ERROR',
  }

  /** Graphics data associated with no data type */
  static NO_DATA_TYPE_DATA = {
    [NoDataMessageComponent.NO_DATA_TYPE_ENUM.INVALID_ENTITY]: {
      titleKey: 'module.description.invalid.entity.title',
      messageKey: 'module.description.invalid.entity.message',
      IconConstructor: ErrorIcon,
    },
    [NoDataMessageComponent.NO_DATA_TYPE_ENUM.MODEL_RETRIEVAL_FAILED]: {
      titleKey: 'module.description.model.retrieval.failed.title',
      messageKey: 'module.description.model.retrieval.failed.message',
      IconConstructor: ErrorIcon,
    },
    [NoDataMessageComponent.NO_DATA_TYPE_ENUM.NO_PARAMETER]: {
      titleKey: 'module.description.no.parameter.title',
      messageKey: 'module.description.no.parameter.message',
      IconConstructor: EmptyIcon,
    },
    [NoDataMessageComponent.NO_DATA_TYPE_ENUM.NO_PREVIEW_FOR_FILE]: {
      titleKey: 'module.description.unsuported.file.media.type.title',
      messageKey: 'module.description.unsuported.file.media.type.message',
      IconConstructor: EmptyIcon,
    },
    [NoDataMessageComponent.NO_DATA_TYPE_ENUM.FILE_DOWNLOAD_ERROR]: {
      titleKey: 'module.description.file.download.error.title',
      messageKey: 'module.description.file.download.error.message',
      IconConstructor: ErrorIcon,
    },


  }

  static propTypes = {
    type: PropTypes.oneOf(values(NoDataMessageComponent.NO_DATA_TYPE_ENUM)).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { type } = this.props
    const { titleKey, messageKey, IconConstructor } = NoDataMessageComponent.NO_DATA_TYPE_DATA[type]
    return (
      <NoContentComponent
        title={formatMessage({ id: titleKey })}
        message={formatMessage({ id: messageKey })}
        Icon={IconConstructor}
      />
    )
  }
}
export default NoDataMessageComponent
