/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'country.AC': 'Ascension Island',
  'country.AD': 'Andorra',
  'country.AE': 'United Arab Emirates',
  'country.AF': 'Afghanistan',
  'country.AG': 'Antigua and Barbuda',
  'country.AI': 'Anguilla',
  'country.AL': 'Albania',
  'country.AM': 'Armenia',
  'country.AO': 'Angola',
  'country.AQ': 'Antarctica',
  'country.AR': 'Argentina',
  'country.AS': 'American Samoa',
  'country.AT': 'Austria',
  'country.AU': 'Australia',
  'country.AW': 'Aruba',
  'country.AX': 'Åland Islands',
  'country.AZ': 'Azerbaijan',
  'country.BA': 'Bosnia and Herzegovina',
  'country.BB': 'Barbados',
  'country.BD': 'Bangladesh',
  'country.BE': 'Belgium',
  'country.BF': 'Burkina Faso',
  'country.BG': 'Bulgaria',
  'country.BH': 'Bahrain',
  'country.BI': 'Burundi',
  'country.BJ': 'Benin',
  'country.BL': 'Saint Barthélemy',
  'country.BM': 'Bermuda',
  'country.BN': 'Brunei',
  'country.BO': 'Bolivia',
  'country.BQ': 'Caribbean Netherlands',
  'country.BR': 'Brazil',
  'country.BS': 'Bahamas',
  'country.BT': 'Bhutan',
  'country.BW': 'Botswana',
  'country.BY': 'Belarus',
  'country.BZ': 'Belize',
  'country.CA': 'Canada',
  'country.CC': 'Cocos (Keeling) Islands',
  'country.CD': 'Congo - Kinshasa',
  'country.CF': 'Central African Republic',
  'country.CG': 'Congo - Brazzaville',
  'country.CH': 'Switzerland',
  'country.CI': 'Côte d’Ivoire',
  'country.CK': 'Cook Islands',
  'country.CL': 'Chile',
  'country.CM': 'Cameroon',
  'country.CN': 'China',
  'country.CO': 'Colombia',
  'country.CR': 'Costa Rica',
  'country.CU': 'Cuba',
  'country.CV': 'Cape Verde',
  'country.CW': 'Curaçao',
  'country.CX': 'Christmas Island',
  'country.CY': 'Cyprus',
  'country.CZ': 'Czech Republic',
  'country.DE': 'Germany',
  'country.DG': 'Diego Garcia',
  'country.DJ': 'Djibouti',
  'country.DK': 'Denmark',
  'country.DM': 'Dominica',
  'country.DO': 'Dominican Republic',
  'country.DZ': 'Algeria',
  'country.EA': 'Ceuta and Melilla',
  'country.EC': 'Ecuador',
  'country.EE': 'Estonia',
  'country.EG': 'Egypt',
  'country.EH': 'Western Sahara',
  'country.ER': 'Eritrea',
  'country.ES': 'Spain',
  'country.ET': 'Ethiopia',
  'country.FI': 'Finland',
  'country.FJ': 'Fiji',
  'country.FK': 'Falkland Islands',
  'country.FM': 'Micronesia',
  'country.FO': 'Faroe Islands',
  'country.FR': 'France',
  'country.GA': 'Gabon',
  'country.GB': 'United Kingdom',
  'country.GD': 'Grenada',
  'country.GE': 'Georgia',
  'country.GF': 'French Guiana',
  'country.GG': 'Guernsey',
  'country.GH': 'Ghana',
  'country.GI': 'Gibraltar',
  'country.GL': 'Greenland',
  'country.GM': 'Gambia',
  'country.GN': 'Guinea',
  'country.GP': 'Guadeloupe',
  'country.GQ': 'Equatorial Guinea',
  'country.GR': 'Greece',
  'country.GS': 'South Georgia & South Sandwich Islands',
  'country.GT': 'Guatemala',
  'country.GU': 'Guam',
  'country.GW': 'Guinea-Bissau',
  'country.GY': 'Guyana',
  'country.HK': 'Hong Kong SAR China',
  'country.HN': 'Honduras',
  'country.HR': 'Croatia',
  'country.HT': 'Haiti',
  'country.HU': 'Hungary',
  'country.IC': 'Canary Islands',
  'country.ID': 'Indonesia',
  'country.IE': 'Ireland',
  'country.IL': 'Israel',
  'country.IM': 'Isle of Man',
  'country.IN': 'India',
  'country.IO': 'British Indian Ocean Territory',
  'country.IQ': 'Iraq',
  'country.IR': 'Iran',
  'country.IS': 'Iceland',
  'country.IT': 'Italy',
  'country.JE': 'Jersey',
  'country.JM': 'Jamaica',
  'country.JO': 'Jordan',
  'country.JP': 'Japan',
  'country.KE': 'Kenya',
  'country.KG': 'Kyrgyzstan',
  'country.KH': 'Cambodia',
  'country.KI': 'Kiribati',
  'country.KM': 'Comoros',
  'country.KN': 'Saint Kitts and Nevis',
  'country.KP': 'North Korea',
  'country.KR': 'South Korea',
  'country.KW': 'Kuwait',
  'country.KY': 'Cayman Islands',
  'country.KZ': 'Kazakhstan',
  'country.LA': 'Laos',
  'country.LB': 'Lebanon',
  'country.LC': 'Saint Lucia',
  'country.LI': 'Liechtenstein',
  'country.LK': 'Sri Lanka',
  'country.LR': 'Liberia',
  'country.LS': 'Lesotho',
  'country.LT': 'Lithuania',
  'country.LU': 'Luxembourg',
  'country.LV': 'Latvia',
  'country.LY': 'Libya',
  'country.MA': 'Morocco',
  'country.MC': 'Monaco',
  'country.MD': 'Moldova',
  'country.ME': 'Montenegro',
  'country.MF': 'Saint Martin',
  'country.MG': 'Madagascar',
  'country.MH': 'Marshall Islands',
  'country.MK': 'Macedonia',
  'country.ML': 'Mali',
  'country.MM': 'Myanmar (Burma)',
  'country.MN': 'Mongolia',
  'country.MO': 'Macau SAR China',
  'country.MP': 'Northern Mariana Islands',
  'country.MQ': 'Martinique',
  'country.MR': 'Mauritania',
  'country.MS': 'Montserrat',
  'country.MT': 'Malta',
  'country.MU': 'Mauritius',
  'country.MV': 'Maldives',
  'country.MW': 'Malawi',
  'country.MX': 'Mexico',
  'country.MY': 'Malaysia',
  'country.MZ': 'Mozambique',
  'country.NA': 'Namibia',
  'country.NC': 'New Caledonia',
  'country.NE': 'Niger',
  'country.NF': 'Norfolk Island',
  'country.NG': 'Nigeria',
  'country.NI': 'Nicaragua',
  'country.NL': 'Netherlands',
  'country.NO': 'Norway',
  'country.NP': 'Nepal',
  'country.NR': 'Nauru',
  'country.NU': 'Niue',
  'country.NZ': 'New Zealand',
  'country.OM': 'Oman',
  'country.PA': 'Panama',
  'country.PE': 'Peru',
  'country.PF': 'French Polynesia',
  'country.PG': 'Papua New Guinea',
  'country.PH': 'Philippines',
  'country.PK': 'Pakistan',
  'country.PL': 'Poland',
  'country.PM': 'Saint Pierre and Miquelon',
  'country.PN': 'Pitcairn Islands',
  'country.PR': 'Puerto Rico',
  'country.PS': 'Palestinian Territories',
  'country.PT': 'Portugal',
  'country.PW': 'Palau',
  'country.PY': 'Paraguay',
  'country.QA': 'Qatar',
  'country.RE': 'Réunion',
  'country.RO': 'Romania',
  'country.RS': 'Serbia',
  'country.RU': 'Russia',
  'country.RW': 'Rwanda',
  'country.SA': 'Saudi Arabia',
  'country.SB': 'Solomon Islands',
  'country.SC': 'Seychelles',
  'country.SD': 'Sudan',
  'country.SE': 'Sweden',
  'country.SG': 'Singapore',
  'country.SH': 'Saint Helena',
  'country.SI': 'Slovenia',
  'country.SJ': 'Svalbard and Jan Mayen',
  'country.SK': 'Slovakia',
  'country.SL': 'Sierra Leone',
  'country.SM': 'San Marino',
  'country.SN': 'Senegal',
  'country.SO': 'Somalia',
  'country.SR': 'Suriname',
  'country.SS': 'South Sudan',
  'country.ST': 'São Tomé and Príncipe',
  'country.SV': 'El Salvador',
  'country.SX': 'Sint Maarten',
  'country.SY': 'Syria',
  'country.SZ': 'Swaziland',
  'country.TA': 'Tristan da Cunha',
  'country.TC': 'Turks and Caicos Islands',
  'country.TD': 'Chad',
  'country.TF': 'French Southern Territories',
  'country.TG': 'Togo',
  'country.TH': 'Thailand',
  'country.TJ': 'Tajikistan',
  'country.TK': 'Tokelau',
  'country.TL': 'Timor-Leste',
  'country.TM': 'Turkmenistan',
  'country.TN': 'Tunisia',
  'country.TO': 'Tonga',
  'country.TR': 'Turkey',
  'country.TT': 'Trinidad and Tobago',
  'country.TV': 'Tuvalu',
  'country.TW': 'Taiwan',
  'country.TZ': 'Tanzania',
  'country.UA': 'Ukraine',
  'country.UG': 'Uganda',
  'country.UM': 'U.S. Outlying Islands',
  'country.US': 'United States',
  'country.UY': 'Uruguay',
  'country.UZ': 'Uzbekistan',
  'country.VA': 'Vatican City',
  'country.VC': 'St. Vincent & Grenadines',
  'country.VE': 'Venezuela',
  'country.VG': 'British Virgin Islands',
  'country.VI': 'U.S. Virgin Islands',
  'country.VN': 'Vietnam',
  'country.VU': 'Vanuatu',
  'country.WF': 'Wallis and Futuna',
  'country.WS': 'Samoa',
  'country.XK': 'Kosovo',
  'country.YE': 'Yemen',
  'country.YT': 'Mayotte',
  'country.ZA': 'South Africa',
  'country.ZM': 'Zambia',
  'country.ZW': 'Zimbabwe',

  'user.metadata.address': 'Address',
  'user.metadata.country': 'Country',
  'user.metadata.organization': 'Organization',
  'user.metadata.reason': 'Registration reason',
}

export default messages
