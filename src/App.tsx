import React, { useState } from 'react';
import Captcha from './Captcha';
import { ErrorBoundary } from 'react-error-boundary'


function App() {
  const [isHuman, setIsHuman] = useState(false)
  return (
    <div className="App">
      {
        isHuman === false ? (
          <ErrorBoundary
            fallback={<div>упс</div>}
          >
            <Captcha
              onSuccess={() => { setIsHuman(true) }}
            />
          </ErrorBoundary>
        ) : (
          <div>ура</div>
        )
      }

    </div>
  );
}

export default App;
