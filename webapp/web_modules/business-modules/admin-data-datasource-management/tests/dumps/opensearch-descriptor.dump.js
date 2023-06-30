/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * OpenSearch descriptor dump for tests
 * @author Raphaël Mechali
 */

export const openSearchDescriptor = {
  shortName: '',
  description: 'Project Landsat-8',
  tags: '',
  contact: 'expptsc@cnes.fr',
  longName: 'Landsat-8',
  url: [
    {
      parameter: [
        {
          name: 'q',
          value: '{searchTerms}',
          title: 'Free text search',
        },
      ],
      template: 'https://theia.cnes.fr/atdistrib/rocket/\\#/search?q\u003d{searchTerms?}',
      type: 'text/html',
      rel: 'results',
      otherAttributes: {},
    },
    {
      parameter: [
        {
          name: 'q',
          value: '{searchTerms}',
          title: 'Free text search',
        },
        {
          name: 'maxRecords',
          value: '{count}',
          title: 'Number of results returned per page (default 50)',
          minInclusive: '1',
          maxInclusive: '500',
        },
        {
          name: 'index',
          value: '{startIndex}',
          minInclusive: '1',
        },
        {
          name: 'page',
          value: '{startPage}',
          minInclusive: '1',
        },
        {
          name: 'lang',
          value: '{language}',
          pattern: '^[a-z]{2}$',
          title: 'Two letters language code according to ISO 639-1',
        },
        {
          name: 'identifier',
          value: '{geo:uid}',
          title: 'Either resto identifier or productIdentifier',
        },
        {
          name: 'geometry',
          value: '{geo:geometry}',
          title: 'Region of Interest defined in Well Known Text standard (WKT) with coordinates in decimal degrees (EPSG:4326)',
        },
        {
          name: 'box',
          value: '{geo:box}',
          title: 'Region of Interest defined by \u0027west, south, east, north\u0027 coordinates of longitude, latitude, in decimal degrees (EPSG:4326)',
        },
        {
          name: 'name',
          value: '{geo:name}',
          title: 'Location string e.g. Paris, France',
        },
        {
          name: 'lon',
          value: '{geo:lon}',
          title: 'Longitude expressed in decimal degrees (EPSG:4326) - should be used with geo:lat',
          minInclusive: '-180',
          maxInclusive: '180',
        },
        {
          name: 'lat',
          value: '{geo:lat}',
          title: 'Latitude expressed in decimal degrees (EPSG:4326) - should be used with geo:lon',
          minInclusive: '-90',
          maxInclusive: '90',
        },
        {
          name: 'radius',
          value: '{geo:radius}',
          title: 'Expressed in meters - should be used with geo:lon and geo:lat',
          minInclusive: '1',
        },
        {
          name: 'startDate',
          value: '{time:start}',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?(|Z|[\\+\\-][0-9]{2}:[0-9]{2}))?$',
          title: 'Beginning of the time slice of the search query. Format should follow RFC-3339',
        },
        {
          name: 'completionDate',
          value: '{time:end}',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?(|Z|[\\+\\-][0-9]{2}:[0-9]{2}))?$',
          title: 'End of the time slice of the search query. Format should follow RFC-3339',
        },
        {
          name: 'parentIdentifier',
          value: '{eo:parentIdentifier}',
        },
        {
          options: [
            {
              value: 'REFLECTANCE',
            },
          ],
          name: 'productType',
          value: '{eo:productType}',
        },
        {
          options: [
            {
              value: 'LEVEL2A',
            },
          ],
          name: 'processingLevel',
          value: '{eo:processingLevel}',
        },
        {
          options: [
            {
              value: 'LANDSAT8',
            },
          ],
          name: 'platform',
          value: '{eo:platform}',
        },
        {
          options: [
            {
              value: 'OLITIRS',
            },
          ],
          name: 'instrument',
          value: '{eo:instrument}',
        },
        {
          name: 'resolution',
          value: '{eo:resolution}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Spatial resolution expressed in meters',
        },
        {
          name: 'organisationName',
          value: '{eo:organisationName}',
        },
        {
          name: 'orbitNumber',
          value: '{eo:orbitNumber}',
          minInclusive: '1',
        },
        {
          name: 'relativeOrbitNumber',
          value: '{eo:relativeOrbitNumber}',
          minInclusive: '1',
        },
        {
          options: [
            {
              value: 'XS',
            },
          ],
          name: 'sensorMode',
          value: '{eo:sensorMode}',
        },
        {
          name: 'zonegeo',
          value: '{eo:zonegeo}',
        },
        {
          options: [
            {
              value: '2017',
            },
            {
              value: '2018',
            },
            {
              value: '2019',
            },
          ],
          name: 'year',
          value: '{eo:year}',
        },
        {
          name: 'OSOsite',
          value: '{eo:OSOsite}',
        },
        {
          name: 'OSOcountry',
          value: '{eo:OSOcountry}',
        },
        {
          options: [
            {
              value: 'Andorra',
            },
            {
              value: 'Antigua and Barbuda',
            },
            {
              value: 'Belgium',
            },
            {
              value: 'Brazil',
            },
            {
              value: 'Comoros',
            },
            {
              value: 'Dominica',
            },
            {
              value: 'France',
            },
            {
              value: 'French Polynesia',
            },
            {
              value: 'Germany',
            },
            {
              value: 'Guernsey',
            },
            {
              value: 'Italy',
            },
            {
              value: 'Jersey',
            },
            {
              value: 'Luxembourg',
            },
            {
              value: 'Monaco',
            },
            {
              value: 'Netherlands',
            },
            {
              value: 'New Caledonia',
            },
            {
              value: 'Spain',
            },
            {
              value: 'Suriname',
            },
            {
              value: 'Switzerland',
            },
            {
              value: 'United Kingdom',
            },
          ],
          name: 'country',
          value: '{eo:country}',
        },
        {
          options: [
            {
              value: 'Aargau',
            },
            {
              value: 'Ain',
            },
            {
              value: 'Aisne',
            },
            {
              value: 'Álava',
            },
            {
              value: 'Allier',
            },
            {
              value: 'Alpes-Maritimes',
            },
            {
              value: 'Amapá',
            },
            {
              value: 'Andjouân',
            },
            {
              value: 'Andorra la Vella',
            },
            {
              value: 'Aoste',
            },
            {
              value: 'Ardèche',
            },
            {
              value: 'Ardennes',
            },
            {
              value: 'Ariège',
            },
            {
              value: 'Aube',
            },
            {
              value: 'Aude',
            },
            {
              value: 'Aveyron',
            },
            {
              value: 'Baden-Württemberg',
            },
            {
              value: 'Barcelona',
            },
            {
              value: 'Basel-Landschaft',
            },
            {
              value: 'Basel-Stadt',
            },
            {
              value: 'Bas-Rhin',
            },
            {
              value: 'Bayern',
            },
            {
              value: 'Bern',
            },
            {
              value: 'Bizkaia',
            },
            {
              value: 'Bouches-du-Rhône',
            },
            {
              value: 'Brokopondo',
            },
            {
              value: 'Bromley',
            },
            {
              value: 'Brussels',
            },
            {
              value: 'Burgos',
            },
            {
              value: 'Calvados',
            },
            {
              value: 'Canillo',
            },
            {
              value: 'Cantabria',
            },
            {
              value: 'Cantal',
            },
            {
              value: 'Castellón',
            },
            {
              value: 'Charente',
            },
            {
              value: 'Charente-Maritime',
            },
            {
              value: 'Cher',
            },
            {
              value: 'Corrèze',
            },
            {
              value: 'Corse-du-Sud',
            },
            {
              value: 'Côte-d\u0027\u0027Or',
            },
            {
              value: 'Côtes-d\u0027\u0027Armor',
            },
            {
              value: 'Creuse',
            },
            {
              value: 'Cuneo',
            },
            {
              value: 'Deux-Sèvres',
            },
            {
              value: 'Diekirch',
            },
            {
              value: 'Dordogne',
            },
            {
              value: 'Dorset',
            },
            {
              value: 'Doubs',
            },
            {
              value: 'Drôme',
            },
            {
              value: 'East Flanders',
            },
            {
              value: 'Encamp',
            },
            {
              value: 'Escaldes-Engordany',
            },
            {
              value: 'Eure',
            },
            {
              value: 'Eure-et-Loir',
            },
            {
              value: 'Finistère',
            },
            {
              value: 'Fribourg',
            },
            {
              value: 'Gard',
            },
            {
              value: 'Genève',
            },
            {
              value: 'Gerona',
            },
            {
              value: 'Gers',
            },
            {
              value: 'Gipuzkoa',
            },
            {
              value: 'Gironde',
            },
            {
              value: 'Grevenmacher',
            },
            {
              value: 'Guadeloupe',
            },
            {
              value: 'Guyane française',
            },
            {
              value: 'Hainaut',
            },
            {
              value: 'Haute-Corse',
            },
            {
              value: 'Haute-Garonne',
            },
            {
              value: 'Haute-Loire',
            },
            {
              value: 'Haute-Marne',
            },
            {
              value: 'Haute-Rhin',
            },
            {
              value: 'Hautes-Alpes',
            },
            {
              value: 'Haute-Saône',
            },
            {
              value: 'Haute-Savoie',
            },
            {
              value: 'Hautes-Pyrénées',
            },
            {
              value: 'Haute-Vienne',
            },
            {
              value: 'Hérault',
            },
            {
              value: 'Hessen',
            },
            {
              value: 'Huesca',
            },
            {
              value: 'Ille-et-Vilaine',
            },
            {
              value: 'Imperia',
            },
            {
              value: 'Indre',
            },
            {
              value: 'Indre-et-Loire',
            },
            {
              value: 'Isère',
            },
            {
              value: 'Jersey',
            },
            {
              value: 'Jura',
            },
            {
              value: 'Kent',
            },
            {
              value: 'La Massana',
            },
            {
              value: 'Landes',
            },
            {
              value: 'La Réunion',
            },
            {
              value: 'La Rioja',
            },
            {
              value: 'Lérida',
            },
            {
              value: 'Liege',
            },
            {
              value: 'Limburg',
            },
            {
              value: 'Livorno',
            },
            {
              value: 'Loire',
            },
            {
              value: 'Loire-Atlantique',
            },
            {
              value: 'Loiret',
            },
            {
              value: 'Lot',
            },
            {
              value: 'Lot-et-Garonne',
            },
            {
              value: 'Lozère',
            },
            {
              value: 'Luxembourg',
            },
            {
              value: 'Maine-et-Loire',
            },
            {
              value: 'Manche',
            },
            {
              value: 'Marne',
            },
            {
              value: 'Marowijne',
            },
            {
              value: 'Martinique',
            },
            {
              value: 'Mayenne',
            },
            {
              value: 'Mayotte',
            },
            {
              value: 'Meurhe-et-Moselle',
            },
            {
              value: 'Meuse',
            },
            {
              value: 'Monaco',
            },
            {
              value: 'Morbihan',
            },
            {
              value: 'Moselle',
            },
            {
              value: 'Navarra',
            },
            {
              value: 'Neuchâtel',
            },
            {
              value: 'Nièvre',
            },
            {
              value: 'Noord-Brabant',
            },
            {
              value: 'Nord',
            },
            {
              value: 'Nordrhein-Westfalen',
            },
            {
              value: 'Oise',
            },
            {
              value: 'Olbia-Tempio',
            },
            {
              value: 'Ordino',
            },
            {
              value: 'Orne',
            },
            {
              value: 'Para',
            },
            {
              value: 'Pará',
            },
            {
              value: 'Pas-de-Calais',
            },
            {
              value: 'Puy-de-Dôme',
            },
            {
              value: 'Pyrénées-Atlantiques',
            },
            {
              value: 'Pyrénées-Orientales',
            },
            {
              value: 'Rheinland-Pfalz',
            },
            {
              value: 'Saarland',
            },
            {
              value: 'Saint Andrew',
            },
            {
              value: 'Saint David',
            },
            {
              value: 'Saint George',
            },
            {
              value: 'Saint John',
            },
            {
              value: 'Saint Joseph',
            },
            {
              value: 'Saint Luke',
            },
            {
              value: 'Saint Mark',
            },
            {
              value: 'Saint Mary',
            },
            {
              value: 'Saint Patrick',
            },
            {
              value: 'Saint Paul',
            },
            {
              value: 'Saint Peter',
            },
            {
              value: 'Saint Philip',
            },
            {
              value: 'Sant Julià de Lòria',
            },
            {
              value: 'Saône-et-Loire',
            },
            {
              value: 'Sark',
            },
            {
              value: 'Sarthe',
            },
            {
              value: 'Savoie',
            },
            {
              value: 'Schaffhausen',
            },
            {
              value: 'Seine-et-Marne',
            },
            {
              value: 'Seine-Maritime',
            },
            {
              value: 'Sipaliwini',
            },
            {
              value: 'Solothurn',
            },
            {
              value: 'Somme',
            },
            {
              value: 'Soria',
            },
            {
              value: 'Sud',
            },
            {
              value: 'Tarn',
            },
            {
              value: 'Tarn-et-Garonne',
            },
            {
              value: 'Tarragona',
            },
            {
              value: 'Teruel',
            },
            {
              value: 'Turin',
            },
            {
              value: '_unknown',
            },
            {
              value: 'Valais',
            },
            {
              value: 'Var',
            },
            {
              value: 'Vaucluse',
            },
            {
              value: 'Vaud',
            },
            {
              value: 'Vendée',
            },
            {
              value: 'Vienne',
            },
            {
              value: 'Vosges',
            },
            {
              value: 'West Flanders',
            },
            {
              value: 'Windward Islands',
            },
            {
              value: 'Yonne',
            },
            {
              value: 'Yvelines',
            },
            {
              value: 'Zaragoza',
            },
            {
              value: 'Zeeland',
            },
          ],
          name: 'state',
          value: '{eo:state}',
        },
        {
          name: 'cloudCover',
          value: '{eo:cloudCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Cloud cover expressed in percent',
        },
        {
          name: 'snowCover',
          value: '{eo:snowCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Snow cover expressed in percent',
        },
        {
          name: 'cultivatedCover',
          value: '{resto:cultivatedCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Cultivated area expressed in percent',
        },
        {
          name: 'desertCover',
          value: '{resto:desertCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Desert area expressed in percent',
        },
        {
          name: 'floodedCover',
          value: '{resto:floodedCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Flooded area expressed in percent',
        },
        {
          name: 'forestCover',
          value: '{resto:forestCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Forest area expressed in percent',
        },
        {
          name: 'herbaceousCover',
          value: '{resto:herbaceousCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Herbaceous area expressed in percent',
        },
        {
          name: 'iceCover',
          value: '{resto:iceCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Ice area expressed in percent',
        },
        {
          name: 'urbanCover',
          value: '{resto:urbanCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Urban area expressed in percent',
        },
        {
          name: 'waterCover',
          value: '{resto:waterCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Water area expressed in percent',
        },
        {
          name: 'updated',
          value: '{dc:date}',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?(|Z|[\\+\\-][0-9]{2}:[0-9]{2}))?$',
          title: 'Last update of the product within database',
        },
        {
          name: 'percentSaturatedPixelsMax',
          value: '{resto:percentSaturatedPixelsMax}',
          title: 'Saturated pixels expressed in percent',
        },
        {
          name: 'percentNoDataPixelsMax',
          value: '{resto:percentNoDataPixelsMax}',
          title: 'Nodata pixels expressed in percent',
        },
        {
          name: 'nbColInterpolationErrorMax',
          value: '{resto:nbColInterpolationErrorMax}',
          title: 'Nb col interpolation error expressed in maximum',
        },
        {
          name: 'percentGroundUsefulPixels',
          value: '{resto:percentGroundUsefulPixels}',
          title: 'Ground useful pixels expressed in percent',
        },
        {
          name: 'percentUsefulPixelsMin',
          value: '{resto:percentUsefulPixelsMin}',
          title: 'Useful pixels expressed in percent',
        },
        {
          options: [
            {
              value: 'Coastal',
            },
            {
              value: 'Northern',
            },
            {
              value: 'Southern',
            },
            {
              value: 'Tropical',
            },
          ],
          name: 'location',
          value: '{eo:location}',
        },
        {
          name: 'tileId',
          value: '{ptsc:tileId}',
        },
      ],
      template: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/search.atom?q\u003d{searchTerms?}\u0026maxRecords\u003d{count?}\u0026index\u003d{startIndex?}\u0026page\u003d{startPage?}\u0026lang\u003d{language?}\u0026identifier\u003d{geo:uid?}\u0026geometry\u003d{geo:geometry?}\u0026box\u003d{geo:box?}\u0026name\u003d{geo:name?}\u0026lon\u003d{geo:lon?}\u0026lat\u003d{geo:lat?}\u0026radius\u003d{geo:radius?}\u0026startDate\u003d{time:start?}\u0026completionDate\u003d{time:end?}\u0026parentIdentifier\u003d{eo:parentIdentifier?}\u0026productType\u003d{eo:productType?}\u0026processingLevel\u003d{eo:processingLevel?}\u0026platform\u003d{eo:platform?}\u0026instrument\u003d{eo:instrument?}\u0026resolution\u003d{eo:resolution?}\u0026organisationName\u003d{eo:organisationName?}\u0026orbitNumber\u003d{eo:orbitNumber?}\u0026relativeOrbitNumber\u003d{eo:relativeOrbitNumber?}\u0026sensorMode\u003d{eo:sensorMode?}\u0026zonegeo\u003d{eo:zonegeo?}\u0026year\u003d{eo:year?}\u0026OSOsite\u003d{eo:OSOsite?}\u0026OSOcountry\u003d{eo:OSOcountry?}\u0026country\u003d{eo:country?}\u0026state\u003d{eo:state?}\u0026cloudCover\u003d{eo:cloudCover?}\u0026snowCover\u003d{eo:snowCover?}\u0026cultivatedCover\u003d{resto:cultivatedCover?}\u0026desertCover\u003d{resto:desertCover?}\u0026floodedCover\u003d{resto:floodedCover?}\u0026forestCover\u003d{resto:forestCover?}\u0026herbaceousCover\u003d{resto:herbaceousCover?}\u0026iceCover\u003d{resto:iceCover?}\u0026urbanCover\u003d{resto:urbanCover?}\u0026waterCover\u003d{resto:waterCover?}\u0026updated\u003d{dc:date?}\u0026percentSaturatedPixelsMax\u003d{resto:percentSaturatedPixelsMax?}\u0026percentNoDataPixelsMax\u003d{resto:percentNoDataPixelsMax?}\u0026nbColInterpolationErrorMax\u003d{resto:nbColInterpolationErrorMax?}\u0026percentGroundUsefulPixels\u003d{resto:percentGroundUsefulPixels?}\u0026percentUsefulPixelsMin\u003d{resto:percentUsefulPixelsMin?}\u0026location\u003d{eo:location?}\u0026tileId\u003d{ptsc:tileId?}\u0026location\u003d{muscate:location?}',
      type: 'application/atom+xml',
      rel: 'results',
      otherAttributes: {},
    },
    {
      parameter: [
        {
          name: 'q',
          value: '{searchTerms}',
          title: 'Free text search',
        },
        {
          name: 'maxRecords',
          value: '{count}',
          title: 'Number of results returned per page (default 50)',
          minInclusive: '1',
          maxInclusive: '500',
        },
        {
          name: 'index',
          value: '{startIndex}',
          minInclusive: '1',
        },
        {
          name: 'page',
          value: '{startPage}',
          minInclusive: '1',
        },
        {
          name: 'lang',
          value: '{language}',
          pattern: '^[a-z]{2}$',
          title: 'Two letters language code according to ISO 639-1',
        },
        {
          name: 'identifier',
          value: '{geo:uid}',
          title: 'Either resto identifier or productIdentifier',
        },
        {
          name: 'geometry',
          value: '{geo:geometry}',
          title: 'Region of Interest defined in Well Known Text standard (WKT) with coordinates in decimal degrees (EPSG:4326)',
        },
        {
          name: 'box',
          value: '{geo:box}',
          title: 'Region of Interest defined by \u0027west, south, east, north\u0027 coordinates of longitude, latitude, in decimal degrees (EPSG:4326)',
        },
        {
          name: 'name',
          value: '{geo:name}',
          title: 'Location string e.g. Paris, France',
        },
        {
          name: 'lon',
          value: '{geo:lon}',
          title: 'Longitude expressed in decimal degrees (EPSG:4326) - should be used with geo:lat',
          minInclusive: '-180',
          maxInclusive: '180',
        },
        {
          name: 'lat',
          value: '{geo:lat}',
          title: 'Latitude expressed in decimal degrees (EPSG:4326) - should be used with geo:lon',
          minInclusive: '-90',
          maxInclusive: '90',
        },
        {
          name: 'radius',
          value: '{geo:radius}',
          title: 'Expressed in meters - should be used with geo:lon and geo:lat',
          minInclusive: '1',
        },
        {
          name: 'startDate',
          value: '{time:start}',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?(|Z|[\\+\\-][0-9]{2}:[0-9]{2}))?$',
          title: 'Beginning of the time slice of the search query. Format should follow RFC-3339',
        },
        {
          name: 'completionDate',
          value: '{time:end}',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?(|Z|[\\+\\-][0-9]{2}:[0-9]{2}))?$',
          title: 'End of the time slice of the search query. Format should follow RFC-3339',
        },
        {
          name: 'parentIdentifier',
          value: '{eo:parentIdentifier}',
        },
        {
          options: [
            {
              value: 'REFLECTANCE',
            },
          ],
          name: 'productType',
          value: '{eo:productType}',
        },
        {
          options: [
            {
              value: 'LEVEL2A',
            },
          ],
          name: 'processingLevel',
          value: '{eo:processingLevel}',
        },
        {
          options: [
            {
              value: 'LANDSAT8',
            },
          ],
          name: 'platform',
          value: '{eo:platform}',
        },
        {
          options: [
            {
              value: 'OLITIRS',
            },
          ],
          name: 'instrument',
          value: '{eo:instrument}',
        },
        {
          name: 'resolution',
          value: '{eo:resolution}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Spatial resolution expressed in meters',
        },
        {
          name: 'organisationName',
          value: '{eo:organisationName}',
        },
        {
          name: 'orbitNumber',
          value: '{eo:orbitNumber}',
          minInclusive: '1',
        },
        {
          name: 'relativeOrbitNumber',
          value: '{eo:relativeOrbitNumber}',
          minInclusive: '1',
        },
        {
          options: [
            {
              value: 'XS',
            },
          ],
          name: 'sensorMode',
          value: '{eo:sensorMode}',
        },
        {
          name: 'zonegeo',
          value: '{eo:zonegeo}',
        },
        {
          options: [
            {
              value: '2017',
            },
            {
              value: '2018',
            },
            {
              value: '2019',
            },
          ],
          name: 'year',
          value: '{eo:year}',
        },
        {
          name: 'OSOsite',
          value: '{eo:OSOsite}',
        },
        {
          name: 'OSOcountry',
          value: '{eo:OSOcountry}',
        },
        {
          options: [
            {
              value: 'Andorra',
            },
            {
              value: 'Antigua and Barbuda',
            },
            {
              value: 'Belgium',
            },
            {
              value: 'Brazil',
            },
            {
              value: 'Comoros',
            },
            {
              value: 'Dominica',
            },
            {
              value: 'France',
            },
            {
              value: 'French Polynesia',
            },
            {
              value: 'Germany',
            },
            {
              value: 'Guernsey',
            },
            {
              value: 'Italy',
            },
            {
              value: 'Jersey',
            },
            {
              value: 'Luxembourg',
            },
            {
              value: 'Monaco',
            },
            {
              value: 'Netherlands',
            },
            {
              value: 'New Caledonia',
            },
            {
              value: 'Spain',
            },
            {
              value: 'Suriname',
            },
            {
              value: 'Switzerland',
            },
            {
              value: 'United Kingdom',
            },
          ],
          name: 'country',
          value: '{eo:country}',
        },
        {
          options: [
            {
              value: 'Aargau',
            },
            {
              value: 'Ain',
            },
            {
              value: 'Aisne',
            },
            {
              value: 'Álava',
            },
            {
              value: 'Allier',
            },
            {
              value: 'Alpes-Maritimes',
            },
            {
              value: 'Amapá',
            },
            {
              value: 'Andjouân',
            },
            {
              value: 'Andorra la Vella',
            },
            {
              value: 'Aoste',
            },
            {
              value: 'Ardèche',
            },
            {
              value: 'Ardennes',
            },
            {
              value: 'Ariège',
            },
            {
              value: 'Aube',
            },
            {
              value: 'Aude',
            },
            {
              value: 'Aveyron',
            },
            {
              value: 'Baden-Württemberg',
            },
            {
              value: 'Barcelona',
            },
            {
              value: 'Basel-Landschaft',
            },
            {
              value: 'Basel-Stadt',
            },
            {
              value: 'Bas-Rhin',
            },
            {
              value: 'Bayern',
            },
            {
              value: 'Bern',
            },
            {
              value: 'Bizkaia',
            },
            {
              value: 'Bouches-du-Rhône',
            },
            {
              value: 'Brokopondo',
            },
            {
              value: 'Bromley',
            },
            {
              value: 'Brussels',
            },
            {
              value: 'Burgos',
            },
            {
              value: 'Calvados',
            },
            {
              value: 'Canillo',
            },
            {
              value: 'Cantabria',
            },
            {
              value: 'Cantal',
            },
            {
              value: 'Castellón',
            },
            {
              value: 'Charente',
            },
            {
              value: 'Charente-Maritime',
            },
            {
              value: 'Cher',
            },
            {
              value: 'Corrèze',
            },
            {
              value: 'Corse-du-Sud',
            },
            {
              value: 'Côte-d\u0027\u0027Or',
            },
            {
              value: 'Côtes-d\u0027\u0027Armor',
            },
            {
              value: 'Creuse',
            },
            {
              value: 'Cuneo',
            },
            {
              value: 'Deux-Sèvres',
            },
            {
              value: 'Diekirch',
            },
            {
              value: 'Dordogne',
            },
            {
              value: 'Dorset',
            },
            {
              value: 'Doubs',
            },
            {
              value: 'Drôme',
            },
            {
              value: 'East Flanders',
            },
            {
              value: 'Encamp',
            },
            {
              value: 'Escaldes-Engordany',
            },
            {
              value: 'Eure',
            },
            {
              value: 'Eure-et-Loir',
            },
            {
              value: 'Finistère',
            },
            {
              value: 'Fribourg',
            },
            {
              value: 'Gard',
            },
            {
              value: 'Genève',
            },
            {
              value: 'Gerona',
            },
            {
              value: 'Gers',
            },
            {
              value: 'Gipuzkoa',
            },
            {
              value: 'Gironde',
            },
            {
              value: 'Grevenmacher',
            },
            {
              value: 'Guadeloupe',
            },
            {
              value: 'Guyane française',
            },
            {
              value: 'Hainaut',
            },
            {
              value: 'Haute-Corse',
            },
            {
              value: 'Haute-Garonne',
            },
            {
              value: 'Haute-Loire',
            },
            {
              value: 'Haute-Marne',
            },
            {
              value: 'Haute-Rhin',
            },
            {
              value: 'Hautes-Alpes',
            },
            {
              value: 'Haute-Saône',
            },
            {
              value: 'Haute-Savoie',
            },
            {
              value: 'Hautes-Pyrénées',
            },
            {
              value: 'Haute-Vienne',
            },
            {
              value: 'Hérault',
            },
            {
              value: 'Hessen',
            },
            {
              value: 'Huesca',
            },
            {
              value: 'Ille-et-Vilaine',
            },
            {
              value: 'Imperia',
            },
            {
              value: 'Indre',
            },
            {
              value: 'Indre-et-Loire',
            },
            {
              value: 'Isère',
            },
            {
              value: 'Jersey',
            },
            {
              value: 'Jura',
            },
            {
              value: 'Kent',
            },
            {
              value: 'La Massana',
            },
            {
              value: 'Landes',
            },
            {
              value: 'La Réunion',
            },
            {
              value: 'La Rioja',
            },
            {
              value: 'Lérida',
            },
            {
              value: 'Liege',
            },
            {
              value: 'Limburg',
            },
            {
              value: 'Livorno',
            },
            {
              value: 'Loire',
            },
            {
              value: 'Loire-Atlantique',
            },
            {
              value: 'Loiret',
            },
            {
              value: 'Lot',
            },
            {
              value: 'Lot-et-Garonne',
            },
            {
              value: 'Lozère',
            },
            {
              value: 'Luxembourg',
            },
            {
              value: 'Maine-et-Loire',
            },
            {
              value: 'Manche',
            },
            {
              value: 'Marne',
            },
            {
              value: 'Marowijne',
            },
            {
              value: 'Martinique',
            },
            {
              value: 'Mayenne',
            },
            {
              value: 'Mayotte',
            },
            {
              value: 'Meurhe-et-Moselle',
            },
            {
              value: 'Meuse',
            },
            {
              value: 'Monaco',
            },
            {
              value: 'Morbihan',
            },
            {
              value: 'Moselle',
            },
            {
              value: 'Navarra',
            },
            {
              value: 'Neuchâtel',
            },
            {
              value: 'Nièvre',
            },
            {
              value: 'Noord-Brabant',
            },
            {
              value: 'Nord',
            },
            {
              value: 'Nordrhein-Westfalen',
            },
            {
              value: 'Oise',
            },
            {
              value: 'Olbia-Tempio',
            },
            {
              value: 'Ordino',
            },
            {
              value: 'Orne',
            },
            {
              value: 'Para',
            },
            {
              value: 'Pará',
            },
            {
              value: 'Pas-de-Calais',
            },
            {
              value: 'Puy-de-Dôme',
            },
            {
              value: 'Pyrénées-Atlantiques',
            },
            {
              value: 'Pyrénées-Orientales',
            },
            {
              value: 'Rheinland-Pfalz',
            },
            {
              value: 'Saarland',
            },
            {
              value: 'Saint Andrew',
            },
            {
              value: 'Saint David',
            },
            {
              value: 'Saint George',
            },
            {
              value: 'Saint John',
            },
            {
              value: 'Saint Joseph',
            },
            {
              value: 'Saint Luke',
            },
            {
              value: 'Saint Mark',
            },
            {
              value: 'Saint Mary',
            },
            {
              value: 'Saint Patrick',
            },
            {
              value: 'Saint Paul',
            },
            {
              value: 'Saint Peter',
            },
            {
              value: 'Saint Philip',
            },
            {
              value: 'Sant Julià de Lòria',
            },
            {
              value: 'Saône-et-Loire',
            },
            {
              value: 'Sark',
            },
            {
              value: 'Sarthe',
            },
            {
              value: 'Savoie',
            },
            {
              value: 'Schaffhausen',
            },
            {
              value: 'Seine-et-Marne',
            },
            {
              value: 'Seine-Maritime',
            },
            {
              value: 'Sipaliwini',
            },
            {
              value: 'Solothurn',
            },
            {
              value: 'Somme',
            },
            {
              value: 'Soria',
            },
            {
              value: 'Sud',
            },
            {
              value: 'Tarn',
            },
            {
              value: 'Tarn-et-Garonne',
            },
            {
              value: 'Tarragona',
            },
            {
              value: 'Teruel',
            },
            {
              value: 'Turin',
            },
            {
              value: '_unknown',
            },
            {
              value: 'Valais',
            },
            {
              value: 'Var',
            },
            {
              value: 'Vaucluse',
            },
            {
              value: 'Vaud',
            },
            {
              value: 'Vendée',
            },
            {
              value: 'Vienne',
            },
            {
              value: 'Vosges',
            },
            {
              value: 'West Flanders',
            },
            {
              value: 'Windward Islands',
            },
            {
              value: 'Yonne',
            },
            {
              value: 'Yvelines',
            },
            {
              value: 'Zaragoza',
            },
            {
              value: 'Zeeland',
            },
          ],
          name: 'state',
          value: '{eo:state}',
        },
        {
          name: 'cloudCover',
          value: '{eo:cloudCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Cloud cover expressed in percent',
        },
        {
          name: 'snowCover',
          value: '{eo:snowCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Snow cover expressed in percent',
        },
        {
          name: 'cultivatedCover',
          value: '{resto:cultivatedCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Cultivated area expressed in percent',
        },
        {
          name: 'desertCover',
          value: '{resto:desertCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Desert area expressed in percent',
        },
        {
          name: 'floodedCover',
          value: '{resto:floodedCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Flooded area expressed in percent',
        },
        {
          name: 'forestCover',
          value: '{resto:forestCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Forest area expressed in percent',
        },
        {
          name: 'herbaceousCover',
          value: '{resto:herbaceousCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Herbaceous area expressed in percent',
        },
        {
          name: 'iceCover',
          value: '{resto:iceCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Ice area expressed in percent',
        },
        {
          name: 'urbanCover',
          value: '{resto:urbanCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Urban area expressed in percent',
        },
        {
          name: 'waterCover',
          value: '{resto:waterCover}',
          pattern: '^(\\[|\\]|[0-9])?[0-9]+$|^[0-9]+?(\\[|\\])$|^(\\[|\\])[0-9]+,[0-9]+(\\[|\\])$',
          title: 'Water area expressed in percent',
        },
        {
          name: 'updated',
          value: '{dc:date}',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?(|Z|[\\+\\-][0-9]{2}:[0-9]{2}))?$',
          title: 'Last update of the product within database',
        },
        {
          name: 'percentSaturatedPixelsMax',
          value: '{resto:percentSaturatedPixelsMax}',
          title: 'Saturated pixels expressed in percent',
        },
        {
          name: 'percentNoDataPixelsMax',
          value: '{resto:percentNoDataPixelsMax}',
          title: 'Nodata pixels expressed in percent',
        },
        {
          name: 'nbColInterpolationErrorMax',
          value: '{resto:nbColInterpolationErrorMax}',
          title: 'Nb col interpolation error expressed in maximum',
        },
        {
          name: 'percentGroundUsefulPixels',
          value: '{resto:percentGroundUsefulPixels}',
          title: 'Ground useful pixels expressed in percent',
        },
        {
          name: 'percentUsefulPixelsMin',
          value: '{resto:percentUsefulPixelsMin}',
          title: 'Useful pixels expressed in percent',
        },
        {
          options: [
            {
              value: 'Coastal',
            },
            {
              value: 'Northern',
            },
            {
              value: 'Southern',
            },
            {
              value: 'Tropical',
            },
          ],
          name: 'location',
          value: '{eo:location}',
        },
        {
          name: 'tileId',
          value: '{ptsc:tileId}',
        },
      ],
      template: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/search.json?q\u003d{searchTerms?}\u0026maxRecords\u003d{count?}\u0026index\u003d{startIndex?}\u0026page\u003d{startPage?}\u0026lang\u003d{language?}\u0026identifier\u003d{geo:uid?}\u0026geometry\u003d{geo:geometry?}\u0026box\u003d{geo:box?}\u0026name\u003d{geo:name?}\u0026lon\u003d{geo:lon?}\u0026lat\u003d{geo:lat?}\u0026radius\u003d{geo:radius?}\u0026startDate\u003d{time:start?}\u0026completionDate\u003d{time:end?}\u0026parentIdentifier\u003d{eo:parentIdentifier?}\u0026productType\u003d{eo:productType?}\u0026processingLevel\u003d{eo:processingLevel?}\u0026platform\u003d{eo:platform?}\u0026instrument\u003d{eo:instrument?}\u0026resolution\u003d{eo:resolution?}\u0026organisationName\u003d{eo:organisationName?}\u0026orbitNumber\u003d{eo:orbitNumber?}\u0026relativeOrbitNumber\u003d{eo:relativeOrbitNumber?}\u0026sensorMode\u003d{eo:sensorMode?}\u0026zonegeo\u003d{eo:zonegeo?}\u0026year\u003d{eo:year?}\u0026OSOsite\u003d{eo:OSOsite?}\u0026OSOcountry\u003d{eo:OSOcountry?}\u0026country\u003d{eo:country?}\u0026state\u003d{eo:state?}\u0026cloudCover\u003d{eo:cloudCover?}\u0026snowCover\u003d{eo:snowCover?}\u0026cultivatedCover\u003d{resto:cultivatedCover?}\u0026desertCover\u003d{resto:desertCover?}\u0026floodedCover\u003d{resto:floodedCover?}\u0026forestCover\u003d{resto:forestCover?}\u0026herbaceousCover\u003d{resto:herbaceousCover?}\u0026iceCover\u003d{resto:iceCover?}\u0026urbanCover\u003d{resto:urbanCover?}\u0026waterCover\u003d{resto:waterCover?}\u0026updated\u003d{dc:date?}\u0026percentSaturatedPixelsMax\u003d{resto:percentSaturatedPixelsMax?}\u0026percentNoDataPixelsMax\u003d{resto:percentNoDataPixelsMax?}\u0026nbColInterpolationErrorMax\u003d{resto:nbColInterpolationErrorMax?}\u0026percentGroundUsefulPixels\u003d{resto:percentGroundUsefulPixels?}\u0026percentUsefulPixelsMin\u003d{resto:percentUsefulPixelsMin?}\u0026location\u003d{eo:location?}\u0026tileId\u003d{ptsc:tileId?}\u0026location\u003d{muscate:location?}',
      type: 'application/json',
      rel: 'results',
      otherAttributes: {},
    },
  ],
  query: [
    {
      role: 'example',
      searchTerms: '',
      otherAttributes: {},
    },
  ],
  developer: '',
  attribution: 'CNES. Copyright 2015, All Rights Reserved',
  syndicationRight: 'open',
  adultContent: 'false',
  language: 'fr',
  inputEncoding: 'UTF-8',
  outputEncoding: 'UTF-8',
  otherAttributes: {
    '{http://www.w3.org/XML/1998/namespace}lang': 'en',
  },
}
