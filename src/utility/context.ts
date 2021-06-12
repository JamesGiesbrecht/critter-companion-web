// eslint-disable-next-line import/prefer-default-export
export const noProvider = (contextName: string) => {
  throw new Error(`This component should be wrapper with a ${contextName} Context Provider.`)
}
