import React from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 4px 6px -1px ${props => props.theme.colors.shadow};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px ${props => props.theme.colors.shadow};
    border-color: ${props => props.color};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
`;

const UnitsPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const UnitTag = styled.span`
  background: ${props => props.theme.colors.gray100};
  color: ${props => props.theme.colors.textLight};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md};
`;

const ActionText = styled.span`
  color: ${props => props.color};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  transition: gap 0.2s ease;
  
  ${Card}:hover & {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ConversionCard = ({ title, description, icon: Icon, color, units, onClick }) => {
  return (
    <Card color={color} onClick={onClick}>
      <CardHeader>
        <IconWrapper color={color}>
          <Icon size={24} />
        </IconWrapper>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <CardDescription>{description}</CardDescription>
      
      <UnitsPreview>
        {units.slice(0, 4).map((unit, index) => (
          <UnitTag key={index}>{unit}</UnitTag>
        ))}
        {units.length > 4 && (
          <UnitTag>+{units.length - 4} más</UnitTag>
        )}
      </UnitsPreview>
      
      <CardFooter>
        <ActionText color={color}>
          Comenzar conversión
          <FiArrowRight size={16} />
        </ActionText>
      </CardFooter>
    </Card>
  );
};

export default ConversionCard;