import './App.css'
import AuthProvider from './context/AuthContext'; // Ensure Correct Path
import ViewRoutes from './ViewRoutes'

function App() {
  return (
    <>
      <AuthProvider>
        <ViewRoutes />
      </AuthProvider>

    </>
  )
}

export default App
