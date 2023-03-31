import React, { FC, useEffect, useState } from 'react'

const SITEKEY = "10000000-ffff-ffff-ffff-000000000001"
const API_URL = 'https://93.175.9.104:5002'
const global: any = window

let isLoad: boolean = false

interface Props {
  onSuccess: () => void
}

const Captcha: FC<Props> = ({ onSuccess }) => {
  const [containerId] = useState(Math.random().toString())

  const init = () => {
    try {
      global.Humanometr.init({
        containerId,
        sitekey: SITEKEY,
        api: `${API_URL}`,
        onPassCallback: onSuccess,
        onErrorCallback: (err: any) => { console.error(new Error('onErrorCallback')) }
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
      const script = document.createElement('script')
      script.src = `${API_URL}/humanometr.js`
      script.type = "text/javascript"
      script.onload = () => {
        isLoad = true
        init()
        head.removeChild(script)
      }
      head.appendChild(script)
    }
  }, [])
  return <div id={containerId} />
}

export default Captcha
