/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import ContactsService from '../../services/ContactsService';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  async function loadContacts(order) {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(order);

      setContacts(contactsList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  useEffect(() => {
    loadContacts(orderBy);
  }, [orderBy]);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquise pelo nome..."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifycontent={
          hasError
            ? 'flex-end'
            : (contacts.length > 0 ? 'space-between' : 'center')
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button
              type="button"
              onClick={handleTryAgain}
            >
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length === 0 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader order={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>

                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button type="button">
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
