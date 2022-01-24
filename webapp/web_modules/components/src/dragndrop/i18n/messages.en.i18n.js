/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'toponym.uploader.drop.unsupported-file': 'Supported formats : zip shapefile, KML, KMZ or GeoJSON',
  'toponym.uploader.geojson.wrong-type': 'GeoJSON file must be a FeatureCollection',
  'toponym.uploader.geojson.invalid-nb-features': 'Your area of interest must be restricted to a single feature/polygon',
  'toponym.uploader.zip.too-many-files': 'Zip file must be composed of one shp and one prj',
  'toponym.uploader.zip.missing-files': 'Zip file does not contain the expected shp and prj files',
  'toponym.uploader.zip.parse.error': 'Failure reading zip file : {reason}',
  'toponym.uploader.kmz.too-many-files': 'Zip file must be composed of one KML file',
  'toponym.uploader.kmz.missing-files': 'Zip file does not contain the expected KML file',
  'toponym.uploader.geojson.invalid-projection': 'GeoJSON file must in CRS84 projection',
  'dragndrop.title': 'Drag & Drop',
  'dragndrop.subtitle.toponym': 'Import your zip shapefile, KML, KMZ or GeoJSON',
}

export default messages
