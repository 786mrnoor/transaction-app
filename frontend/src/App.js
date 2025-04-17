import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute.js';
import Index from './app/Index/Index.js';
import TransactionAdd from './app/TransactionAdd/Index.js';
import TransactionEdit from './app/TransactionEdit/Index.js';
import Categories from './app/Categories/Index.js';
import Login from './app/Login/Login.js';
import SignUp from './app/SignUp/SignUp.js';
import Error from './app/Error/Error.js';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route index element={<Index />} />
          <Route path='add-transaction' element={<TransactionAdd />} />
          <Route path='edit-transaction/:id' element={<TransactionEdit />} />
          <Route path='categories' element={<Categories />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}