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
export default [
  {
    content: {
      id: 'aComplexErrorPlugin',
      pluginId: 'aComplexErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
        'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 'aSamplePlugin',
      pluginId: 'aSamplePlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '12345-6789-11',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'java.lang.String',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'isActive',
          type: 'java.lang.Boolean',
          paramType: 'PRIMITIVE',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 'aSampleErrorPlugin',
      pluginId: 'aSampleErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'java.lang.String',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'isActive',
          type: 'java.lang.Boolean',
          paramType: 'PRIMITIVE',
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 'aComplexPlugin',
      pluginId: 'aComplexPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'plgInterface',
          type: 'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
          paramType: 'PLUGIN',
        },
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'isActive',
          type: 'java.lang.Boolean',
          paramType: 'PRIMITIVE',
        },
      ],
    },
    links: [],
  },
]
