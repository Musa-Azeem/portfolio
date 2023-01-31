import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap context provider around app to give everything access to context */}
    <ProjectsContextProvider>
      <App />
    </ProjectsContextProvider>
  </React.StrictMode>
);