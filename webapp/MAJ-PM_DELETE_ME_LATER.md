# A faire ultérieurement

* [x]  Cacher le "shadow module", afficher sinon
* [x]  MAJ shape module
* [x]  Factoriser le code d'accès à la configuration de description
* [x]  Utiliser le code factorisé dans search-graph
* [x]  Nettoyage et adaptation search graph
* [x]  Gestion des URL pour les levels dans ContextManager
* [x]  Jeter la partie requête dialogue dans la description
* [x]  Vérifier: quelqu'un utilise encore dialogRequestsActions? (sinon supprimer dans clients!)
* [ ]  Récupération des attributs: OU QUI QUAND COMMENT?
* [ ]  Aspects graphiques du breadcrumb (icônes et taille des polices): probablement changer le paradigme pour que les consomateurs génèrent les liens
* [ ]  Aspects graphiques de la description
* [ ]  Tester avec un level de chaque type (word, entity et description)


# MAJ TU

## Changements globaux

results-context: tags est renommé en levels et peut maintenant contenir des DescriptionLevel (qui n'ont pas vocation a ếtre des critères de recherche)

## Clients

### modifications

* [x]  ResultsContextActions: tags => levels
* [x]  ResultsContextReducer: tags => levels
* [x]  ResultsContextSelectors: getTags => getLevels

## components

### modifications

* [x] BreadcrumbElement: rootIcon => icon
* [x] Breadcrumb: ajout iconBuilder

## entities-common

### ajouts

* [ ]  DescriptionHelper: Récupérer une partie de DescriptionProviderContainer pour les tests (ces fonctionnalités sont maintenant centralisées pour search-graph et search-results)

### suppressions

* [ ]  DescriptionConsumerID (dont buildDescriptionModuleConsumerID) 
* [ ]  DescriptionProviderContainer (dans search-results)

## description

### ajouts

* Tree shapes
* Tree domain
* [ ]  DescriptionStateActions (à tester)
* [ ]  DescriptionStateReducer (à tester)
* [ ]  DescriptionStateSelectors (à tester)

### modifications

* [ ]  UserContainer: changement en management tree (attention aux stubs!)

### suppressions

* DescriptionLevelActions, DescriptionLevelReducer, DescriptionLevelSelectors et DescriptionLevelClient (mis en commun avec les niveaux de search-results)
* DescriptionTabsEnum
* Tous appels a UIClient.DialogState* supprimés


A retester:

* Tous les breadcrumbs actuels dans l'IHM (changement de gestion interne sur les icônes)
* Tous les interacteurs search-results: vérifier le fonctionnement (formulaire / graph / description)
