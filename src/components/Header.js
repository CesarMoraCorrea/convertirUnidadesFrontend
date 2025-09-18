// ===== COMPONENTE HEADER - BARRA DE NAVEGACIÓN =====
// Componente que renderiza la barra de navegación superior de la aplicación
// Incluye: logo, título y navegación principal
// Características: sticky positioning, gradiente de fondo, responsive

// Importaciones de React y hooks
import React from 'react';                              // Librería principal de React
import { Link, useLocation } from 'react-router-dom';   // Componentes de navegación y hook de ubicación
import styled from 'styled-components';                 // CSS-in-JS para estilos
import { FiHome, FiSettings } from 'react-icons/fi';    // Iconos de Feather Icons

// ===== STYLED COMPONENTS =====

// Contenedor principal del header
// Usa gradiente de fondo y posicionamiento sticky
const HeaderContainer = styled.header`
  /* Gradiente de azul claro a azul oscuro */
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white};           /* Texto blanco */
  /* Padding vertical medio, horizontal pequeño */
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};
  box-shadow: 0 4px 6px -1px ${props => props.theme.colors.shadow}; /* Sombra sutil */
  position: sticky;                                      /* Se mantiene fijo al hacer scroll */
  top: 0;                                               /* Pegado a la parte superior */
  z-index: 100;                                         /* Por encima de otros elementos */
`;

// Contenedor del contenido del header
// Centra el contenido y distribuye los elementos
const HeaderContent = styled.div`
  max-width: 1200px;                    /* Ancho máximo para pantallas grandes */
  margin: 0 auto;                       /* Centrado horizontal */
  display: flex;                        /* Flexbox para layout horizontal */
  justify-content: space-between;       /* Logo a la izquierda, nav a la derecha */
  align-items: center;                  /* Alineación vertical centrada */
`;

// Componente del logo/título principal
// Combina icono y texto, funciona como enlace a la página principal
const Logo = styled(Link)`
  font-size: 1.5rem;                    /* Tamaño de fuente grande */
  font-weight: 700;                     /* Texto en negrita */
  text-decoration: none;                /* Sin subrayado de enlace */
  color: ${props => props.theme.colors.white}; /* Color blanco */
  display: flex;                        /* Flexbox para alinear icono y texto */
  align-items: center;                  /* Alineación vertical centrada */
  gap: ${props => props.theme.spacing.xs}; /* Espacio entre icono y texto */
  
  /* Efecto hover sutil */
  &:hover {
    opacity: 0.9;                       /* Ligera transparencia al pasar el mouse */
  }
`;

// Contenedor de la navegación
// Organiza los enlaces de navegación horizontalmente
const Nav = styled.nav`
  display: flex;                        /* Flexbox para layout horizontal */
  gap: ${props => props.theme.spacing.md}; /* Espacio entre enlaces */
  align-items: center;                  /* Alineación vertical centrada */
`;

// Enlaces de navegación con estados hover y activo
// Incluye iconos y efectos de transición
const NavLink = styled(Link)`
  color: ${props => props.theme.colors.white};           /* Texto blanco */
  text-decoration: none;                                 /* Sin subrayado */
  /* Padding interno para área clickeable */
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius};   /* Bordes redondeados */
  display: flex;                                         /* Flexbox para icono y texto */
  align-items: center;                                   /* Alineación vertical centrada */
  gap: ${props => props.theme.spacing.xs};               /* Espacio entre icono y texto */
  font-weight: 500;                                      /* Peso de fuente medio */
  transition: all 0.2s ease;                            /* Transición suave para efectos */
  
  /* Estado hover - fondo semi-transparente */
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);         /* Fondo blanco con 10% opacidad */
  }
  
  /* Estado activo - fondo más visible para la página actual */
  &.active {
    background-color: rgba(255, 255, 255, 0.2);         /* Fondo blanco con 20% opacidad */
  }
`;

// Título del logo con diseño responsivo
// Se adapta al tamaño de pantalla
const Title = styled.h1`
  font-size: 1.2rem;                    /* Tamaño base del título */
  font-weight: 600;                     /* Peso de fuente semi-bold */
  margin: 0;                            /* Sin márgenes por defecto */
  
  /* Responsive: tamaño menor en móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;                    /* Tamaño reducido para móviles */
  }
`;

// ===== COMPONENTE FUNCIONAL HEADER =====
// Renderiza la barra de navegación superior de la aplicación
const Header = () => {
  // Hook para obtener la ubicación actual (ruta activa)
  const location = useLocation();
  
  return (
    // Contenedor principal del header
    <HeaderContainer>
      <HeaderContent>
        {/* Logo y título - enlace a la página principal */}
        <Logo to="/">
          <FiSettings size={24} />              {/* Icono de configuración/herramientas */}
          <Title>Convertir Unidades</Title>     {/* Título de la aplicación */}
        </Logo>
        
        {/* Navegación principal */}
        <Nav>
          {/* Enlace a la página de inicio */}
          <NavLink 
            to="/"                               /* Ruta de destino */
            /* Aplica clase 'active' si estamos en la página principal */
            className={location.pathname === '/' ? 'active' : ''}
          >
            <FiHome size={18} />                /* Icono de casa */
            Inicio                              {/* Texto del enlace */}
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

// ===== EXPORTACIÓN DEL COMPONENTE =====
// Exporta Header como componente por defecto
export default Header;