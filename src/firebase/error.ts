// eslint-disable-next-line import/prefer-default-export
export enum AuthError {
  InvalidEmail = 'auth/invalid-email',
  UserDisabled = 'auth/user-disabled',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  EmailAlreadyInUse = 'auth/email-already-in-use',
  OperationNotAllow = 'auth/operation-not-allowed',
  WeakPassword = 'auth/weak-password',
}
