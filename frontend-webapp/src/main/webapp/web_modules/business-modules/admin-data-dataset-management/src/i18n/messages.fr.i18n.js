import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'dataset.list.action.add': 'Ajouter',
  'dataset.list.action.cancel': 'Annuler',
  'dataset.list.title': 'Liste des jeux de données',
  'dataset.list.subtitle': 'Les jeux de données sont des regroupements de données qui partagent une même thématique',
  'dataset.list.table.label': 'Label',
  'dataset.list.table.actions': 'Actions',
  'dataset.list.table.model': 'Modele',
  'dataset.list.tooltip.edit': 'Éditer',
  'dataset.list.tooltip.delete': 'Supprimer',
  'dataset.list.delete.title': 'Supprimer le jeu de données {name} ?',

  'dataset.form.links.subtitle': 'Les jeux de données sont liés à des collections et à des mots clés afin de simplifier la recherche',
  'dataset.form.links.title': 'Edition des liens du jeu de données',
  'dataset.form.links.collection.title': 'Liste des collections liées : cliquer sur la croix pour supprimer la liaison avec la collection',
  'dataset.form.links.collection.none': 'Aucune collection liée',
  'dataset.form.links.tag.subtitle': 'Associer à des mots clés',
  'dataset.form.links.tag.add': 'Nouveau mot clé',
  'dataset.form.links.remainingcollection.subtitle': 'Collections disponibles : cliquer sur le plus pour lier la collection',
  'dataset.form.links.remainingcollection.search': 'Filtrer les collections sur leur nom',
  'dataset.form.links.action.save': 'Sauvegarder',
  'dataset.form.links.action.cancel': 'Retour',

  'dataset.form.plugin.title': 'Gestion des plugins appliqués au jeu de données',
  'dataset.form.plugin.subtitle': 'Vous pouvez activer des plugins services pour pouvoir réaliser des traitements sur le jeu de données.',
  'dataset.form.plugin.services': 'Activation de services',
  'dataset.form.plugin.action.next': 'Suite',
  'dataset.form.plugin.action.cancel': 'Annuler',

  'dataset.form.uiservices.title': 'Gestion des services de l\'interface utilisateur',
  'dataset.form.uiservices.subtitle': 'Demandes à Seb au 0560336584',
  'dataset.form.uiservices.action.next': 'Terminer',
  'dataset.form.uiservices.action.cancel': 'Annuler',


  'dataset.form.subsetting.subtitle': 'Mise en place du subsetting',
  'dataset.form.subsetting.attributes': 'Attributs du modèle d\'objet',
  'dataset.form.subsetting.opensearch': 'Requête de filtre en OpenSearch',
  'dataset.form.subsetting.testSubsetQuery': 'Tester la requête',
  'dataset.form.subsetting.action.next': 'Suivant',
  'dataset.form.subsetting.action.cancel': 'Annuler',

  'dataset.form.action.next': 'Suivant',
  'dataset.form.action.cancel': 'Annuler',
  'dataset.form.model': 'Modèles de jeu de données',
  'dataset.form.label': 'Libellé',
  'dataset.form.descriptionUrl': 'URL de la page décrivant le jeu de données',
  'dataset.form.descriptionFileContent': 'Uploader un fichier Markdown ou PDF',
  'dataset.form.descriptionFileContentReuploadToOverride': 'Uploader un fichier Markdown ou PDF contenant la description si vous voulez écraser celle déjà présente',
  'dataset.form.datasource': 'Source de données',
  'dataset.form.radio.descriptionUrl': 'Donner l\'URL contenant la description',
  'dataset.form.radio.descriptionFileContent': 'Uploader un fichier contenant la description',
  'dataset.form.radio.none': 'Pas de description',
  'dataset.form.table.value': 'Valeur fixe',
  'dataset.form.table.label': 'Attribut du modèle',
  'dataset.form.table.fragment': 'Fragment',
  'dataset.form.table.input': 'Valeur de l\'attribut',
  'dataset.form.subtitle': 'Gestion des attributs d\'un jeu de données',

  'dataset.edit.title': 'Édition du jeu de données {name}',
  'dataset.create.title': 'Création d\'un nouveau jeu de données',
  'invalid.max_128_carac': 'Le label d\'un dataset ne peut dépasser 128 caractères',

  'dataset.form.create.action.datasource': 'Créer une nouvelle source de données',
  'dataset.form.create.action.cancel': 'Retour',
  'dataset.form.create.action.next': 'Continuer',
  'dataset.form.create.datasource': 'Source de données',
  'dataset.form.create.title': 'Création d\'un nouveau jeu de données',
  'dataset.form.create.subtitle': 'Veuillez sélectionner une source de données afin de créer un jeu de données. Si vous ne l\'avez toujours pas crée, vous pouvez cliquer sur le bouton pour créer une nouvelle source de données',

  'dataset.stepper.links': 'Édition des liens avec des collections',
  'dataset.stepper.attributes': 'Saisie des attributs',
  'dataset.stepper.subsetting': 'Filtrage (datasource)',
  'dataset.stepper.plugins': 'Plugins',
  'dataset.stepper.uiServices': 'Services IHM',


  'table.actions.more': 'Plus d\'actions',

}, Locales.fr)

export default messages

