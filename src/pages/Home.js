// ===== PÁGINA HOME - PÁGINA PRINCIPAL =====
// Página de inicio que muestra todas las opciones de conversión disponibles
// Incluye: hero section, grid de tarjetas de conversión, navegación
// Es la landing page de la aplicación

// Importaciones de React y hooks
import React from 'react';                                    // Librería principal de React
import { useNavigate } from 'react-router-dom';               // Hook para navegación programática
import styled from 'styled-components';                       // CSS-in-JS para estilos
// Iconos para cada tipo de conversión
import { FiClock, FiPackage, FiThermometer, FiDollarSign } from 'react-icons/fi';
// Componente de tarjeta reutilizable
import ConversionCard from '../components/ConversionCard';

// ===== STYLED COMPONENTS =====

// Contenedor principal de la página Home
// Centra el contenido y limita el ancho máximo
const HomeContainer = styled.div`
  max-width: 1000px;                        /* Ancho máximo para legibilidad */
  margin: 0 auto;                           /* Centrado horizontal */
`;

// Sección hero - área principal de bienvenida
// Contiene título y descripción centrados
const Hero = styled.section`
  text-align: center;                       /* Texto centrado */
  margin-bottom: ${props => props.theme.spacing.xl}; /* Margen inferior grande */
`;

// Título principal de la página
// Tipografía grande y prominente con diseño responsivo
const HeroTitle = styled.h1`
  font-size: 3rem;                          /* Tamaño grande para impacto visual */
  font-weight: 700;                         /* Peso extra bold */
  color: ${props => props.theme.colors.text}; /* Color de texto del tema */
  margin-bottom: ${props => props.theme.spacing.sm}; /* Margen inferior pequeño */
  
  /* Responsive: tamaño menor en móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;                        /* Tamaño reducido para móviles */
  }
`;

// Subtítulo descriptivo de la aplicación
// Texto explicativo con ancho limitado para legibilidad
const HeroSubtitle = styled.p`
  font-size: 1.2rem;                        /* Tamaño mediano */
  color: ${props => props.theme.colors.textLight}; /* Color de texto secundario */
  max-width: 600px;                         /* Ancho máximo para legibilidad */
  margin: 0 auto;                           /* Centrado horizontal */
  line-height: 1.6;                         /* Espaciado de línea para legibilidad */
  
  /* Responsive: ajustes para móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;                        /* Tamaño menor */
    padding: 0 ${props => props.theme.spacing.sm}; /* Padding lateral */
  }
`;

// Grid responsivo para las tarjetas de conversión
// Usa CSS Grid para layout adaptativo
const CardsGrid = styled.div`
  display: grid;                            /* CSS Grid para layout */
  /* Columnas automáticas con ancho mínimo de 280px */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};  /* Espacio entre tarjetas */
  margin-top: ${props => props.theme.spacing.xl}; /* Margen superior grande */
  
  /* Responsive: una columna en móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;             /* Una sola columna */
    gap: ${props => props.theme.spacing.md}; /* Espacio menor entre tarjetas */
  }
`;

// ===== CONFIGURACIÓN DE TIPOS DE CONVERSIÓN =====
// Array que define todos los tipos de conversión disponibles
// Cada objeto contiene la información necesaria para renderizar una tarjeta
const conversionTypes = [
  {
    id: 'time',                             // ID único para routing
    title: 'Tiempo',                        // Título mostrado en la tarjeta
    description: 'Convierte entre horas, días, meses, años, segundos y minutos', // Descripción
    icon: FiClock,                          // Componente de icono
    color: '#3b82f6',                       // Color temático (azul)
    units: ['segundos', 'minutos', 'horas', 'días', 'meses', 'años'] // Unidades disponibles
  },
  {
    id: 'weight',                           // Conversiones de peso
    title: 'Peso',
    description: 'Convierte entre kilogramos, gramos y libras',
    icon: FiPackage,                        // Icono de paquete
    color: '#10b981',                       // Color temático (verde)
    units: ['gramos', 'kilogramos', 'libras']
  },
  {
    id: 'temperature',                      // Conversiones de temperatura
    title: 'Temperatura',
    description: 'Convierte entre Celsius, Fahrenheit y Kelvin',
    icon: FiThermometer,                    // Icono de termómetro
    color: '#f59e0b',                       // Color temático (amarillo/naranja)
    units: ['celsius', 'fahrenheit', 'kelvin']
  },
  {
    id: 'currency',                         // Conversiones de moneda
    title: 'Moneda',
    description: 'Convierte entre dólar, peso, euro y franco con tasas actualizadas',
    icon: FiDollarSign,                     // Icono de dólar
    color: '#8b5cf6',                       // Color temático (púrpura)
    units: ['USD', 'MXN', 'EUR', 'CHF']     // Códigos de moneda
  }
];

// ===== COMPONENTE FUNCIONAL HOME =====
// Página principal que renderiza la interfaz de inicio
const Home = () => {
  // Hook para navegación programática entre rutas
  const navigate = useNavigate();

  // Función que maneja el click en las tarjetas de conversión
  // Navega a la página específica de conversión
  const handleCardClick = (type) => {
    navigate(`/conversion/${type}`);          // Navega a /conversion/[tipo]
  };

  return (
    // Contenedor principal de la página
    <HomeContainer>
      {/* Sección hero con título y descripción */}
      <Hero>
        <HeroTitle>Convertir Unidades</HeroTitle>
        <HeroSubtitle>
          Convierte fácilmente entre diferentes unidades de tiempo, peso, temperatura y moneda.
          Interfaz moderna y tasas de cambio actualizadas en tiempo real.
        </HeroSubtitle>
      </Hero>

      {/* Grid de tarjetas de conversión */}
      <CardsGrid>
        {/* Mapea cada tipo de conversión a una tarjeta */}
        {conversionTypes.map((type) => (
          <ConversionCard
            key={type.id}                      // Key única para React
            title={type.title}                 // Título de la tarjeta
            description={type.description}     // Descripción
            icon={type.icon}                   // Componente de icono
            color={type.color}                 // Color temático
            units={type.units}                 // Array de unidades
            onClick={() => handleCardClick(type.id)} // Handler de click
          />
        ))}
      </CardsGrid>
    </HomeContainer>
  );
};

// ===== EXPORTACIÓN DEL COMPONENTE =====
// Exporta Home como componente por defecto
export default Home;