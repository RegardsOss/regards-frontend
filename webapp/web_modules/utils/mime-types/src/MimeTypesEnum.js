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
 * Most used Web mime types
 * @author Sébastien Binda
 */

/** Raw mime types definitions (subset accessed as constant throughout the application) */
export const MIME_TYPES = {
  TEXT: 'text/plain',
  CSS_MIME_TYPE: 'text/css',
  GIF_MIME_TYPE: 'image/gif',
  HTML_MIME_TYPE: 'text/html',
  JPEG_MIME_TYPE: 'image/jpeg',
  JAVASCRIPT_MIME_TYPE: 'application/javascript',
  JSON_MIME_TYPE: 'application/json',
  MARKDOWN_MIME_TYPE: 'text/markdown',
  PDF_MIME_TYPE: 'application/pdf',
  PNG_MIME_TYPE: 'image/png',
  SVG_MIME_TYPE: 'image/svg+xml',
  TIF_MIME_TYPE: 'image/tiff',
  XHTML_MIME_TYPE: 'application/xhtml+xml',
  XML_MIME_TYPE: 'application/xml',
  XML_TEXT_MIME_TYPE: 'text/xml',
}

/** Enumerated file extension, label and MIME types */
export const mimeTypesDefinitions = [
  { extension: '.aac', label: 'AAC audio file (AAC)', mime: 'audio/aac' },
  { extension: '.abw', label: 'AbiWord document (ABW)', mime: 'application/x-abiword' },
  { extension: '.arc', label: 'Archived files (ARC)', mime: 'application/octet-stream' },
  { extension: '.avi', label: 'AVI: Audio Video Interleave (AVI)', mime: 'video/x-msvideo' },
  { extension: '.azw', label: 'Amazon Kindle eBook format (AZW)', mime: 'application/vnd.amazon.ebook' },
  { extension: '.bin', label: 'Binary files (BIN)', mime: 'application/octet-stream' },
  { extension: '.bz', label: 'BZip archive (BZ)', mime: 'application/x-bzip' },
  { extension: '.bz2', label: 'BZip2 archive (BZ2)', mime: 'application/x-bzip2' },
  { extension: '.csh', label: 'Script C-Shell (CSH)', mime: 'application/x-csh' },
  { extension: '.css', label: 'Cascading Style Sheets (CSS)', mime: MIME_TYPES.CSS_MIME_TYPE },
  { extension: '.csv', label: 'Comma-separated values (CSV)', mime: 'text/csv' },
  { extension: '.doc', label: 'Microsoft Word (DOC)', mime: 'application/msword' },
  { extension: '.epub', label: 'Electronic publication EPUB', mime: 'application/epub+zip' },
  { extension: '.gif', label: 'Graphics Interchange Format - animated picture (GIF)', mime: MIME_TYPES.GIF_MIME_TYPE },
  { extension: '.htm', label: 'HyperText Markup Language (HTM)', mime: MIME_TYPES.HTML_MIME_TYPE },
  { extension: '.html', label: 'HyperText Markup Language (HTML)', mime: MIME_TYPES.HTML_MIME_TYPE },
  { extension: '.ico', label: 'Format icone (ICO)', mime: 'image/x-icon' },
  { extension: '.ics', label: 'Format iCalendar (ICS)', mime: 'text/calendar' },
  { extension: '.jar', label: 'Archive Java (JAR)', mime: 'application/java-archive' },
  { extension: '.jpeg', label: 'JPEG Image (JPEG)', mime: MIME_TYPES.JPEG_MIME_TYPE },
  { extension: '.jpg', label: 'JPEG Image (JPG)', mime: MIME_TYPES.JPEG_MIME_TYPE },
  { extension: '.js', label: 'JavaScript - ECMAScript (JS)', mime: MIME_TYPES.JAVASCRIPT_MIME_TYPE },
  { extension: '.json', label: 'JSON Format (JSON)', mime: MIME_TYPES.JSON_MIME_TYPE },
  { extension: '.md', label: 'Markdown Document (MD)', mime: MIME_TYPES.MARKDOWN_MIME_TYPE },
  { extension: '.mid', label: 'Musical Instrument Digital Interface (MID)', mime: 'audio/midi' },
  { extension: '.midi', label: 'Musical Instrument Digital Interface (MIDI)', mime: 'audio/midi' },
  { extension: '.mpeg', label: 'MPEG Video (MPEG)', mime: 'video/mpeg' },
  { extension: '.mpkg', label: 'Apple package (MPKG)', mime: 'application/vnd.apple.installer+xml' },
  { extension: '.odp', label: 'OpenDocument presentation Document (ODP)', mime: 'application/vnd.oasis.opendocument.presentation' },
  { extension: '.ods', label: 'OpenDocument spreadsheet document (ODS)', mime: 'application/vnd.oasis.opendocument.spreadsheet' },
  { extension: '.odt', label: 'OpenDocument text document (ODT)', mime: 'application/vnd.oasis.opendocument.text' },
  { extension: '.oga', label: 'OGG sound (OGA)', mime: 'audio/ogg' },
  { extension: '.ogv', label: 'OGG video (OGV)', mime: 'video/ogg' },
  { extension: '.ogx', label: 'OGG (OGX)', mime: 'application/ogg' },
  { extension: '.pdf', label: 'Adobe Portable Document Format (PDF)', mime: MIME_TYPES.PDF_MIME_TYPE },
  { extension: '.ppt', label: 'Microsoft PowerPoint (PPT)', mime: 'application/vnd.ms-powerpoint' },
  { extension: '.png', label: 'Portable Network Graphics picture (PNG)', mime: MIME_TYPES.PNG_MIME_TYPE },
  { extension: '.rar', label: 'Archive RAR (RAR)', mime: 'application/x-rar-compressed' },
  { extension: '.rtf', label: 'Rich Text Format (RTF)', mime: 'application/rtf' },
  { extension: '.sh', label: 'Bourne shell script (SH)', mime: 'application/x-sh' },
  { extension: '.svg', label: 'Scalable Vector Graphics (SVG)', mime: MIME_TYPES.SVG_MIME_TYPE },
  { extension: '.swf', label: 'Small web format (SWF) or Adobe Flash document', mime: 'application/x-shockwave-flash' },
  { extension: '.tar', label: 'Archive Tape (TAR)', mime: 'application/x-tar' },
  { extension: '.txt', label: 'Plain text file (TXT)', mime: MIME_TYPES.TEXT },
  { extension: '.tif', label: 'Tagged Image File Format (TIF)', mime: MIME_TYPES.TIF_MIME_TYPE },
  { extension: '.tiff', label: 'Tagged Image File Format (TIFF)', mime: MIME_TYPES.TIF_MIME_TYPE },
  { extension: '.ttf', label: 'Police TrueType (TTF)', mime: 'application/x-font-ttf' },
  { extension: '.vsd', label: 'Microsoft Visio (VSD)', mime: 'application/vnd.visio' },
  { extension: '.wav', label: 'Waveform sound (WAV)', mime: 'audio/x-wav' },
  { extension: '.weba', label: 'WEBM Sound (WEBA)', mime: 'audio/webm' },
  { extension: '.webm', label: 'WEBM Video (WEBM)', mime: 'video/webm' },
  { extension: '.webp', label: 'WEBP Image (WEBP)', mime: 'image/webp' },
  { extension: '.woff', label: 'Web Open Font Format (WOFF)', mime: 'application/x-font-woff' },
  { extension: '.xhtml', label: 'Extensible HyperText Markup Language (XHTML)', mime: MIME_TYPES.XHTML_MIME_TYPE },
  { extension: '.xls', label: 'Microsoft Excel (XLS)', mime: 'application/vnd.ms-excel' },
  { extension: '.xml', label: 'eXtensible Markup Language (XML)', mime: MIME_TYPES.XML_MIME_TYPE },
  { extension: '.xul', label: 'XML-based User interface Language (XUL)', mime: 'application/vnd.mozilla.xul+xml' },
  { extension: '.zip', label: 'ZIP archive (ZIP)', mime: 'application/zip' },
  { extension: '.7z', label: '7zip archive (7Z)', mime: 'application/x-7z-compressed' },
]
