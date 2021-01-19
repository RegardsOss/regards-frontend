/*
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 *
 * This file is a work derived from MIZAR
 *
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of MIZAR.
 *
 * MIZAR is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MIZAR is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MIZAR. If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/

require.config({
  baseUrl: '/mizar/src',
  name: 'mizar',
  include: ['mizar'],
  insertRequire: ['mizar'],
  out: '../build/generated/mizar.min.js',
  optimize: 'uglify2',
  waitSeconds: 300,
  onBuildWrite(name, path, contents) {
    return contents
      .replace(/define\s*\([^{]*?{/, '')
      .replace(/\s*return\s+[^}]+(\}\);[^\w}]*)$/, '')
      .replace(/\}\);[^}\w]*$/, '')
  },
  paths: {
    path: '/mizar/node_modules/path/path',
    fits: '/mizar/external/fits',
    'underscore-min': '/mizar/node_modules/underscore/underscore-min',
    jquery: '/mizar/node_modules/jquery/dist/jquery.min',
    'jquery.ui': '/mizar/node_modules/jquery-ui-dist/jquery-ui.min',
    wcs: '/mizar/external/wcs',
    samp: '/mizar/external/samp',
    string: '/mizar/node_modules/string/dist/string',
    gzip: '/mizar/external/gzip.min',
    saveAs: '/mizar/node_modules/file-saver/FileSaver.min',
    jszip: '/mizar/node_modules/jszip/dist/jszip.min',
    xmltojson: '/mizar/node_modules/xmltojson/lib/xmlToJSON.min',
    'wms-capabilities': '/mizar/node_modules/wms-capabilities/dist/wms-capabilities',
    moment: '/mizar/node_modules/moment/min/moment-with-locales.min',
  },
  shim: {
    'underscore-min': {
      exports: '_',
      init() {
        // eslint-disable-next-line no-undef
        return _.noConflict()
      },
    },
    jquery: {
      exports: '$',
    },
  },
})
