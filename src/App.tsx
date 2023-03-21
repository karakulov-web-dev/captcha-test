import React, { useState } from 'react';
import Captcha from './Captcha';


function App() {
  const [isHuman, setIsHuman] = useState(false)
  return (
    <div className="App">
      {
        isHuman === false ? (
          <Captcha
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
