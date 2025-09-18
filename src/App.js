import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import ConversionPage from './pages/ConversionPage';

const theme = {
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#f8fafc',
    accent: '#10b981',
    text: '#1f2937',
    textLight: '#6b7280',
    white: '#ffffff',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  borderRadius: '12px',
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input {
    outline: none;
    font-family: inherit;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/conversion/:type" element={<ConversionPage />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;