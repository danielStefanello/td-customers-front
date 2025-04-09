import './CustomerCard.css';
import trashIcon from '/images/trash.png';
import pencilIcon from '/images/pencil.png';
import plusIcon from '/images/plus.png';
import loadingIcon from '/images/loadingIcon.svg';
import { ICustomerCardProps } from '../../types';
import formatCurrency from '../../utils/FormatCurrency';
import { removeCustomer } from '../../services/api';
import { useState } from 'react';

export default function CustomerCard({
  customer,
  onDelete,
}: ICustomerCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    setIsDeleting(true);

    if (!window.confirm(`Deseja realmente excluir ${customer.name}?`)) {
      setIsDeleting(false);
      return;
    }

    try {
      await removeCustomer(customer.id);
      onDelete();
    } catch (err) {
      console.error('Erro ao excluir cliente', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className='cardCustomer'>
      <h3>{customer.name}</h3>
      <p>Salário: {formatCurrency(customer.salary)}</p>
      <p>Empresa: {formatCurrency(customer.companyValue)}</p>
      <div>
        <a>
          <img src={plusIcon} alt='Selecionar' />
        </a>
        <a>
          <img src={pencilIcon} alt='Editar' />
        </a>
        <a onClick={handleRemove}>
          <img src={isDeleting ? loadingIcon : trashIcon} alt='Excluir' />
        </a>
      </div>
    </section>
  );
}
