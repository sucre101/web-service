export default function auth ({ next, store }) {
  const currentUser = store.state.auth.currentUser

  if (!currentUser) {
    next({name: 'sign-in'})
  }
  return next()
}