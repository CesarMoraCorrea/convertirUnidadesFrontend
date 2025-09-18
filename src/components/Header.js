import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiSettings } from 'react-icons/fi';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};
  box-shadow: 0 4px 6px -1px ${props => props.theme.colors.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  &:hover {
    opacity: 0.9;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Header = () => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <FiSettings size={24} />
          <Title>Convertir Unidades</Title>
        </Logo>
        
        <Nav>
          <NavLink 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            <FiHome size={18} />
            Inicio
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;