import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthContext'; // Ensure Correct Path

import Router from './router';
import ScrollToTop from './Components/ScrollToTop';

function App() {

  return (
    <>
   
      <BrowserRouter>
      
        <AuthProvider>
          {/* <ViewRoutes /> */}
          <ScrollToTop />
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
