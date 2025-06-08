import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthContext'; // Ensure Correct Path

import Router from './router';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <ViewRoutes /> */}
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
