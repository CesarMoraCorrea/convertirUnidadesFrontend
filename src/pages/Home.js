import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiClock, FiPackage, FiThermometer, FiDollarSign } from 'react-icons/fi';
import ConversionCard from '../components/ConversionCard';

const HomeContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const conversionTypes = [
  {
    id: 'time',
    title: 'Tiempo',
    description: 'Convierte entre horas, días, meses, años, segundos y minutos',
    icon: FiClock,
    color: '#3b82f6',
    units: ['segundos', 'minutos', 'horas', 'días', 'meses', 'años']
  },
  {
    id: 'weight',
    title: 'Peso',
    description: 'Convierte entre kilogramos, gramos y libras',
    icon: FiPackage,
    color: '#10b981',
    units: ['gramos', 'kilogramos', 'libras']
  },
  {
    id: 'temperature',
    title: 'Temperatura',
    description: 'Convierte entre Celsius, Fahrenheit y Kelvin',
    icon: FiThermometer,
    color: '#f59e0b',
    units: ['celsius', 'fahrenheit', 'kelvin']
  },
  {
    id: 'currency',
    title: 'Moneda',
    description: 'Convierte entre dólar, peso, euro y franco con tasas actualizadas',
    icon: FiDollarSign,
    color: '#8b5cf6',
    units: ['USD', 'MXN', 'EUR', 'CHF']
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    navigate(`/conversion/${type}`);
  };

  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Convertir Unidades</HeroTitle>
        <HeroSubtitle>
          Convierte fácilmente entre diferentes unidades de tiempo, peso, temperatura y moneda.
          Interfaz moderna y tasas de cambio actualizadas en tiempo real.
        </HeroSubtitle>
      </Hero>

      <CardsGrid>
        {conversionTypes.map((type) => (
          <ConversionCard
            key={type.id}
            title={type.title}
            description={type.description}
            icon={type.icon}
            color={type.color}
            units={type.units}
            onClick={() => handleCardClick(type.id)}
          />
        ))}
      </CardsGrid>
    </HomeContainer>
  );
};

export default Home;