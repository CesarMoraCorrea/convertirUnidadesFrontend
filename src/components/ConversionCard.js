// ===== COMPONENTE CONVERSION CARD =====
// Tarjeta interactiva que representa cada tipo de conversión disponible
// Características: hover effects, preview de unidades, diseño modular
// Se usa en la página Home para mostrar las opciones de conversión

// Importaciones necesarias
import React from 'react';                    // Librería principal de React
import styled from 'styled-components';       // CSS-in-JS para estilos
import { FiArrowRight } from 'react-icons/fi'; // Icono de flecha para call-to-action

// ===== STYLED COMPONENTS =====

// Contenedor principal de la tarjeta
// Incluye efectos hover avanzados y barra de color superior
const Card = styled.div`
  background: ${props => props.theme.colors.white};     /* Fondo blanco */
  border-radius: ${props => props.theme.borderRadius};  /* Bordes redondeados del tema */
  padding: ${props => props.theme.spacing.lg};          /* Padding grande interno */
  box-shadow: 0 4px 6px -1px ${props => props.theme.colors.shadow}; /* Sombra base */
  cursor: pointer;                                      /* Cursor de mano para indicar interactividad */
  transition: all 0.3s ease;                           /* Transición suave para todos los efectos */
  border: 2px solid transparent;                       /* Borde transparente inicial */
  position: relative;                                   /* Para posicionar la barra superior */
  overflow: hidden;                                     /* Oculta elementos que se salen */
  
  /* Efectos hover - elevación y sombra más pronunciada */
  &:hover {
    transform: translateY(-4px);                        /* Eleva la tarjeta 4px */
    box-shadow: 0 10px 25px -3px ${props => props.theme.colors.shadow}; /* Sombra más grande */
    border-color: ${props => props.color};              /* Borde del color temático */
  }
  
  /* Pseudo-elemento: barra de color superior */
  &::before {
    content: '';                                        /* Contenido vacío requerido */
    position: absolute;                                 /* Posicionamiento absoluto */
    top: 0;                                            /* Pegado arriba */
    left: 0;                                           /* Desde la izquierda */
    right: 0;                                          /* Hasta la derecha */
    height: 4px;                                       /* Altura de 4px */
    background: ${props => props.color};               /* Color temático de la tarjeta */
  }
`;

// Header de la tarjeta - contiene icono y título
// Layout horizontal con alineación centrada
const CardHeader = styled.div`
  display: flex;                                        /* Flexbox horizontal */
  align-items: center;                                  /* Alineación vertical centrada */
  gap: ${props => props.theme.spacing.sm};              /* Espacio entre icono y título */
  margin-bottom: ${props => props.theme.spacing.md};    /* Margen inferior */
`;

// Contenedor del icono con fondo de color temático
// Círculo con el color de la tarjeta en transparencia
const IconWrapper = styled.div`
  width: 48px;                                          /* Ancho fijo */
  height: 48px;                                         /* Alto fijo (cuadrado) */
  border-radius: 12px;                                  /* Bordes redondeados */
  background: ${props => props.color}15;                /* Color temático con 15% opacidad */
  display: flex;                                        /* Flexbox para centrar icono */
  align-items: center;                                  /* Centrado vertical */
  justify-content: center;                              /* Centrado horizontal */
  color: ${props => props.color};                       /* Color del icono */
`;

// Título principal de la tarjeta
// Tipografía prominente para identificar el tipo de conversión
const CardTitle = styled.h3`
  font-size: 1.5rem;                                    /* Tamaño de fuente grande */
  font-weight: 600;                                     /* Peso semi-bold */
  color: ${props => props.theme.colors.text};           /* Color de texto del tema */
  margin: 0;                                            /* Sin márgenes por defecto */
`;

// Descripción de la tarjeta
// Texto explicativo sobre el tipo de conversión
const CardDescription = styled.p`
  color: ${props => props.theme.colors.textLight};      /* Color de texto secundario */
  margin-bottom: ${props => props.theme.spacing.md};    /* Margen inferior */
  line-height: 1.6;                                     /* Espaciado de línea para legibilidad */
`;

// Contenedor de preview de unidades
// Muestra las unidades disponibles en formato de tags
const UnitsPreview = styled.div`
  display: flex;                                        /* Flexbox para layout horizontal */
  flex-wrap: wrap;                                      /* Permite salto de línea si es necesario */
  gap: ${props => props.theme.spacing.xs};              /* Espacio pequeño entre tags */
  margin-bottom: ${props => props.theme.spacing.md};    /* Margen inferior */
`;

// Tag individual para cada unidad
// Pequeñas etiquetas que muestran las unidades disponibles
const UnitTag = styled.span`
  background: ${props => props.theme.colors.gray100};   /* Fondo gris claro */
  color: ${props => props.theme.colors.textLight};      /* Texto gris */
  padding: 4px 8px;                                     /* Padding interno pequeño */
  border-radius: 6px;                                   /* Bordes redondeados pequeños */
  font-size: 0.875rem;                                  /* Tamaño de fuente pequeño */
  font-weight: 500;                                     /* Peso medio */
`;

// Footer de la tarjeta
// Contiene el call-to-action
const CardFooter = styled.div`
  display: flex;                                        /* Flexbox horizontal */
  align-items: center;                                  /* Alineación vertical centrada */
  justify-content: space-between;                       /* Distribución del espacio */
  margin-top: ${props => props.theme.spacing.md};       /* Margen superior */
`;

// Texto de acción con efecto hover
// Call-to-action que se anima cuando se hace hover en la tarjeta
const ActionText = styled.span`
  color: ${props => props.color};                       /* Color temático */
  font-weight: 600;                                     /* Texto en negrita */
  display: flex;                                        /* Flexbox para icono y texto */
  align-items: center;                                  /* Alineación vertical centrada */
  gap: ${props => props.theme.spacing.xs};              /* Espacio inicial entre texto e icono */
  transition: gap 0.2s ease;                           /* Transición suave del espacio */
  
  /* Efecto cuando se hace hover en la tarjeta padre */
  ${Card}:hover & {
    gap: ${props => props.theme.spacing.sm};            /* Aumenta el espacio en hover */
  }
`;

// ===== COMPONENTE FUNCIONAL CONVERSION CARD =====
// Renderiza una tarjeta interactiva para cada tipo de conversión
// Props: title, description, icon, color, units, onClick
const ConversionCard = ({ title, description, icon: Icon, color, units, onClick }) => {
  return (
    // Tarjeta principal con color temático y función onClick
    <Card color={color} onClick={onClick}>
      {/* Header: icono y título */}
      <CardHeader>
        {/* Contenedor del icono con fondo de color */}
        <IconWrapper color={color}>
          <Icon size={24} />                            {/* Icono dinámico pasado como prop */}
        </IconWrapper>
        <CardTitle>{title}</CardTitle>                  {/* Título de la conversión */}
      </CardHeader>
      
      {/* Descripción explicativa */}
      <CardDescription>{description}</CardDescription>
      
      {/* Preview de unidades disponibles */}
      <UnitsPreview>
        {/* Muestra las primeras 4 unidades */}
        {units.slice(0, 4).map((unit, index) => (
          <UnitTag key={index}>{unit}</UnitTag>
        ))}
        {/* Si hay más de 4 unidades, muestra contador */}
        {units.length > 4 && (
          <UnitTag>+{units.length - 4} más</UnitTag>
        )}
      </UnitsPreview>
      
      {/* Footer con call-to-action */}
      <CardFooter>
        <ActionText color={color}>
          Comenzar conversión                           {/* Texto de acción */}
          <FiArrowRight size={16} />                    {/* Icono de flecha */}
        </ActionText>
      </CardFooter>
    </Card>
  );
};

// ===== EXPORTACIÓN DEL COMPONENTE =====
// Exporta ConversionCard como componente por defecto
export default ConversionCard;