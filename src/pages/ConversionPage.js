import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { convertUnits } from '../services/api';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xs} 0;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const ConversionContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: 0 4px 6px -1px ${props => props.theme.colors.shadow};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ConversionForm = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${props => props.theme.spacing.md};
  align-items: end;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray100};
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SwapButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: rotate(180deg);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    align-self: center;
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const ResultSection = styled.div`
  background: ${props => props.theme.colors.gray100};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  margin-top: ${props => props.theme.spacing.lg};
`;

const ResultValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ResultLabel = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.875rem;
`;

const CurrencyInfo = styled.div`
  background: ${props => props.theme.colors.accent}15;
  border: 1px solid ${props => props.theme.colors.accent}30;
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.colors.gray300};
  border-radius: 50%;
  border-top-color: ${props => props.theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const conversionConfig = {
  time: {
    title: 'Conversión de Tiempo',
    units: [
      { value: 'segundos', label: 'Segundos' },
      { value: 'minutos', label: 'Minutos' },
      { value: 'horas', label: 'Horas' },
      { value: 'dias', label: 'Días' },
      { value: 'meses', label: 'Meses' },
      { value: 'años', label: 'Años' }
    ]
  },
  weight: {
    title: 'Conversión de Peso',
    units: [
      { value: 'gramos', label: 'Gramos' },
      { value: 'kilogramos', label: 'Kilogramos' },
      { value: 'libras', label: 'Libras' }
    ]
  },
  temperature: {
    title: 'Conversión de Temperatura',
    units: [
      { value: 'celsius', label: 'Celsius (°C)' },
      { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
      { value: 'kelvin', label: 'Kelvin (K)' }
    ]
  },
  currency: {
    title: 'Conversión de Moneda',
    units: [
      { value: 'USD', label: 'Dólar Estadounidense (USD)' },
      { value: 'EUR', label: 'Euro (EUR)' },
      { value: 'MXN', label: 'Peso Mexicano (MXN)' },
      { value: 'CHF', label: 'Franco Suizo (CHF)' }
    ]
  }
};

const ConversionPage = () => {
  const { type } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencyInfo, setCurrencyInfo] = useState(null);
  
  const config = conversionConfig[type];
  
  useEffect(() => {
    if (config && config.units.length >= 2) {
      setFromUnit(config.units[0].value);
      setToUnit(config.units[1].value);
    }
  }, [type, config]);
  
  const handleConversion = useCallback(async () => {
    if (!inputValue || inputValue === '' || isNaN(inputValue)) {
      setResult(null);
      return;
    }
    
    setLoading(true);
    try {
      const response = await convertUnits(type, {
        value: parseFloat(inputValue),
        from: fromUnit,
        to: toUnit
      });
      
      setResult(response.result);
      
      if (type === 'currency' && response.rate) {
        setCurrencyInfo({
          rate: response.rate,
          lastUpdated: response.lastUpdated
        });
      }
    } catch (error) {
      console.error('Error en conversión:', error);
      setResult('Error');
    } finally {
      setLoading(false);
    }
  }, [inputValue, fromUnit, toUnit, type]);
  
  useEffect(() => {
    if (inputValue && fromUnit && toUnit && inputValue !== '') {
      handleConversion();
    } else {
      setResult(null);
      setCurrencyInfo(null);
    }
  }, [inputValue, fromUnit, toUnit, handleConversion]);
  
  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };
  
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
  
  return (
    <PageContainer>
      <BackButton to="/">
        <FiArrowLeft size={16} />
        Volver al inicio
      </BackButton>
      
      <PageTitle>{config.title}</PageTitle>
      
      <ConversionContainer>
        <ConversionForm>
          <InputGroup>
            <InputSection>
              <Label>Cantidad</Label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ingresa la cantidad"
                step="any"
              />
              <Label>De:</Label>
              <Select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {config.units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </InputSection>
            
            <SwapButton onClick={handleSwapUnits} type="button">
              <FiRefreshCw size={20} />
            </SwapButton>
            
            <InputSection>
              <Label>Resultado</Label>
              <Input
                type="text"
                value={loading ? 'Calculando...' : (result !== null ? result : '')}
                disabled
                placeholder="Resultado aparecerá aquí"
              />
              <Label>A:</Label>
              <Select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {config.units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </InputSection>
          </InputGroup>
          
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
          
          {loading && (
            <ResultSection>
              <LoadingSpinner />
              <ResultLabel style={{ marginTop: '8px' }}>
                Calculando conversión...
              </ResultLabel>
            </ResultSection>
          )}
          
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

export default ConversionPage;