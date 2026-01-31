import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignInpage from './Pages/SignInpage';
import MainPage from './Pages/MainPage';
import TransactionPage from './Pages/TransactionPage';
import Viewtransaction from './Pages/Viewtransaction';
import Managetransaction from './Pages/Managetransaction';
import PageNotFound from './Pages/PageNotFound';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignInpage />} />

        {/* Protected Routes */}
        <Route
          path="/MainPage"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/TransactionPage"
          element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Viewtransaction"
          element={
            <ProtectedRoute>
              <Viewtransaction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Managetransaction"
          element={
            <ProtectedRoute>
              <Managetransaction />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
