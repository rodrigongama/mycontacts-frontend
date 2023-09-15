import useHome from './useHome';
import Header from './components/Header';
import ContactsList from './components/ContactsList';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import sad from '../../assets/images/sad.svg';

import { Container, InputSearchContainer, ErrorContainer } from './styles';

export default function Home() {
  const {
    isLoading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
  } = useHome();

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

      <Header />

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

      <ContactsList />
    </Container>
  );
}
