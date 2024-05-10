import './App.css';

import { ThemeProvider } from 'Helpers/ThemeHelper';
import Layout from 'Components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout /> 
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
