/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'authentication.username': 'E-mail address',
  'authentication.password': 'Password',
  'authentication.button': 'Log in',
  'authentication.cancel': 'Cancel',
  'authentication.message': 'Please enter your username and password to log in',
  'authentication.error': 'Invalid Username/Password',
  'authentication.error.500': 'Server unavailable',
  'authentication.goto.reset.password': 'Lost password?',
  'authentication.goto.create.account': 'New user?',
  'authentication.goto.unlock.account': 'Account locked?',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'E-mail address',
  'account.request.form.back': 'BACK',
  'account.request.form.send': 'SEND',

  // request account password request form
  'ask.reset.password.form.message': 'Please enter your mail address to receive a reset password link',
  'ask.reset.password.form.title': 'Reset password',
  'ask.reset.password.form.send.failed': '{status, plural, ' +
    '=404 { Entered e-mail address is unknown. } ' +
    'other: {An unknown error occurred (#)}}',

  // unlock account request form
  'ask.unlock.account.form.message': 'Please enter your mail address to request account unlocking',
  'ask.unlock.account.form.title': 'Unlock user account',
  'ask.unlock.account.form.send.failed': '{status, plural, ' +
    '=403 {That related account is not locked}' +
    '=404 {Entered e-mail address is unknown.}' +
    'other: {An unknown error occurred (#)}}',

  // ask project access form
  'create.account.request.title': 'Create account',
  'create.account.request.message': 'Please enter below your personal data. Your REGARDS account can be used on every project at this address.',
  'create.account.mail': 'E-mail address',
  'create.account.first.name': 'First name',
  'create.account.last.name': 'Last name',
  'create.account.new.password': 'Password',
  'create.account.confirm.password': 'Confirm password',
  'create.account.send': 'Create',
  'create.account.form.back': 'Cancel',

  // reset password operation
  'ask.reset.password.sent.title': 'Reset password sent',
  'ask.reset.password.sent.message': 'Your request has been sent, please wait for reset email',
  'ask.reset.password.sent.option': 'Back',
  'ask.reset.password.token.expired.title': 'Reset password failed',
  'ask.reset.password.token.expired.message': 'Your request has expired, please request password reset again',
  'ask.reset.password.token.expired.option': 'Back',
  'reset.password.done.title': 'Password reset',
  'reset.password.done.message': 'Your password has been successfully reset, you can proceed to site',
  'reset.password.done.option': 'Login',

  // ask project access operation
  'create.account.sent.title': 'Create account sent',
  'create.account.sent.message': 'Your request has been sent, you will receive a mail to activate it',
  'create.account.sent.option': 'Back',
  'create.account.done.title': 'User account activated',
  'create.account.done.message': 'Your user account has been activated',
  'create.account.done.option': 'Login',

  // unlock account operation
  'ask.unlock.account.sent.title': 'Unlock request sent',
  'ask.unlock.account.sent.message': 'Your request has been sent, please wait for unlock confirmation email',
  'ask.unlock.account.sent.option': 'Back',
  'ask.unlock.account.token.expired.title': 'Unlock account failed',
  'ask.unlock.account.token.expired.message': 'Your request has expired, please request unlock again',
  'ask.unlock.account.token.expired.option': 'Back',
  'unlock.account.done.title': 'Account unlocked',
  'unlock.account.done.message': 'Your account has been successfully reset unlocked, you can proceed to site',
  'unlock.account.done.option': 'Login',

  // password update form (after receiving reset mail)
  'reset.password.update.request.title': 'Reset password',
  'reset.password.update.request.message': 'Please provide the new password to complete operation',
  'reset.password.update.new.password': 'New password',
  'reset.password.update.confirm.password': 'Confirm password',
  'reset.password.update.send': 'SEND',

  // finish unlock account loading pane
  'finish.unlock.account.title': 'Unlocking account',
  'finish.unlock.account.message': 'We are unlocking your account, please wait...',

}, Locales.en)

export default messages
