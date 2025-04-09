import './CustomerCard.css';
import trashIcon from '/images/trash.png';
import pencilIcon from '/images/pencil.png';
import plusIcon from '/images/plus.png';
// import loadingIcon from '/images/loadingIcon.svg';
import { ICustomerCardProps } from '../../types';
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
  const [loading, setLoading] = useState(true);

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

  const handleEdit = async () => {
    setLoading(true);
    setIsEditing(true);

    try {
      await updateCustomer(customer);
      onDelete();
    } catch (err) {
      console.error('Erro ao editar cliente', err);
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
        <div id='createButton'>
          <p>
            Você está prestes a excluir o cliente: <span>{customer.name}</span>
          </p>
          <button onClick={handleEdit}>
            {loading ? 'Editar cliente' : 'Editando'}
          </button>
        </div>
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
