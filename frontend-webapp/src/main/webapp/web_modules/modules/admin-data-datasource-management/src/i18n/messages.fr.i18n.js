/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'datasource.list.action.add': 'Ajouter',
  'datasource.list.action.cancel': 'Annuler',
  'datasource.list.title': 'Liste des sources de données',
  'datasource.list.subtitle': 'Les datasources retournent les données que vous souhaitez apporter à vos jeux de données',
  'datasource.list.table.label': 'Label',
  'datasource.list.table.actions': 'Actions',
  'datasource.list.table.model': 'Modele',

  'datasource.form.create.title': 'Création d\'une source de données',
  'datasource.form.create.subtitle': 'Veuillez sélectionner à partir de quelle connexion vous souhaitez créer la source de données',
  'datasource.form.create.action.cancel': 'Annuler',
  'datasource.form.create.action.next': 'Suite',
  'datasource.form.create.action.connection': 'Créer une nouvelle connexion',
  'datasource.form.create.datasource': 'Liste des connexions actives',

  'datasource.form.action.next': 'Suivant',
  'datasource.form.action.cancel': 'Annuler',
  'datasource.form.model': 'Modèles de source de données',
  'datasource.form.connection': 'Connexion choisie',
  'datasource.form.label': 'Libellé',
  'datasource.form.table.input': 'Valeur de l\'attribut',
  'datasource.form.subtitle': 'Gestion des attributs d\'une source de données',

  'datasource.edit.title': 'Edition de la source de données {name}',
  'datasource.create.title': 'Création d\'une nouvelle source de données',

  'datasource.stepper.attributes': 'Saisie des attributs d\'une source de données',
  'datasource.stepper.connection': 'Choix de la connexion',
  'datasource.stepper.mapping': 'Mapping des données',


  'datasource.form.mapping.title': 'Mise en place de la liaison entre la connexion et le modèle d\'object',
  'datasource.form.mapping.subtitle': 'Cette étape vise à lier pour chaque attribut de votre modèle un attribut provenant de la connexion. Si vos données sont issues d\'une seule table, choisissez l\'onglet "Liaison avec une seule table", sinon vous pouvez choisir l\'option "Liaison avancée" afin d\'écrire votre requête SQL.',

  'datasource.form.mapping.table.fragment': 'Fragment',
  'datasource.form.mapping.table.attrName': 'Nom de l\'attribut',
  'datasource.form.mapping.table.attribute': 'Attribut du modèle',
  'datasource.form.mapping.table.type': 'Type de l\'attribut',
  'datasource.form.mapping.table.dbValue': 'Valeur de l\'attribut',
  'datasource.form.mapping.connectionViewer.title': 'Explorateur de connexion',
  'datasource.form.mapping.connectionViewerFromTable.subtitle': 'Selectionner la table qui contient les attributs du modèle',
  'datasource.form.mapping.connectionViewerCustom.subtitle': 'Selectionner une table pour afficher ses attributs',
  'datasource.form.mapping.table.optional.true': 'Optionnel',
  'datasource.form.mapping.table.optional.false': 'Obligatoire',
  'datasource.form.mapping.from_table': 'Liaison avec une seule table',
  'datasource.form.mapping.custom_from': 'Liaison avancée',
  'datasource.form.mapping.action.save': 'Sauvegarder',
  'datasource.form.mapping.action.cancel': 'Précédent',

  'datasource.form.mapping.fromTable.title': 'Liaison entre attributs du modèle et la table de la connexion',
  'datasource.form.mapping.fromTable.subtitle': 'Pour chaque attribut du modèle, vous devez spécifier comment la valeur est retrouvée',
  'datasource.form.mapping.fromTable.tableName': 'Nom de la table',
  'datasource.form.mapping.table.input': 'Clause du select (SQL)',
  'datasource.form.mapping.table.select': 'Selectionner l\'attribut de la table',
  'datasource.form.mapping.table.showAdvancedConfiguration': 'Utiliser du SQL',
  'datasource.form.mapping.table.isPK': 'Clé primaire de la table',

  'datasource.form.mapping.custom.title': 'Liaison entre attributs du modèle et la connexion',
  'datasource.form.mapping.custom.subtitle': 'Dans un premier temps, écrivez votre requête SQL pour récuperer les données en fonction des tables disponibles dans la connexion. Ensuite, présicez la clause SELECT en SQL qui permet de récupérer la valeur de l\'attribut du modèle',
  'datasource.form.mapping.custom.fromClause': 'Clause FROM, WHERE, [GROUP BY et HAVING]',

  'invalid.max_128_carac': 'Le nom d\'une datasource ne peut excéder 128 caractères',
  'invalid.one_pk_required': 'Designer un champs comme étant une clé primaire est obligatoire',
  'invalid.only_one_pk_allowed': 'Il ne peut y avoir plus d\'une clé primaire',
}, Locales.fr)

export default messages

