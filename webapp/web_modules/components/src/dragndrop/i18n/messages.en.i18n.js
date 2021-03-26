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
const messages = {
  'toponym.uploader.drop.too-many-file': 'Import of a toponym is carried out using only one file',
  'toponym.uploader.drop.unsupported-file': 'Supported formats : zip shapefile or geojson',
  'toponym.uploader.geojson.wrong-type': 'Geojson file must be a FeatureCollection',
  'toponym.uploader.geojson.invalid-nb-features': 'Your toponym must contain only one feature',
  'toponym.uploader.zip.too-many-files': 'Zip file must be composed of one shp and one prj',
  'toponym.uploader.zip.missing-files': 'Zip file do not contains expected shp and prj files',
  'toponym.uploader.zip.parse.error': 'Failure reading zip file : {reason}',
  'toponym.uploader.geojson.invalid-projection': 'Geojson file must in CRS84 projection',
  'dragndrop.title': 'Drag & Drop',
  'dragndrop.subtitle.toponym': 'Import your zip shapefile or geojson',
}

export default messages
