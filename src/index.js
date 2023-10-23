import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {AuthProvider} from './Context/Auth'
import { Provider } from 'react-redux';
import { BrowserRouter as  Router } from 'react-router-dom';
import store from './Store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store = {store}>
  <AuthProvider>
    <Router>
    <App />
    </Router>
  </AuthProvider>
</Provider>
);
reportWebVitals();
