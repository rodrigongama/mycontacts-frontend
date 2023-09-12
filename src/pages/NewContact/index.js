import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit({
    name, email, phone, categoryId,
  }) {
    try {
      await ContactsService.createContact({
        name,
        email,
        phone,
        category_id: categoryId,
      });

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
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
