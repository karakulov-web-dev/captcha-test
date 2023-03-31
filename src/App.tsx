import React, { useState } from 'react';
import Captcha from './Captcha';


function App() {
  const [isHuman, setIsHuman] = useState(false)
  return (
    <div className="App">
      {
        isHuman === false ? (
          <Captcha
            api='https://93.175.9.104:5002'
            sitekey='10000000-ffff-ffff-ffff-000000000001'
            onSuccess={() => { setIsHuman(true) }}
          />
        ) : (
          <div>ура</div>
        )
      }

    </div>
  );
}

export default App;
