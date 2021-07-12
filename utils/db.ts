import PouchDB from 'pouchdb'

var db = new PouchDB('.data')

export const saveUser = async (key: any, data: any) => {
  const user = await getUser(key)

  const response = await db.put({
    ...data,
    _id: `user/${key}`,
    _rev: user._rev,
    type: 'user',
    key,
  })
  return response
}

export const setUserChallenge = async (key: any, challenge: string) => {
  console.log('key:', key)
  const user = await getUser(key)

  console.log('user:', user)

  const response = await db.put({
    ...user,
    _rev: user._rev,
    challenge: challenge,
  })
  return response
}

export const getUser = async (key: any) => {
  const _id = `user/${key}`

  try {
    const data = await db.get(_id)

    return data
  } catch (error) {
    console.warn(`user "${_id}" not found`)

    return {
      _rev: null,
    }
  }
}

export const saveUserDevice = async (user: any, key: string, data: any) => {
  const device = await getUserDevice(user, key)

  const response = await db.put({
    ...data,
    _id: `device/${key}/${user.id}`,
    _rev: device._rev,
    type: 'device',
    user: user.id,
    key,
  })

  return response
}

export const getUserDevice = async (user: any, key: string) => {
  const _id = `device/${user.id}/${key}/`

  try {
    const data = await db.get(_id)

    return data
  } catch (error) {
    console.warn(`device not "${_id}" of "${user.id}" found`)
    return {
      _rev: null,
    }
  }
}

export const getUserDevices = async (user: any) => {
  // try {
  //   const data = await db.find({
  //     selector: {
  //       user: { $eq: user },
  //       type: { $eq: 'device' },
  //     },
  //   })

  //   return data.map((item) => ({
  //     id: item.credentialID,
  //     type: 'public-key',
  //     transports: ['usb', 'ble', 'nfc', 'internal'],
  //   }))
  // } catch (error) {
  //   console.warn(error)
  //   return []
  // }
  return []
}
