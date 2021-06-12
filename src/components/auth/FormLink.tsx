import useStore, { FormType } from 'store'
import { Link } from '@material-ui/core'

const FormLink = ({ to, children }: { to?: FormType | undefined; children: any }) => {
  const setActiveForm = useStore((state) => state.setActiveForm)

  const handleSelectActiveForm = () => setActiveForm(to)

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link component="button" type="button" variant="body1" onClick={handleSelectActiveForm}>
      {children}
    </Link>
  )
}

export default FormLink
