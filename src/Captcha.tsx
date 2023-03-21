import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'

const SITEKEY = "10000000-ffff-ffff-ffff-000000000001"
const API_URL = 'https://humanometr.ru'
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

let isLoad: boolean = false
const awaitInitArr: Function[] = []

global.humanometrLoad = () => {
  isLoad = true
  awaitInitArr.forEach((init) => {
    init()
  })
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

  const init = () => {
    try {
      global.Humanometr.init({
        containerId,
        sitekey: SITEKEY,
        api: `${API_URL}`,
        callback: handle
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isLoad) {
      init()
    } else {
      const head = document.getElementsByTagName('head')[0]
      awaitInitArr.push(init)
      const script = document.createElement('script')
      script.src = `${API_URL}/humanometr.js`
      script.type = "text/javascript"
      script.onload = () => {
        init()
        head.removeChild(script)
      }
      head.appendChild(script)
    }
  }, [])
  return <div id={containerId} />
}

export default Captcha
