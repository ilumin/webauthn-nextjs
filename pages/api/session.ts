import { getSession } from 'next-auth/client'

export default async function sessionApi(req, res) {
  const session = await getSession({ req })
  res.send(JSON.stringify(session, null, 2))
}
