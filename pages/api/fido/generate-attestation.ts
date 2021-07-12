import { getUserDevices, setUserChallenge } from '@utils/db'
import {
  // Registration ("Attestation")
  generateAttestationOptions,
  verifyAttestationResponse,
  // Login ("Assertion")
  generateAssertionOptions,
  verifyAssertionResponse,
} from '@simplewebauthn/server'
import type {
  GenerateAttestationOptionsOpts,
  GenerateAssertionOptionsOpts,
  VerifyAttestationResponseOpts,
  VerifyAssertionResponseOpts,
  VerifiedAttestation,
  VerifiedAssertion,
} from '@simplewebauthn/server'

import type {
  AttestationCredentialJSON,
  AssertionCredentialJSON,
  AuthenticatorDevice,
} from '@simplewebauthn/typescript-types'

import { getSession } from 'next-auth/client'

const rpID = 'NEXT-AUTHN-101'

export default async function generateAttestation(req, res) {
  const session = await getSession({ req })
  if (!session) return res.send({ ok: false, error: 'invalid user session' })

  console.log('session:', session)

  const { user, name } = session

  const devices = await getUserDevices(user)

  const opts: GenerateAttestationOptionsOpts = {
    rpName: 'SimpleWebAuthn Example',
    rpID,
    userID: user as string,
    userName: name as string,
    timeout: 60000,
    attestationType: 'indirect',
    excludeCredentials: devices,
    authenticatorSelection: {
      userVerification: 'preferred',
      requireResidentKey: false,
    },
    supportedAlgorithmIDs: [-7, -257],
  }

  // generate challenges
  const options = generateAttestationOptions(opts)

  // save challenges
  await setUserChallenge(user, options.challenge)

  // send
  res.send(options)
}
