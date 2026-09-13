import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { PhotosListPage } from './pages/PhotosListPage';
import { PhotoDetailsPage } from './pages/PhotoDetailsPage';
import { PhotoUploadPage } from './pages/PhotoUploadPage';
import { PhotoEditPage } from './pages/PhotoEditPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<PhotosListPage />} />
        <Route path="photos/upload" element={<PhotoUploadPage />} />
        <Route path="photos/:id" element={<PhotoDetailsPage />} />
        <Route path="photos/:id/edit" element={<PhotoEditPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}