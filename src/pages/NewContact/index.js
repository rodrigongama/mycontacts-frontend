import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      await ContactsService.createContact({
        ...formData,
        category_id: formData.categoryId,
      });

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
