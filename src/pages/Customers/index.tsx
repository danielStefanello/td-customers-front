import './Customer.css';
import NavBar from '../../components/NavBar';
import CustomerCard from '../../components/CustomerCard';
import { useEffect, useState } from 'react';
import { listCustomers } from '../../services/api';
import { ICustomer } from '../../types';

export default function Customers() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await listCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerDeleted = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className='loading'>Carregando...</div>;
  if (error) return <div className='error'>Erro: {error}</div>;
  if (customers.length === 0) return <div>Nenhum cliente encontrado</div>;

  return (
    <div className='customer'>
      <NavBar />
      <div className='customerContent'>
        <div>
          <p>{customers.length} clientes encontrados.</p>
          <p className='countCustomerLeft'>Clientes por página: 16</p>
        </div>
        <div>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onDelete={handleCustomerDeleted}
            />
          ))}
        </div>
        <button className='addCustomer'>Criar cliente</button>
      </div>
    </div>
  );
}
