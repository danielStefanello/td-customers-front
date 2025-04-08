import './Customer.css';
import NavBar from '../../components/NavBar';
import CustomerCard from '../../components/CustomerCard';

export default function Customers() {
  return (
    <div className='customer'>
      <NavBar />
      <div className='customerContent'>
        <div>
          <p>16 clientes encontrados.</p>
          <p>Clientes por página: 16</p>
        </div>
        <div>
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
        </div>
        <button className='addCustomer'>Criar cliente</button>
      </div>
    </div>
  );
}
