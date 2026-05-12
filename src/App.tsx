import { useState } from 'react';
import { Login } from './components/Login';
import { ModulesBoard } from './components/ModulesBoard';
import { PmisLuoiApp } from './components/PmisLuoiApp';
import { INITIAL_USER_CONFIG, UserConfig } from './data';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userConfig, setUserConfig] = useState<UserConfig>(INITIAL_USER_CONFIG);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (activeModule === 'm3') {
    return (
      <PmisLuoiApp 
        config={userConfig} 
        onBack={() => setActiveModule(null)} 
      />
    );
  }

  return (
    <ModulesBoard 
      config={userConfig} 
      onUpdateConfig={setUserConfig} 
      onModuleSelect={setActiveModule}
    />
  );
}

