import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/app/(auth)/layout.jsx';
import Index from '@/app/(auth)/page';
import Categories from '@/app/(auth)/categories/page';
import Login from '@/app/(public)/login/page';
import SignUp from '@/app/(public)/signup/page';
import NotFound from '@/app/(public)/not-found/page';

import EditTransaction from './app/(auth)/edit-transaction/page';
import AddTransaction from './app/(auth)/add-transaction/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Index />} />
          <Route path="add-transaction" element={<AddTransaction />} />
          <Route path="edit-transaction/:id" element={<EditTransaction />} />
          <Route path="categories" element={<Categories />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
