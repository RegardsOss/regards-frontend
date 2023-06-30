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
 * Yeoman generator to create REGARDS UI plugins.
 * @author Sébastien Binda
 */
const Generator = require('yeoman-generator')

module.exports = class extends Generator {

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      required: true,
      message: 'Your module name',
      default: this.appname, // Default to current folder name
    }, {
      type: 'input',
      name: 'description',
      required: true,
      message: 'Simple description of your module',
    }, {
      type: 'input',
      name: 'author',
      required: true,
      message: 'Module author name',
    }, {
      type: 'input',
      name: 'company',
      required: true,
      message: 'Module author company',
    }, {
      type: 'input',
      name: 'licence',
      required: true,
      message: 'License',
      default: 'GPL-V3',
    },
    ]).then((answers) => {
      this.answers = answers
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('module'),
      this.destinationPath(this.answers.name),
      this.answers)
  }

}
