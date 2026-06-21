import React from 'react';
import {AppNavigator} from './src/navigation/AppNavigator';
import {RoutePlanProvider} from './src/storage/RoutePlanContext';

function App(): React.JSX.Element {
  return (
    <RoutePlanProvider>
      <AppNavigator />
    </RoutePlanProvider>
  );
}

export default App;
