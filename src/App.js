// ===== COMPONENTE PRINCIPAL DE LA APLICACIÓN =====
// Este es el componente raíz que configura toda la aplicación React
// Incluye: routing, tema global, estilos globales y estructura principal
// Desarrollado para proyecto universitario de conversión de unidades

// Importaciones de React y librerías principales
import React from 'react'; // Librería principal de React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Sistema de rutas SPA
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'; // CSS-in-JS para estilos

// Importaciones de componentes y páginas de la aplicación
import Header from './components/Header';           // Componente de navegación superior
import Home from './pages/Home';                   // Página principal con tarjetas de conversión
import ConversionPage from './pages/ConversionPage'; // Página individual de cada tipo de conversión

// ===== CONFIGURACIÓN DEL TEMA GLOBAL =====
// Objeto que define todos los colores, espaciados y breakpoints de la aplicación
// Permite mantener consistencia visual en todos los componentes
const theme = {
  // Paleta de colores de la aplicación
  colors: {
    primary: '#6366f1',        // Azul principal (botones, enlaces)
    primaryDark: '#4f46e5',    // Azul oscuro (hover states)
    secondary: '#f8fafc',      // Gris claro (fondo de la app)
    accent: '#10b981',         // Verde (elementos de éxito)
    text: '#1f2937',          // Gris oscuro (texto principal)
    textLight: '#6b7280',     // Gris medio (texto secundario)
    white: '#ffffff',         // Blanco puro
    gray100: '#f3f4f6',       // Gris muy claro
    gray200: '#e5e7eb',       // Gris claro
    gray300: '#d1d5db',       // Gris medio
    shadow: 'rgba(0, 0, 0, 0.1)' // Sombra sutil
  },
  // Breakpoints para diseño responsivo
  breakpoints: {
    mobile: '768px',          // Dispositivos móviles
    tablet: '1024px',         // Tablets
    desktop: '1200px'         // Escritorio
  },
  borderRadius: '12px',       // Radio de borde estándar
  // Sistema de espaciado consistente
  spacing: {
    xs: '0.5rem',            // 8px
    sm: '1rem',              // 16px
    md: '1.5rem',            // 24px
    lg: '2rem',              // 32px
    xl: '3rem'               // 48px
  }
};

// ===== ESTILOS GLOBALES DE LA APLICACIÓN =====
// Define estilos base que se aplican a toda la aplicación
// Incluye reset CSS, tipografía y estilos base para elementos HTML
const GlobalStyle = createGlobalStyle`
  /* Reset CSS básico para consistencia entre navegadores */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Incluye padding y border en el width/height */
  }

  /* Estilos del body - configuración base de la aplicación */
  body {
    /* Stack de fuentes modernas y legibles */
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    /* Suavizado de fuentes para mejor legibilidad */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Colores del tema aplicados globalmente */
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    line-height: 1.6; /* Espaciado de línea para mejor legibilidad */
  }

  /* Estilos para bloques de código */
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Estilos base para botones - elimina estilos por defecto del navegador */
  button {
    cursor: pointer;    /* Cursor de mano al hacer hover */
    border: none;       /* Sin borde por defecto */
    outline: none;      /* Sin outline al hacer focus */
    font-family: inherit; /* Hereda la fuente del padre */
  }

  /* Estilos base para inputs */
  input {
    outline: none;      /* Sin outline por defecto */
    font-family: inherit; /* Hereda la fuente del padre */
  }
`;

// ===== COMPONENTES STYLED PARA LA ESTRUCTURA =====

// Contenedor principal de la aplicación
// Usa Flexbox para crear un layout de altura completa
const AppContainer = styled.div`
  min-height: 100vh;        /* Altura mínima de toda la ventana */
  display: flex;            /* Flexbox para layout vertical */
  flex-direction: column;   /* Dirección vertical (Header arriba, Main abajo) */
`;

// Contenedor del contenido principal
// Se expande para ocupar el espacio restante después del Header
const MainContent = styled.main`
  flex: 1;                  /* Ocupa todo el espacio disponible */
  /* Padding responsivo usando el sistema de espaciado del tema */
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
  max-width: 1200px;        /* Ancho máximo para pantallas grandes */
  margin: 0 auto;           /* Centrado horizontal */
  width: 100%;              /* Ancho completo hasta el max-width */
`;

// ===== COMPONENTE PRINCIPAL APP =====
// Función que renderiza toda la estructura de la aplicación
function App() {
  return (
    // ThemeProvider: Proporciona el tema a todos los componentes hijos
    <ThemeProvider theme={theme}>
      {/* Inyecta los estilos globales en el documento */}
      <GlobalStyle />
      
      {/* Router: Habilita la navegación SPA (Single Page Application) */}
      <Router>
        {/* Contenedor principal con layout Flexbox */}
        <AppContainer>
          {/* Header: Barra de navegación superior (siempre visible) */}
          <Header />
          
          {/* MainContent: Área donde se renderizan las diferentes páginas */}
          <MainContent>
            {/* Routes: Define las rutas de la aplicación */}
            <Routes>
              {/* Ruta principal: muestra la página Home con las tarjetas de conversión */}
              <Route path="/" element={<Home />} />
              
              {/* Ruta dinámica: muestra la página de conversión específica */}
              {/* :type puede ser 'tiempo', 'peso', 'temperatura' o 'moneda' */}
              <Route path="/conversion/:type" element={<ConversionPage />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

// ===== EXPORTACIÓN DEL COMPONENTE =====
// Exporta App como componente por defecto para usar en index.js
export default App;