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
export default {
  date: {
    name: 'date',
    javaSqlType: 'timestamp',
    isPrimaryKey: false,
  },
  altitude: {
    name: 'altitude',
    javaSqlType: 'int4',
    isPrimaryKey: false,
  },
  latitude: {
    name: 'latitude',
    javaSqlType: 'float8',
    isPrimaryKey: false,
  },
  update: {
    name: 'update',
    javaSqlType: 'bool',
    isPrimaryKey: false,
  },
  id: {
    name: 'id',
    javaSqlType: 'int8',
    isPrimaryKey: true,
  },
  label: {
    name: 'label',
    javaSqlType: 'varchar',
    isPrimaryKey: false,
  },
  longitude: {
    name: 'longitude',
    javaSqlType: 'float8',
    isPrimaryKey: false,
  },
}
