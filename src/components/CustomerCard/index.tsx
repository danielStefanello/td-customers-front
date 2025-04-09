import './CustomerCard.css';
import trashIcon from '/images/trash.png';
import pencilIcon from '/images/pencil.png';
import plusIcon from '/images/plus.png';
// import loadingIcon from '/images/loadingIcon.svg';
import { ICustomer, ICustomerCardProps } from '../../types';
import formatCurrency from '../../utils/FormatCurrency';
import { removeCustomer, updateCustomer } from '../../services/api';
import { useState } from 'react';
import { Modal } from '../Modal';

export default function CustomerCard({
  customer,
  onDelete,
}: ICustomerCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ICustomer>(customer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'salary' || name === 'companyValue'
          ? parseFloat(value) || undefined
          : value,
    }));
  };

  const handleRemove = async () => {
    setLoading(true);
    setIsDeleting(true);

    try {
      await removeCustomer(customer.id);
      onDelete();
    } catch (err) {
      console.error('Erro ao excluir cliente', err);
    } finally {
      setLoading(false);
      setIsDeleting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.salary || !formData.companyValue) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    setLoading(true);
    setIsEditing(true);
    try {
      await updateCustomer(formData);
      onDelete();
    } catch (err) {
      console.error('Erro ao editar cliente', err);
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleSelect = async () => {
    setLoading(true);
    setIsSelecting(true);

    try {
      await updateCustomer({ ...customer, selected: true });
      onDelete();
    } catch (err) {
      console.error('Erro ao editar cliente', err);
    } finally {
      setLoading(false);
      setIsSelecting(false);
    }
  };

  return (
    <>
      <section className='cardCustomer'>
        <h3>{customer.name}</h3>
        <p>Salário: {formatCurrency(customer.salary)}</p>
        <p>Empresa: {formatCurrency(customer.companyValue)}</p>
        <div>
          <a onClick={() => setIsSelecting(true)}>
            <img src={plusIcon} alt='Selecionar' />
          </a>
          <a onClick={() => setIsEditing(true)}>
            <img src={pencilIcon} alt='Editar' />
          </a>
          <a onClick={() => setIsDeleting(true)}>
            <img src={trashIcon} alt='Excluir' />
          </a>
        </div>
      </section>

      <Modal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        title='Excluir cliente'
      >
        <div id='createButton'>
          <p>
            Você está prestes a excluir o cliente: <span>{customer.name}</span>
          </p>
          <button onClick={handleRemove}>
            {loading ? 'Excluir cliente' : 'Excluindo'}
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title='Editar cliente'
      >
        <form onSubmit={handleEdit} className='formCreateCustomer'>
          {error && <div className='error-message'>{error}</div>}

          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Digite o nome:'
            required
          />

          <input
            type='text'
            id='salary'
            name='salary'
            value={formData.salary}
            onChange={handleChange}
            placeholder='Digite o salário:'
            required
          />

          <input
            type='text'
            id='companyValue'
            name='companyValue'
            value={formData.companyValue}
            onChange={handleChange}
            placeholder='Digite o valor da empresa:'
            required
          />

          <button type='submit' disabled={loading}>
            {loading ? 'Editando' : 'Editar cliente'}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isSelecting}
        onClose={() => setIsSelecting(false)}
        title='Selecionar cliente'
      >
        <div id='createButton'>
          <p>
            Você está prestes a selecionar o cliente:{' '}
            <span>{customer.name}</span>
          </p>
          <button onClick={handleSelect}>
            {loading ? 'Selecionar cliente' : 'Selecionando'}
          </button>
        </div>
      </Modal>
    </>
  );
}
