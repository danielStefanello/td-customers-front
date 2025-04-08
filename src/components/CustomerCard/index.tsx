import './CustomerCard.css';
import trashIcon from '/images/trash.png';
import pencilIcon from '/images/pencil.png';
import plusIcon from '/images/plus.png';

export default function CustomerCard() {
  return (
    <section className='cardCustomer'>
      <h3>Eduardo</h3>
      <p>Salário: R$ 3.500,00</p>
      <p>Empresa: R$ 135.000,00</p>
      <div>
        <a>
          <img src={plusIcon} alt='Selecionar' />
        </a>
        <a>
          <img src={pencilIcon} alt='Editar' />
        </a>
        <a>
          <img src={trashIcon} alt='Excluir' />
        </a>
      </div>
    </section>
  );
}
