import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
// humanometr.js' нужно в index.html в хеад поключить

const SITEKEY = "10000000-ffff-ffff-ffff-000000000001"
const API_URL = 'https://...'
const global: any = window

const checkValid = async (secret: string): Promise<boolean> => {
  const token = global.Humanometr.getToken()
  try {
    await axios.post(`${API_URL}/siteverify`, {
      secret,
      token,
      sitekey: SITEKEY
    })
    return true
  } catch (err) {
    return false
  }
}

interface Props {
  onSuccess: () => void
}

const Captcha: FC<Props> = ({ onSuccess }) => {
  const [containerId] = useState(Math.random().toString())

  const handle = async (secret: string) => {
    const isValid = await checkValid(secret)
    if (isValid) {
      onSuccess()
    }
  }

  useEffect(() => {
    const global: any = window
    if (typeof global.Humanometr !== 'undefined') {
      global.Humanometr.init({
        containerId,
        sitekey: SITEKEY,
        api: `${API_URL}/api`,
        callback: handle
      })
    } else {
      console.error('Humanometr is undefined')
    }

  }, [])
  return <div id={containerId} />
}

export default Captcha
