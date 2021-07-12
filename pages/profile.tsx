import { useSession } from 'next-auth/client'
import Layout from '@components/Layout'
import AccessDenied from '@components/AccessDenied'
import { generateAttestation } from '@utils/fido-client'

export default function ProtectedPage() {
  const [session, loading] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  const registerWebAuthn = async () => {
    console.info('generate attestation')
    await generateAttestation()

    console.info('verify attestation')
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Profile</h1>
      <p>
        <button onClick={registerWebAuthn}>enable WebAuthn</button>
      </p>
    </Layout>
  )
}
