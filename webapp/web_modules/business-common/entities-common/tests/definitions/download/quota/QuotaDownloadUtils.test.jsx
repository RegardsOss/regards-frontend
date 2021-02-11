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
import { CommonDomain } from '@regardsoss/domain'
import { assert } from 'chai'
import { QuotaDownloadUtils } from '../../../../src/definitions/download/quota/QuotaDownloadUtils'

/**
 * Test QuotaDownloadUtils
 * @author Raphaël Mechali
 */
describe('[Entities Common] Testing QuotaDownloadUtils', () => {
  it('should compute correctly quota constraint status', () => {
    CommonDomain.DATA_TYPES.forEach((dt) => {
      // references are never constrained by quota status
      assert.isFalse(QuotaDownloadUtils.isConstrainedByQuota(dt, true))
      // only raw data should be contrained by quota status when not reference
      if (dt === CommonDomain.DATA_TYPES_ENUM.RAWDATA) {
        assert.isTrue(QuotaDownloadUtils.isConstrainedByQuota(dt, false))
      } else {
        assert.isFalse(QuotaDownloadUtils.isConstrainedByQuota(dt, false))
      }
    })
  })
  it('should compute correctly downloadable status', () => {
    // A - Cannot download a file not available
    CommonDomain.DATA_TYPES.forEach((dt) => {
      assert.isFalse(QuotaDownloadUtils.canDownload(false, dt, true, { downloadDisabled: false }), 'testToken')
      assert.isFalse(QuotaDownloadUtils.canDownload(false, dt, false, { downloadDisabled: false }), 'testToken')
    })
    // B - Can always download a non RAW data
    CommonDomain.DATA_TYPES.forEach((dt) => {
      if (dt !== CommonDomain.DATA_TYPES_ENUM.RAWDATA) {
        assert.isTrue(QuotaDownloadUtils.canDownload(true, dt, true, { downloadDisabled: false }, null))
        assert.isTrue(QuotaDownloadUtils.canDownload(true, dt, false, { downloadDisabled: false }, null))
        assert.isTrue(QuotaDownloadUtils.canDownload(true, dt, true, { downloadDisabled: true }, null))
        assert.isTrue(QuotaDownloadUtils.canDownload(true, dt, false, { downloadDisabled: true }, null))
      }
    })
    // C - Externally stored raw data: can always download
    assert.isTrue(QuotaDownloadUtils.canDownload(true, CommonDomain.DATA_TYPES_ENUM.RAWDATA, true, { downloadDisabled: false }, null))
    assert.isTrue(QuotaDownloadUtils.canDownload(true, CommonDomain.DATA_TYPES_ENUM.RAWDATA, true, { downloadDisabled: true }, null))

    // D - Internally stored raw data: depends on quota and authentication status
    assert.isTrue(QuotaDownloadUtils.canDownload(true, CommonDomain.DATA_TYPES_ENUM.RAWDATA, false, { downloadDisabled: false }, 'testToken'))
    assert.isFalse(QuotaDownloadUtils.canDownload(true, CommonDomain.DATA_TYPES_ENUM.RAWDATA, false, { downloadDisabled: false }, null))
    assert.isFalse(QuotaDownloadUtils.canDownload(true, CommonDomain.DATA_TYPES_ENUM.RAWDATA, false, { downloadDisabled: true }, 'testToken'))
  })
})
