// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import CreateContactScreen from './pages/CreateContactScreen';
import ChartsAndGraphs from './pages/ChartsAndGraphs';
import Layout from './components/Layout';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} /> {/* Default to contacts page */}
        <Route path="/" element={<Layout />}>
          <Route path="contacts" element={<ContactPage />} />
          <Route path="create-contact" element={<CreateContactScreen />} />
          <Route path="edit-contact/:contactId" element={<ContactForm />} />
          <Route path="charts-and-Maps" element={<ChartsAndGraphs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
