// eslint-disable-next-line import/prefer-default-export
export enum AuthError {
  InvalidEmail = 'auth/invalid-email',
  UserDisabled = 'auth/user-disabled',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  EmailAlreadyInUse = 'auth/email-already-in-use',
  OperationNotAllowed = 'auth/operation-not-allowed',
  WeakPassword = 'auth/weak-password',
  TooManyRequests = 'auth/too-many-requests',
  MissingAndroidPkgName = 'auth/missing-android-pkg-name',
  MissingContinueUri = 'auth/missing-continue-uri',
  MissingIOSBundleId = 'auth/missing-ios-bundle-id',
  InvalidContinueUri = 'auth/invalid-continue-uri',
  UnauthorizedContinueUri = 'auth/unauthorized-continue-uri',
}
