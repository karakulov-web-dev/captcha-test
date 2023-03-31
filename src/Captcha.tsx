import React, { FC, useEffect, useState } from 'react'

const global: any = window

let isLoad: boolean = false

interface Props {
  api: string
  sitekey: string
  onSuccess: () => void
}

const Captcha: FC<Props> = ({ api, sitekey, onSuccess }) => {
  const [containerId] = useState(Math.random().toString())

  const init = () => {
    try {
      global.Humanometr.init({
        containerId,
        sitekey,
        api,
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
      script.src = `${api}/humanometr.js`
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
