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
  'authentication.goto.reset.password': 'Reset password',
  'authentication.goto.create.account': 'Create account',
  'authentication.goto.unlock.account': 'Unlock account',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'E-mail address',
  'account.request.form.back': 'BACK',
  'account.request.form.send': 'SEND',
  'account.request.form.send.failed': 'Unknown e-mail address, please check spelling. Does this account exist?',
  // request account password request form
  'reset.password.request.message': 'Please enter your mail address to receive a reset password link',
  'reset.password.request.title': 'Reset password',
  // unlock account request form
  'unlock.account.request.message': 'Please enter your mail address to request account unlocking',
  'unlock.account.request.title': 'Unlock user account',

  // account operations results
  'ask.reset.password.sent.title': 'Reset password sent',
  'ask.reset.password.sent.message': 'Your request has been sent, please wait for reset email',
  'ask.reset.password.sent.option': 'Back',

  'ask.reset.password.token.expired.title': 'Reset password failed',
  'ask.reset.password.token.expired.message': 'Your request has expired, please request password reset again',
  'ask.reset.password.token.expired.option': 'Back',

  'change.password.done.title': 'Password reset',
  'change.password.done.message': 'Your password has been successfully reset, you can proceed to site',
  'change.password.done.option': 'Login',

  'create.account.sent.title': 'Create account sent',
  'create.account.sent.message': 'Your request has been sent, please wait for confirmation email',
  'create.account.sent.option': 'Back',

  'create.account.done.title': 'Account created',
  'create.account.done.message': 'Your account has been successfully created, you can proceed to site',
  'create.account.done.option': 'Login',

  'unlock.request.done.title': 'Account unlocked',
  'unlock.request.done.message': 'Your account has been successfully reset unlocked, you can proceed to site',
  'unlock.request.done.option': 'Login',

  'unlock.request.sent.title': 'Unlock request sent',
  'unlock.request.sent.message': 'Your request has been sent, please wait for unlock confirmation email',
  'unlock.request.sent.option': 'Back',

  'unlock.request.token.expired.title': 'Unlock account failed',
  'unlock.request.token.expired.message': 'Your request has expired, please request unlock again',
  'unlock.request.token.expired.option': 'Back',

  // reset password update (after receiving mail)
  'reset.password.update.request.title': 'Reset password',
  'reset.password.update.request.message': 'Please provide the new password to complete operation',
  'reset.password.update.new.password': 'New password',
  'reset.password.update.confirm.password': 'Confirm password',
  'reset.password.update.send': 'SEND',
}, Locales.en)

export default messages
