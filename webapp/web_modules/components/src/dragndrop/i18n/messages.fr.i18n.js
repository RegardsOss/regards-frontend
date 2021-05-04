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
  'toponym.uploader.drop.too-many-file': 'L\'import d\'une zone d\'intérêt géographique se réalise à l\'aide d\'un seul fichier',
  'toponym.uploader.drop.unsupported-file': 'Formats supportés : shapefile au format zip ou geojson',
  'toponym.uploader.geojson.wrong-type': 'Le fichier geojson doit être une FeatureCollection',
  'toponym.uploader.geojson.invalid-nb-features': 'Votre zone d\'intérêt géographique doit contenir une seule entité/polygone',
  'toponym.uploader.zip.too-many-files': 'Le zip doit être composé d\'un shp et d\'un prj',
  'toponym.uploader.zip.missing-files': 'L\'archive ne contient pas les fichiers shp et prj attendus',
  'toponym.uploader.zip.parse.error': 'Echec de lecture de l\'archive : {reason}',
  'toponym.uploader.geojson.invalid-projection': 'Le fichier geojson doit être dans la projection CRS84',
  'dragndrop.title': 'Drag & Drop',
  'dragndrop.subtitle.toponym': 'Glissez déposez votre shapefile au format zip ou geojson',
}

export default messages