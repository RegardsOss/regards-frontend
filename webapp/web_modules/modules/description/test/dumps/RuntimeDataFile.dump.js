/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * This files holds converted data files for runtime display
 * @author Raphaël Mechali
 */

export const pdfFile = {
  filename: 'file1.pdf',
  mimeType: 'application/pdf',
  filesize: 10000,
  uri: 'test://www.test.org/file1.pdf',
}

export const markdownFile = {
  filename: 'file2.md',
  mimeType: 'text/markdown',
  filesize: 5000,
  uri: 'test://www.test.org/file2.md?token=ABCDE&origin=test://www.origin.org',
}

export const javascriptFile = {
  filename: 'file3.js',
  mimeType: 'application/javascript',
  filesize: 1000000,
  uri: 'test://www.test.org/file3.js',
}

export const epubFile = {
  filename: 'file4.epub',
  mimeType: 'application/epub+zip',
  filesize: 100000,
  uri: 'test://www.test.org/file4.epub',
}
