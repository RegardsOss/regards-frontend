/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'authentication.username': 'Addresse e-mail',
  'authentication.password': 'Mot de passe',
  'authentication.button': 'Connexion',
  'authentication.cancel': 'Annuler',
  'authentication.message': 'Veuillez saisir vos identifiants pour vous connecter',
  'authentication.error.ACCOUNT_UNKNOWN': 'L\'addresse e-mail et / ou le mot de passe sont inconnus.',
  'authentication.error.ACCOUNT_PENDING': 'Votre compte utilisateur REGARDS n\'a pas encore été validé. Vous recevrez un courriel en cas de changement.',
  'authentication.error.ACCOUNT_ACCEPTED': 'Vous n\'avez pas encore validé votre compte, veuillez suivre le lien d\'activation fourni par courriel',
  'authentication.error.ACCOUNT_INACTIVE': 'Votre compte utilisateur est désactivé, veuillez contacter l\'administrateur du sytème',
  'authentication.error.ACCOUNT_LOCKED': 'Votre compte est bloqué, vous pouvez le débloquer en suivant le lien "Compte bloqué?" au bas de cette fenêtre',
  'authentication.error.USER_UNKNOWN': 'Vous n\'avez pas les droits d\'accès à ce projet. Vous pouvez les demander en suivant le lien "Compte bloqué?", avec l\'option "J\'ai déjà un compte utilisateur REGARDS"',
  'authentication.error.USER_WAITING_ACCESS': 'Votre demande d\'accès au projet est en cours de traitement. Vous recevrez un courriel en cas de changement',
  'authentication.error.USER_ACCESS_DENIED': 'Votre demande d\'accès au projet a été rejetée',
  'authentication.error.USER_ACCESS_INACTIVE': 'Vos droits d\'accès au projet sont désactivés, veuillez contacter l\'administrateur du projet',
  'authentication.error.UNKNOWN_ERROR': 'Une erreur inconnue s\'est produite',
  'authentication.goto.reset.password': 'Mot de passe oublié?',
  'authentication.goto.ask.access': 'Nouvel utilisateur?',
  'authentication.goto.unlock.account': 'Compte bloqué?',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'Adresse e-mail',
  'account.request.form.back': 'RETOUR',
  'account.request.form.send': 'ENVOYER',

  // reset account password request form
  'ask.reset.password.form.message': 'Veuillez entrer votre adresse mail, un lien de ré-initialisation du mot de passe vous sera envoyé',
  'ask.reset.password.form.title': 'Ré-initialisation du mot de passe',
  'ask.reset.password.form.send.failed': '{status, plural, ' +
  '=404 {L\'adresse e-mail saisie est inconnue}' +
  'other {Une erreur inconnue s\'est produite (#)}}',

  // unlock account request form
  'ask.unlock.account.form.message': 'Veuillez entrer votre adresse mail pour demander le dévérouillage du compte',
  'ask.unlock.account.form.title': 'Dévérouillage du compte utilisateur',
  'ask.unlock.account.form.send.failed': '{status, plural, ' +
  '=403 {Le compte lié à ce mail n\'est pas bloqué}' +
  '=404 {L\'adresse e-mail saisie est inconnue.}' +
  'other {Une erreur inconnue s\'est produite (#)}}',

  // ask project access form
  'ask.project.access.request.title': 'Demander un accès projet',
  'ask.project.access.request.message': 'Veuillez renseigner ci-dessous vos données personnelles pour obtenir un accès au projet ou renseigner l\'adresse email de votre compte REGARDS si vous en avez déjà un.',
  'ask.project.access.using.existing.account': 'J\'ai déjà un compte utilisateur REGARDS',
  'ask.project.access.mail': 'Adresse e-mail',
  'ask.project.access.first.name': 'Prénom',
  'ask.project.access.last.name': 'Nom',
  'ask.project.access.new.password': 'Mot de passe',
  'ask.project.access.confirm.password': 'Confirmation du mot de passe',
  'ask.project.access.send': 'Envoyer',
  'ask.project.access.form.back': 'Retour',
  'ask.create.account.error.409': 'Cette adresse e-mail est déjà utilisée par un compte REGARDS existant',
  'ask.create.account.error.unknown': 'Une erreur inconnue s\'est produite  ({status})',
  'ask.create.user.error.404': 'Il n\'existe aucun compte REGARDS pour l\'adresse e-mail saisie',
  'ask.create.user.error.409': 'Vous avez déjà demandé l\'accès à ce projet',
  'ask.create.user.error.unknown': 'Une erreur inconnue s\'est produite  ({status})',

  // reset password operation
  'ask.reset.password.sent.title': 'Demande de ré-initialisation envoyée',
  'ask.reset.password.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail contenant le lien de ré-initialisation',
  'ask.reset.password.sent.option': 'Retour',
  'ask.reset.password.token.expired.title': 'Echec de la ré-initialisation',
  'ask.reset.password.token.expired.message': 'Votre requête a expiré, veuillez renouveller la demande de réinitialisation du mot de passe',
  'ask.reset.password.token.expired.option': 'Retour',
  'reset.password.done.title': 'Mot de passe mis à jour',
  'reset.password.done.message': 'Votre mot de passe a été mis à jour, vous pouvez accéder à l\'application',
  'reset.password.done.option': 'Connexion',

  // Ask project access
  'ask.project.access.sent.title': 'Demande d\'accès envoyée',
  'ask.project.access.sent.message': 'Votre demande d\'accès au projet a été émise. Vous recevrez un courriel vous prévenant de son acceptation',
  'ask.project.access.sent.option': 'Back',

  // New account operation
  'create.account.sent.title': 'Demande de compte envoyée',
  'create.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail pour activer votre compte',
  'create.account.sent.option': 'Retour',
  'new.account.validated.title': 'Compte activé',
  'new.account.validated.message': 'Votre compte utilisateur a été activé',
  'new.account.validated.option': 'Connexion',
  'new.account.token.expired.title': 'Account creation failed',
  'new.account.token.expired.message': 'Votre compte utilisateur n\'a pas pu être validé, veuillez renouveller votre demande de création',
  'new.account.token.expired.option': 'Retour',

  // Validating new account
  'new.acount.validating.title': 'Validation du compte',
  'new.acount.validating.message': 'Nous traitons la requête de validation du compte, veuillez patienter',

  // unlock account operation
  'ask.unlock.account.sent.title': 'Demande de dévérouillage envoyée',
  'ask.unlock.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail lorsque le compte sera dévérouillé',
  'ask.unlock.account.sent.option': 'Retour',
  'ask.unlock.account.token.expired.title': 'Echec du dévérouillage',
  'ask.unlock.account.token.expired.message': 'Votre requête a expiré, veuillez renouveller la demande dévérouillage du compte',
  'ask.unlock.account.token.expired.option': 'Retour',
  'unlock.account.done.title': 'Compte dévérouillé',
  'unlock.account.done.message': 'Votre compte utilisateur a été dévérouillé, vous pouvez accéder à l\'application',
  'unlock.account.done.option': 'Connexion',

  // reset password update (after receiving mail)
  'reset.password.update.request.title': 'Ré-initialisation du mot de passe',
  'reset.password.update.request.message': 'Veuillez entrer votre nouveau mot de passe pour finaliser la mise à jour de votre compte utilisateur',
  'reset.password.update.new.password': 'Nouveau mot de passe',
  'reset.password.update.confirm.password': 'Confirmation du mot de passe',
  'reset.password.update.send': 'ENVOYER',

  // finish unlock account loading pane
  'finish.unlock.account.title': 'Dévérouillage du compte',
  'finish.unlock.account.message': 'Nous débloquons votre compte, veuillez patienter...',

}, Locales.fr)

export default messages
