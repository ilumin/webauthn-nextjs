import { fetcher } from '@utils/fetcher'
import { startAttestation } from '@simplewebauthn/browser'

export const generateAttestation = async () => {
  if (typeof window === 'undefined') return

  let attestation

  try {
    const response = await fetcher('/api/fido/generate-attestation')
    attestation = await startAttestation(response)

    console.log('attestation.request:', attestation)
  } catch (error) {
    throw error
  }

  try {
    const response = await fetcher('/api/validate-attestation', {
      method: 'POST',
      body: JSON.stringify(attestation),
    })

    console.log('attestation.response:', response)

    if (response && response.verified) {
      return true
    }

    throw new Error('Cannot verify attestation')
  } catch (error) {
    throw error
  }
}
