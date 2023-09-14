import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const { id } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactsService.updateContact(id, contact);

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        history.push('/');
        safeAsyncAction(() => {
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
