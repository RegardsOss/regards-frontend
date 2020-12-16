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
import get from 'lodash/get'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DownloadButton, DropDownButton } from '@regardsoss/components'
import {
  DownloadIconComponent, QuotaDownloadUtils, QuotaInfo, withQuotaInfo,
} from '@regardsoss/entities-common'
import { DataFileController } from '@regardsoss/domain/dam'

/** Constructor wrapper to use the IconButton within a DropDownButton */
export const IconButtonConstructorWrapper = ({ constrainedByQuota, quotaInfo, ...otherProps }) => (
  <IconButton
    {...otherProps}
  >
    <DownloadIconComponent constrainedByQuota={constrainedByQuota} quotaInfo={quotaInfo} />
  </IconButton>)
IconButtonConstructorWrapper.propTypes = {
  constrainedByQuota: PropTypes.bool.isRequired,
  quotaInfo: QuotaInfo,
}

/**
 * Option to show description in results table
 * @author Léo Mieulet
 */
export class DownloadEntityFileComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // Current user session info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // from quota info provider
    quotaInfo: QuotaInfo,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static defaultProps = {
    style: {
      padding: '12px 12px 12px',
    },
  }

  static resetLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  }

  /** File types available through download option */
  static DOWNLOADABLE_FILES_TYPES = [
    CommonDomain.DATA_TYPES_ENUM.RAWDATA,
    CommonDomain.DATA_TYPES_ENUM.DOCUMENT,
  ]

  /**
   * Computes downloadable files list and corresponding meta data:
   * - files: Filtered files that can be downloaded (including quota considerations)
   * - Keeps files that cannot be downloaded because of quota consumed status, except if currently working for
   * public user (quota / rate are not supported for public user, thus the functionality is fully disabled)
   * Adds as metadata:
   * - onlyConstrainedByQuota: the fact there is only raw data internally stored
   * - disabled: the fact button should currently be disabled
   *
   * @return {{onlyConstrainedByQuota: boolean, disabled: boolean, files: [*]}} meta and files returned (files matches arrayOf(DataManagementShapes.DataFile))
   */
  getDownloadeableFilesAndMeta = () => {
    const {
      entity: { content: { files } }, accessToken,
      quotaInfo: { downloadDisabled },
    } = this.props
    const meta = DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, fileType) => {
      // Filter files for that type and compute metadata
      const { cFF: currFilteredFiles, cOIRD: currOnlyConstrainedByQuota } = get(files, fileType, []).reduce((typeAcc, f) => {
        // Algorithm: File must be available for download (online / ref) AND
        // file must not be submitted to quota OR a user must be logged (public user has no quota )
        // This means we also list files that cannot be downloaded because of quota status (intentionnal, to provide that status feedback)
        if (DataFileController.isAvailableNow(f) && (!QuotaDownloadUtils.isConstrainedByQuota(f.dataType, f.reference) || accessToken)) {
          return {
            cFF: [...typeAcc.cFF, f],
            cOIRD: typeAcc.cOIRD && !f.reference && fileType === CommonDomain.DATA_TYPES_ENUM.RAWDATA,
          }
        }
        return typeAcc
      }, { cFF: [], cOIRD: true })
      // Append files filtered for that type with other types info
      return {
        files: [...acc.files, ...currFilteredFiles],
        onlyConstrainedByQuota: acc.onlyConstrainedByQuota && currOnlyConstrainedByQuota,
      }
    }, {
      onlyConstrainedByQuota: true,
      files: [],
    })
    return {
      ...meta,
      noDownloadableFile: meta.files.length === 0,
      // download button will be disabled when there is no downloadable file or when all files are raw data but quota variables are consumed
      disabled: !meta.files.length || (meta.onlyConstrainedByQuota && downloadDisabled),
    }
  }

  /** @return {boolean} true if current entity is a dataset */
  isDataset = () => get(this.props.entity, 'content.entityType') === DamDomain.ENTITY_TYPES_ENUM.DATASET

  render() {
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage } } = this.context
    const {
      style, accessToken, projectName, quotaInfo,
    } = this.props
    if (this.isDataset()) {
      return null
    }

    // Compute files and meta (nota: files include RAW data, even when quota are consumed, to compute graphics state)
    const {
      onlyConstrainedByQuota, noDownloadableFile, disabled, files,
    } = this.getDownloadeableFilesAndMeta()

    if (files.length <= 1 || disabled) {
      // A - when button is disabled or one file only, render directly as single download button
      // coverts the cases: 0 file, [1-N] raw data internal files but quota consumed, 1 downlodable file
      // take in account onlyConstrainedByQuota to show quota consumed status (when there are files)
      return (
        <DownloadButton
          ButtonConstructor={IconButtonConstructorWrapper}
          ButtonIcon={null} // controlled by wrapper
          tooltip={formatMessage({
            id: (() => { // IIFE: returns ID based on rendering reason
              if (noDownloadableFile) {
                return 'no.download.tooltip'
              } if (!disabled) {
                return 'download.tooltip'
              } // there are files but disabled: quota consumed status
              return 'download.quota.consumed.tooltip'
            })(),
          })}
          disabled={disabled}
          downloadURL={noDownloadableFile ? null : DamDomain.DataFileController.getFileURI(files[0], accessToken, projectName)}
          downloadName={get(files, '[0].filename', 'download')}
          style={style}
          // for icon graphics (see wrapper)
          constrainedByQuota={onlyConstrainedByQuota && files.length >= 1} // show quota warnings only when there are data
          quotaInfo={quotaInfo}
        />)
    }
    // B - Many files (may hold some disabled, but not all)
    return (
      <DropDownButton
        ButtonConstructor={IconButtonConstructorWrapper}
        disabled={onlyConstrainedByQuota && quotaInfo.downloadDisabled} // disable button when all files are disabled
        title={formatMessage({ id: 'download.tooltip' })}
        style={style}
        // for icon graphics (see wrapper)
        constrainedByQuota={onlyConstrainedByQuota}
        quotaInfo={quotaInfo}
      >
        { /* Map all files  */
              files.map((file) => (
                <DownloadButton
                  key={file.uri}
                  ButtonConstructor={MenuItem}
                  ButtonIcon={null}
                  tooltip={formatMessage({ id: QuotaDownloadUtils.canDownloadFile(file, quotaInfo, accessToken) ? 'download.tooltip' : 'download.quota.consumed.tooltip' })}
                  disabled={!QuotaDownloadUtils.canDownloadFile(file, quotaInfo, accessToken)}
                  downloadURL={DamDomain.DataFileController.getFileURI(file, accessToken, projectName)}
                  downloadName={file.filename}
                  primaryText={file.filename}
                  leftIcon={<DownloadIconComponent constrainedByQuota={QuotaDownloadUtils.isConstrainedByQuota(file.dataType, file.reference)} quotaInfo={quotaInfo} />}
                />))
            }
      </DropDownButton>
    )
  }
}
export default withQuotaInfo(DownloadEntityFileComponent)
