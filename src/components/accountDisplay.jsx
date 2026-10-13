import Button from './button'

export default function AccountDisplay({ user, onLogOut }) {
  function getDisplayName(user) {
    if (!user) return 'Guest'

    return user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'there'
  }

  return (
    <div className="container-fluid py-2">
      <div className="row align-items-center">
        <div className="col-4">
          
        </div>

        <div className="col-4 text-center">
          Hi, {getDisplayName(user)}!
        </div>

        <div className="col-4">
          {user && <Button onClick={onLogOut}>Log Out</Button>}
        </div>
      </div>
    </div>
  )
}