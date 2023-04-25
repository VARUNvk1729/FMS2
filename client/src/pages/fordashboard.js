import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterLink = styled(Link)`
  color: #fff !important;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;

  &:hover {
    color: #01bf71 !important;
    transition: 0.3s ease-out;
  }
`;
