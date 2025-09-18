// ===== PÁGINA DE CONVERSIÓN - PÁGINA ESPECÍFICA PARA CADA TIPO =====
// Página dinámica que maneja las conversiones específicas por tipo
// Incluye: formulario de conversión, intercambio de unidades, resultados en tiempo real
// Maneja: tiempo, peso, temperatura y moneda con sus respectivas unidades

// Importaciones de React y hooks
import React, { useState, useEffect, useCallback } from 'react'; // React y hooks para estado y efectos
import { useParams, Link } from 'react-router-dom';               // Hooks de routing y componente Link
import styled from 'styled-components';                           // CSS-in-JS para estilos
// Iconos para navegación y funcionalidad
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';        // Iconos de flecha y refresh
// Servicio API para realizar conversiones
import { convertUnits } from '../services/api';                   // Función para llamadas al backend

// ===== STYLED COMPONENTS =====

// Contenedor principal de la página de conversión
// Centra el contenido con ancho máximo optimizado
const PageContainer = styled.div`
  max-width: 800px;                        /* Ancho máximo para formularios */
  margin: 0 auto;                          /* Centrado horizontal */
`;

// Botón de navegación de regreso al inicio
// Styled Link con icono y efectos hover
const BackButton = styled(Link)`
  display: inline-flex;                    /* Flexbox para alinear icono y texto */
  align-items: center;                     /* Alineación vertical centrada */
  gap: ${props => props.theme.spacing.xs}; /* Espacio entre icono y texto */
  color: ${props => props.theme.colors.primary}; /* Color primario del tema */
  text-decoration: none;                   /* Sin subrayado */
  font-weight: 500;                        /* Peso medio */
  margin-bottom: ${props => props.theme.spacing.lg}; /* Margen inferior */
  padding: ${props => props.theme.spacing.xs} 0; /* Padding vertical */
  
  /* Efecto hover */
  &:hover {
    color: ${props => props.theme.colors.primaryDark}; /* Color más oscuro al hover */
  }
`;

// Título principal de la página de conversión
// Tipografía prominente con diseño responsivo
const PageTitle = styled.h1`
  font-size: 2.5rem;                       /* Tamaño grande */
  font-weight: 700;                        /* Peso extra bold */
  color: ${props => props.theme.colors.text}; /* Color de texto principal */
  margin-bottom: ${props => props.theme.spacing.sm}; /* Margen inferior */
  text-align: center;                      /* Texto centrado */
  
  /* Responsive: tamaño menor en móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;                       /* Tamaño reducido para móviles */
  }
`;

// Contenedor principal del formulario de conversión
// Card con sombra y padding generoso
const ConversionContainer = styled.div`
  background: ${props => props.theme.colors.white}; /* Fondo blanco */
  border-radius: ${props => props.theme.borderRadius}; /* Bordes redondeados */
  padding: ${props => props.theme.spacing.xl};     /* Padding grande */
  box-shadow: 0 4px 6px -1px ${props => props.theme.colors.shadow}; /* Sombra sutil */
  margin-top: ${props => props.theme.spacing.lg};  /* Margen superior */
`;

// Contenedor del formulario usando CSS Grid
// Organiza los elementos con espaciado consistente
const ConversionForm = styled.div`
  display: grid;                           /* CSS Grid para layout */
  gap: ${props => props.theme.spacing.lg}; /* Espacio entre elementos */
`;

// Grupo principal de inputs con layout de 3 columnas
// Organiza: input origen, botón swap, input destino
const InputGroup = styled.div`
  display: grid;                           /* CSS Grid para layout */
  grid-template-columns: 1fr auto 1fr;    /* 3 columnas: flexible, auto, flexible */
  gap: ${props => props.theme.spacing.md}; /* Espacio entre columnas */
  align-items: end;                        /* Alineación al final (bottom) */
  
  /* Responsive: una columna en móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;            /* Una sola columna */
    gap: ${props => props.theme.spacing.sm}; /* Espacio menor */
  }
`;

// Sección individual de input (cantidad + unidad)
// Agrupa label, input y select verticalmente
const InputSection = styled.div`
  display: flex;                           /* Flexbox para layout vertical */
  flex-direction: column;                  /* Dirección vertical */
  gap: ${props => props.theme.spacing.xs}; /* Espacio pequeño entre elementos */
`;

// Etiquetas para los campos del formulario
// Tipografía semibold y tamaño pequeño
const Label = styled.label`
  font-weight: 600;                        /* Peso semibold */
  color: ${props => props.theme.colors.text}; /* Color de texto principal */
  font-size: 0.875rem;                     /* Tamaño pequeño (14px) */
`;

// Campo de input para números y resultados
// Incluye estados focus y disabled
const Input = styled.input`
  padding: ${props => props.theme.spacing.sm}; /* Padding interno */
  border: 2px solid ${props => props.theme.colors.gray200}; /* Borde gris claro */
  border-radius: ${props => props.theme.borderRadius}; /* Bordes redondeados */
  font-size: 1rem;                         /* Tamaño de fuente estándar */
  transition: border-color 0.2s ease;      /* Transición suave del borde */
  
  /* Estado focus: borde primario */
  &:focus {
    border-color: ${props => props.theme.colors.primary}; /* Borde azul al enfocar */
  }
  
  /* Estado disabled: fondo gris y cursor no permitido */
  &:disabled {
    background-color: ${props => props.theme.colors.gray100}; /* Fondo gris claro */
    cursor: not-allowed;                   /* Cursor de no permitido */
  }
`;

// Selector dropdown para unidades de conversión
// Estilo consistente con los inputs
const Select = styled.select`
  padding: ${props => props.theme.spacing.sm}; /* Padding interno */
  border: 2px solid ${props => props.theme.colors.gray200}; /* Borde gris claro */
  border-radius: ${props => props.theme.borderRadius}; /* Bordes redondeados */
  font-size: 1rem;                         /* Tamaño de fuente estándar */
  background-color: ${props => props.theme.colors.white}; /* Fondo blanco */
  cursor: pointer;                         /* Cursor de puntero */
  transition: border-color 0.2s ease;      /* Transición suave del borde */
  
  /* Estado focus: borde primario */
  &:focus {
    border-color: ${props => props.theme.colors.primary}; /* Borde azul al enfocar */
  }
`;

// Botón circular para intercambiar unidades
// Incluye animación de rotación al hover
const SwapButton = styled.button`
  background: ${props => props.theme.colors.primary}; /* Fondo azul primario */
  color: ${props => props.theme.colors.white};     /* Texto blanco */
  border: none;                            /* Sin borde */
  border-radius: 50%;                      /* Forma circular */
  width: 48px;                             /* Ancho fijo */
  height: 48px;                            /* Alto fijo */
  display: flex;                           /* Flexbox para centrar icono */
  align-items: center;                     /* Centrado vertical */
  justify-content: center;                 /* Centrado horizontal */
  transition: all 0.2s ease;               /* Transición suave */
  
  /* Efecto hover: color más oscuro y rotación */
  &:hover {
    background: ${props => props.theme.colors.primaryDark}; /* Color más oscuro */
    transform: rotate(180deg);             /* Rotación de 180 grados */
  }
  
  /* Responsive: centrado en móviles */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    align-self: center;                    /* Auto-centrado */
    margin: ${props => props.theme.spacing.sm} 0; /* Margen vertical */
  }
`;

// Sección de resultados con fondo destacado
// Muestra el resultado de la conversión de forma prominente
const ResultSection = styled.div`
  background: ${props => props.theme.colors.gray100}; /* Fondo gris claro */
  border-radius: ${props => props.theme.borderRadius}; /* Bordes redondeados */
  padding: ${props => props.theme.spacing.lg};     /* Padding generoso */
  text-align: center;                      /* Texto centrado */
  margin-top: ${props => props.theme.spacing.lg};  /* Margen superior */
`;

// Valor del resultado con tipografía prominente
// Muestra la ecuación de conversión completa
const ResultValue = styled.div`
  font-size: 2rem;                         /* Tamaño grande para destacar */
  font-weight: 700;                        /* Peso extra bold */
  color: ${props => props.theme.colors.primary}; /* Color primario */
  margin-bottom: ${props => props.theme.spacing.xs}; /* Margen inferior pequeño */
`;

// Etiqueta descriptiva del resultado
// Texto secundario con información adicional
const ResultLabel = styled.div`
  color: ${props => props.theme.colors.textLight}; /* Color de texto secundario */
  font-size: 0.875rem;                     /* Tamaño pequeño */
`;

// Información adicional para conversiones de moneda
// Muestra tasa de cambio y fecha de actualización
const CurrencyInfo = styled.div`
  background: ${props => props.theme.colors.accent}15; /* Fondo accent con transparencia */
  border: 1px solid ${props => props.theme.colors.accent}30; /* Borde accent con transparencia */
  border-radius: ${props => props.theme.borderRadius}; /* Bordes redondeados */
  padding: ${props => props.theme.spacing.sm};     /* Padding pequeño */
  margin-top: ${props => props.theme.spacing.md};  /* Margen superior */
  font-size: 0.875rem;                     /* Tamaño pequeño */
  color: ${props => props.theme.colors.textLight}; /* Color de texto secundario */
`;

// Spinner de carga animado
// Indica que se está procesando una conversión
const LoadingSpinner = styled.div`
  display: inline-block;                   /* Display inline para centrado */
  width: 20px;                             /* Ancho fijo */
  height: 20px;                            /* Alto fijo */
  border: 2px solid ${props => props.theme.colors.gray300}; /* Borde gris */
  border-radius: 50%;                      /* Forma circular */
  border-top-color: ${props => props.theme.colors.primary}; /* Top azul para efecto */
  animation: spin 1s ease-in-out infinite; /* Animación de rotación */
  
  /* Keyframes para la animación de rotación */
  @keyframes spin {
    to { transform: rotate(360deg); }      /* Rotación completa */
  }
`;

// ===== CONFIGURACIÓN DE CONVERSIONES =====
// Objeto que define todos los tipos de conversión y sus unidades
// Cada tipo incluye título y array de unidades con value/label
const conversionConfig = {
  // Configuración para conversiones de tiempo
  time: {
    title: 'Conversión de Tiempo',           // Título mostrado en la página
    units: [                                 // Array de unidades disponibles
      { value: 'segundos', label: 'Segundos' },     // value: para API, label: para UI
      { value: 'minutos', label: 'Minutos' },
      { value: 'horas', label: 'Horas' },
      { value: 'dias', label: 'Días' },
      { value: 'meses', label: 'Meses' },
      { value: 'años', label: 'Años' }
    ]
  },
  // Configuración para conversiones de peso
  weight: {
    title: 'Conversión de Peso',
    units: [
      { value: 'gramos', label: 'Gramos' },
      { value: 'kilogramos', label: 'Kilogramos' },
      { value: 'libras', label: 'Libras' }
    ]
  },
  // Configuración para conversiones de temperatura
  temperature: {
    title: 'Conversión de Temperatura',
    units: [
      { value: 'celsius', label: 'Celsius (°C)' },   // Incluye símbolos en labels
      { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
      { value: 'kelvin', label: 'Kelvin (K)' }
    ]
  },
  // Configuración para conversiones de moneda
  currency: {
    title: 'Conversión de Moneda',
    units: [
      { value: 'USD', label: 'Dólar Estadounidense (USD)' }, // Códigos ISO para API
      { value: 'EUR', label: 'Euro (EUR)' },
      { value: 'MXN', label: 'Peso Mexicano (MXN)' },
      { value: 'CHF', label: 'Franco Suizo (CHF)' }
    ]
  }
};

// ===== COMPONENTE FUNCIONAL CONVERSION PAGE =====
// Página principal para realizar conversiones específicas por tipo
// Maneja estado, efectos, y comunicación con la API
const ConversionPage = () => {
  // Extrae el tipo de conversión de los parámetros de la URL
  const { type } = useParams();                    // Hook para obtener parámetros de ruta
  
  // Estados del componente para manejar la interfaz y datos
  const [inputValue, setInputValue] = useState(''); // Valor ingresado por el usuario
  const [fromUnit, setFromUnit] = useState('');     // Unidad de origen
  const [toUnit, setToUnit] = useState('');         // Unidad de destino
  const [result, setResult] = useState(null);       // Resultado de la conversión
  const [loading, setLoading] = useState(false);    // Estado de carga
  const [currencyInfo, setCurrencyInfo] = useState(null); // Info adicional para monedas
  
  // Obtiene la configuración específica para el tipo de conversión actual
  const config = conversionConfig[type];            // Configuración basada en el tipo de URL
  
  // Efecto para inicializar las unidades por defecto
  // Se ejecuta cuando cambia el tipo de conversión
  useEffect(() => {
    if (config && config.units.length >= 2) {
      setFromUnit(config.units[0].value);           // Primera unidad como origen
      setToUnit(config.units[1].value);             // Segunda unidad como destino
    }
  }, [type, config]);                               // Dependencias: tipo y configuración
  
  // Función memoizada para realizar la conversión
  // Maneja validación, llamada a API, y manejo de errores
  const handleConversion = useCallback(async () => {
    // Validación: verifica que el input sea válido
    if (!inputValue || inputValue === '' || isNaN(inputValue)) {
      setResult(null);                              // Limpia resultado si input inválido
      return;
    }
    
    setLoading(true);                               // Inicia estado de carga
    try {
      // Llamada a la API con los parámetros de conversión
      const response = await convertUnits(type, {
        value: parseFloat(inputValue),              // Convierte string a número
        from: fromUnit,                             // Unidad de origen
        to: toUnit                                  // Unidad de destino
      });
      
      setResult(response.result);                   // Establece el resultado
      
      // Para conversiones de moneda, guarda información adicional
      if (type === 'currency' && response.rate) {
        setCurrencyInfo({
          rate: response.rate,                      // Tasa de cambio
          lastUpdated: response.lastUpdated         // Fecha de actualización
        });
      }
    } catch (error) {
      console.error('Error en conversión:', error); // Log del error
      setResult('Error');                           // Muestra error al usuario
    } finally {
      setLoading(false);                            // Termina estado de carga
    }
  }, [inputValue, fromUnit, toUnit, type]);         // Dependencias para memoización
  
  // Efecto para ejecutar conversión automáticamente
  // Se dispara cuando cambian los valores de entrada
  useEffect(() => {
    if (inputValue && fromUnit && toUnit && inputValue !== '') {
      handleConversion();                           // Ejecuta conversión si hay datos válidos
    } else {
      setResult(null);                              // Limpia resultado si faltan datos
      setCurrencyInfo(null);                        // Limpia info de moneda
    }
  }, [inputValue, fromUnit, toUnit, handleConversion]); // Dependencias del efecto
  
  // Función para intercambiar las unidades de origen y destino
  // Útil para conversiones bidireccionales rápidas
  const handleSwapUnits = () => {
    const temp = fromUnit;                          // Guarda temporalmente la unidad origen
    setFromUnit(toUnit);                            // Origen toma el valor de destino
    setToUnit(temp);                                // Destino toma el valor original de origen
  };
  
  // Renderizado condicional: maneja el caso de tipo de conversión inválido
  if (!config) {
    return (
      <PageContainer>
        <BackButton to="/">
          <FiArrowLeft size={16} />
          Volver al inicio
        </BackButton>
        <PageTitle>Tipo de conversión no encontrado</PageTitle>
      </PageContainer>
    );
  }
  
  // Renderizado principal del componente
  return (
    <PageContainer>
      {/* Botón de navegación de regreso */}
      <BackButton to="/">
        <FiArrowLeft size={16} />
        Volver al inicio
      </BackButton>
      
      {/* Título dinámico basado en el tipo de conversión */}
      <PageTitle>{config.title}</PageTitle>
      
      {/* Contenedor principal del formulario */}
      <ConversionContainer>
        <ConversionForm>
          {/* Grupo de inputs con layout de 3 columnas */}
          <InputGroup>
            {/* Sección de input de origen */}
            <InputSection>
              <Label>Cantidad</Label>
              <Input
                type="number"                    // Solo acepta números
                value={inputValue}               // Valor controlado
                onChange={(e) => setInputValue(e.target.value)} // Handler de cambio
                placeholder="Ingresa la cantidad"
                step="any"                       // Permite decimales
              />
              <Label>De:</Label>
              <Select
                value={fromUnit}                 // Unidad de origen seleccionada
                onChange={(e) => setFromUnit(e.target.value)} // Handler de cambio
              >
                {/* Mapea las unidades disponibles a opciones */}
                {config.units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </InputSection>
            
            {/* Botón para intercambiar unidades */}
            <SwapButton onClick={handleSwapUnits} type="button">
              <FiRefreshCw size={20} />
            </SwapButton>
            
            {/* Sección de resultado/destino */}
            <InputSection>
              <Label>Resultado</Label>
              <Input
                type="text"
                value={loading ? 'Calculando...' : (result !== null ? result : '')} // Muestra estado
                disabled                         // Solo lectura
                placeholder="Resultado aparecerá aquí"
              />
              <Label>A:</Label>
              <Select
                value={toUnit}                   // Unidad de destino seleccionada
                onChange={(e) => setToUnit(e.target.value)} // Handler de cambio
              >
                {/* Mapea las unidades disponibles a opciones */}
                {config.units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </InputSection>
          </InputGroup>
          
          {/* Sección de resultado exitoso */}
          {result !== null && !loading && (
            <ResultSection>
              <ResultValue>
                {inputValue} {config.units.find(u => u.value === fromUnit)?.label} = {result} {config.units.find(u => u.value === toUnit)?.label}
              </ResultValue>
              <ResultLabel>
                Conversión realizada exitosamente
              </ResultLabel>
            </ResultSection>
          )}
          
          {/* Sección de estado de carga */}
          {loading && (
            <ResultSection>
              <LoadingSpinner />
              <ResultLabel style={{ marginTop: '8px' }}>
                Calculando conversión...
              </ResultLabel>
            </ResultSection>
          )}
          
          {/* Información adicional para conversiones de moneda */}
          {currencyInfo && (
            <CurrencyInfo>
              <strong>Información de la tasa de cambio:</strong><br />
              Tasa: 1 {fromUnit} = {currencyInfo.rate} {toUnit}<br />
              Última actualización: {new Date(currencyInfo.lastUpdated).toLocaleString('es-ES')}
            </CurrencyInfo>
          )}
        </ConversionForm>
      </ConversionContainer>
    </PageContainer>
  );
};

// ===== EXPORTACIÓN DEL COMPONENTE =====
// Exporta ConversionPage como componente por defecto
export default ConversionPage;