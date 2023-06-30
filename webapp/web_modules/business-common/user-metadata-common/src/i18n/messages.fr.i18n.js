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

const messages = {
  'country.AC': 'Île de l’Ascension',
  'country.AD': 'Andorre',
  'country.AE': 'Émirats arabes unis',
  'country.AF': 'Afghanistan',
  'country.AG': 'Antigua-et-Barbuda',
  'country.AI': 'Anguilla',
  'country.AL': 'Albanie',
  'country.AM': 'Arménie',
  'country.AO': 'Angola',
  'country.AQ': 'Antarctique',
  'country.AR': 'Argentine',
  'country.AS': 'Samoa américaines',
  'country.AT': 'Autriche',
  'country.AU': 'Australie',
  'country.AW': 'Aruba',
  'country.AX': 'Îles Åland',
  'country.AZ': 'Azerbaïdjan',
  'country.BA': 'Bosnie-Herzégovine',
  'country.BB': 'Barbade',
  'country.BD': 'Bangladesh',
  'country.BE': 'Belgique',
  'country.BF': 'Burkina Faso',
  'country.BG': 'Bulgarie',
  'country.BH': 'Bahreïn',
  'country.BI': 'Burundi',
  'country.BJ': 'Bénin',
  'country.BL': 'Saint-Barthélemy',
  'country.BM': 'Bermudes',
  'country.BN': 'Brunéi Darussalam',
  'country.BO': 'Bolivie',
  'country.BQ': 'Pays-Bas caribéens',
  'country.BR': 'Brésil',
  'country.BS': 'Bahamas',
  'country.BT': 'Bhoutan',
  'country.BW': 'Botswana',
  'country.BY': 'Biélorussie',
  'country.BZ': 'Belize',
  'country.CA': 'Canada',
  'country.CC': 'Îles Cocos',
  'country.CD': 'Congo-Kinshasa',
  'country.CF': 'République centrafricaine',
  'country.CG': 'Congo-Brazzaville',
  'country.CH': 'Suisse',
  'country.CI': 'Côte d’Ivoire',
  'country.CK': 'Îles Cook',
  'country.CL': 'Chili',
  'country.CM': 'Cameroun',
  'country.CN': 'Chine',
  'country.CO': 'Colombie',
  'country.CR': 'Costa Rica',
  'country.CU': 'Cuba',
  'country.CV': 'Cap-Vert',
  'country.CW': 'Curaçao',
  'country.CX': 'Île Christmas',
  'country.CY': 'Chypre',
  'country.CZ': 'République tchèque',
  'country.DE': 'Allemagne',
  'country.DG': 'Diego Garcia',
  'country.DJ': 'Djibouti',
  'country.DK': 'Danemark',
  'country.DM': 'Dominique',
  'country.DO': 'République dominicaine',
  'country.DZ': 'Algérie',
  'country.EA': 'Ceuta et Melilla',
  'country.EC': 'Équateur',
  'country.EE': 'Estonie',
  'country.EG': 'Égypte',
  'country.EH': 'Sahara occidental',
  'country.ER': 'Érythrée',
  'country.ES': 'Espagne',
  'country.ET': 'Éthiopie',
  'country.FI': 'Finlande',
  'country.FJ': 'Fidji',
  'country.FK': 'Îles Malouines',
  'country.FM': 'États fédérés de Micronésie',
  'country.FO': 'Îles Féroé',
  'country.FR': 'France',
  'country.GA': 'Gabon',
  'country.GB': 'Royaume-Uni',
  'country.GD': 'Grenade',
  'country.GE': 'Géorgie',
  'country.GF': 'Guyane française',
  'country.GG': 'Guernesey',
  'country.GH': 'Ghana',
  'country.GI': 'Gibraltar',
  'country.GL': 'Groenland',
  'country.GM': 'Gambie',
  'country.GN': 'Guinée',
  'country.GP': 'Guadeloupe',
  'country.GQ': 'Guinée équatoriale',
  'country.GR': 'Grèce',
  'country.GS': 'Îles Géorgie du Sud et Sandwich du Sud',
  'country.GT': 'Guatemala',
  'country.GU': 'Guam',
  'country.GW': 'Guinée-Bissau',
  'country.GY': 'Guyana',
  'country.HK': 'R.A.S. chinoise de Hong Kong',
  'country.HN': 'Honduras',
  'country.HR': 'Croatie',
  'country.HT': 'Haïti',
  'country.HU': 'Hongrie',
  'country.IC': 'Îles Canaries',
  'country.ID': 'Indonésie',
  'country.IE': 'Irlande',
  'country.IL': 'Israël',
  'country.IM': 'Île de Man',
  'country.IN': 'Inde',
  'country.IO': 'Territoire britannique de l’océan Indien',
  'country.IQ': 'Irak',
  'country.IR': 'Iran',
  'country.IS': 'Islande',
  'country.IT': 'Italie',
  'country.JE': 'Jersey',
  'country.JM': 'Jamaïque',
  'country.JO': 'Jordanie',
  'country.JP': 'Japon',
  'country.KE': 'Kenya',
  'country.KG': 'Kirghizistan',
  'country.KH': 'Cambodge',
  'country.KI': 'Kiribati',
  'country.KM': 'Comores',
  'country.KN': 'Saint-Christophe-et-Niévès',
  'country.KP': 'Corée du Nord',
  'country.KR': 'Corée du Sud',
  'country.KW': 'Koweït',
  'country.KY': 'Îles Caïmans',
  'country.KZ': 'Kazakhstan',
  'country.LA': 'Laos',
  'country.LB': 'Liban',
  'country.LC': 'Sainte-Lucie',
  'country.LI': 'Liechtenstein',
  'country.LK': 'Sri Lanka',
  'country.LR': 'Libéria',
  'country.LS': 'Lesotho',
  'country.LT': 'Lituanie',
  'country.LU': 'Luxembourg',
  'country.LV': 'Lettonie',
  'country.LY': 'Libye',
  'country.MA': 'Maroc',
  'country.MC': 'Monaco',
  'country.MD': 'Moldavie',
  'country.ME': 'Monténégro',
  'country.MF': 'Saint-Martin (partie française)',
  'country.MG': 'Madagascar',
  'country.MH': 'Îles Marshall',
  'country.MK': 'Macédoine',
  'country.ML': 'Mali',
  'country.MM': 'Myanmar',
  'country.MN': 'Mongolie',
  'country.MO': 'R.A.S. chinoise de Macao',
  'country.MP': 'Îles Mariannes du Nord',
  'country.MQ': 'Martinique',
  'country.MR': 'Mauritanie',
  'country.MS': 'Montserrat',
  'country.MT': 'Malte',
  'country.MU': 'Maurice',
  'country.MV': 'Maldives',
  'country.MW': 'Malawi',
  'country.MX': 'Mexique',
  'country.MY': 'Malaisie',
  'country.MZ': 'Mozambique',
  'country.NA': 'Namibie',
  'country.NC': 'Nouvelle-Calédonie',
  'country.NE': 'Niger',
  'country.NF': 'Île Norfolk',
  'country.NG': 'Nigéria',
  'country.NI': 'Nicaragua',
  'country.NL': 'Pays-Bas',
  'country.NO': 'Norvège',
  'country.NP': 'Népal',
  'country.NR': 'Nauru',
  'country.NU': 'Niue',
  'country.NZ': 'Nouvelle-Zélande',
  'country.OM': 'Oman',
  'country.PA': 'Panama',
  'country.PE': 'Pérou',
  'country.PF': 'Polynésie française',
  'country.PG': 'Papouasie-Nouvelle-Guinée',
  'country.PH': 'Philippines',
  'country.PK': 'Pakistan',
  'country.PL': 'Pologne',
  'country.PM': 'Saint-Pierre-et-Miquelon',
  'country.PN': 'Pitcairn',
  'country.PR': 'Porto Rico',
  'country.PS': 'Territoires palestiniens',
  'country.PT': 'Portugal',
  'country.PW': 'Palaos',
  'country.PY': 'Paraguay',
  'country.QA': 'Qatar',
  'country.RE': 'La Réunion',
  'country.RO': 'Roumanie',
  'country.RS': 'Serbie',
  'country.RU': 'Russie',
  'country.RW': 'Rwanda',
  'country.SA': 'Arabie saoudite',
  'country.SB': 'Îles Salomon',
  'country.SC': 'Seychelles',
  'country.SD': 'Soudan',
  'country.SE': 'Suède',
  'country.SG': 'Singapour',
  'country.SH': 'Sainte-Hélène',
  'country.SI': 'Slovénie',
  'country.SJ': 'Svalbard et Jan Mayen',
  'country.SK': 'Slovaquie',
  'country.SL': 'Sierra Leone',
  'country.SM': 'Saint-Marin',
  'country.SN': 'Sénégal',
  'country.SO': 'Somalie',
  'country.SR': 'Suriname',
  'country.SS': 'Soudan du Sud',
  'country.ST': 'Sao Tomé-et-Principe',
  'country.SV': 'El Salvador',
  'country.SX': 'Saint-Martin (partie néerlandaise)',
  'country.SY': 'Syrie',
  'country.SZ': 'Swaziland',
  'country.TA': 'Tristan da Cunha',
  'country.TC': 'Îles Turques-et-Caïques',
  'country.TD': 'Tchad',
  'country.TF': 'Terres australes françaises',
  'country.TG': 'Togo',
  'country.TH': 'Thaïlande',
  'country.TJ': 'Tadjikistan',
  'country.TK': 'Tokelau',
  'country.TL': 'Timor oriental',
  'country.TM': 'Turkménistan',
  'country.TN': 'Tunisie',
  'country.TO': 'Tonga',
  'country.TR': 'Turquie',
  'country.TT': 'Trinité-et-Tobago',
  'country.TV': 'Tuvalu',
  'country.TW': 'Taïwan',
  'country.TZ': 'Tanzanie',
  'country.UA': 'Ukraine',
  'country.UG': 'Ouganda',
  'country.UM': 'Îles mineures éloignées des États-Unis',
  'country.US': 'États-Unis',
  'country.UY': 'Uruguay',
  'country.UZ': 'Ouzbékistan',
  'country.VA': 'État de la Cité du Vatican',
  'country.VC': 'Saint-Vincent-et-les-Grenadines',
  'country.VE': 'Venezuela',
  'country.VG': 'Îles Vierges britanniques',
  'country.VI': 'Îles Vierges des États-Unis',
  'country.VN': 'Vietnam',
  'country.VU': 'Vanuatu',
  'country.WF': 'Wallis-et-Futuna',
  'country.WS': 'Samoa',
  'country.XK': 'Kosovo',
  'country.YE': 'Yémen',
  'country.YT': 'Mayotte',
  'country.ZA': 'Afrique du Sud',
  'country.ZM': 'Zambie',
  'country.ZW': 'Zimbabwe',

  'user.metadata.address': 'Adresse',
  'user.metadata.country': 'Pays',
  'user.metadata.organization': 'Organisation',
  'user.metadata.reason': 'Raison d\'inscription',
}

export default messages
