/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-useless-fragment */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal from '../../../../components/Modal';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import emptyBox from '../../../../assets/images/empty-box.svg';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

import {
  ListHeader,
  Card,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

export default function ContactsList({
  isLoading,
  isDeleteModalVisible,
  isLoadingDelete,
  contactBeingDeleted,
  handleCloseDeleteModal,
  handleConfirmDeleteContact,
  contacts,
  searchTerm,
  hasError,
  filteredContacts,
  orderBy,
  handleToggleOrderBy,
  handleDeleteContact,
}) {
  return (
    <>
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

                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}

          <Modal
            danger
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </>
  );
}

ContactsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isDeleteModalVisible: PropTypes.bool.isRequired,
  isLoadingDelete: PropTypes.bool.isRequired,
  contactBeingDeleted: PropTypes.shape().isRequired,
  handleCloseDeleteModal: PropTypes.func.isRequired,
  handleConfirmDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.shape().isRequired,
  searchTerm: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  filteredContacts: PropTypes.shape().isRequired,
  orderBy: PropTypes.string.isRequired,
  handleToggleOrderBy: PropTypes.func.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};
