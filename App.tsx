import React from 'react';
import {AppNavigator} from './src/navigation/AppNavigator';
import {LightningWatchProvider} from './src/storage/LightningWatchContext';

function App(): React.JSX.Element {
  return (
    <LightningWatchProvider>
      <AppNavigator />
    </LightningWatchProvider>
  );
}

export default App;
