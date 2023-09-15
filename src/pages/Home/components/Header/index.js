/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import useHome from '../../useHome';

import { Container } from './styles';

export default function Header() {
  const { contacts, hasError, filteredContacts } = useHome();

  const alignment = hasError
    ? 'flex-end'
    : (contacts.length > 0 ? 'space-between' : 'center');

  return (
    <Container $justifyContent={alignment}>
      {(!hasError && contacts.length > 0) && (
      <strong>
        {filteredContacts.length}
        {filteredContacts.length === 1 ? ' contato' : ' contatos'}
      </strong>
      )}

      <Link to="/new">Novo contato</Link>
    </Container>
  );
}
