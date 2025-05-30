import './Customer.css';
import NavBar from '../../components/NavBar';
import CustomerCard from '../../components/CustomerCard';
import { useCallback, useEffect, useState } from 'react';
import {
  createCustomer,
  listCustomers,
  updateCustomer,
} from '../../services/api';
import {
  ICustomer,
  IListCustomerFilters,
  IListCustomerResponse,
} from '../../types';
import { Modal } from '../../components/Modal';
import Pagination from '../../components/Pagination';

export default function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<IListCustomerResponse>({
    count: 0,
    data: [],
    limit: 0,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ICustomer, 'id'>>({
    name: '',
    salary: 0,
    companyValue: 0,
    selected: false,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(16);
  const [selected, setSelected] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isSelectedView, setIsSelectedView] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formattedValue = value.replace(',', '.');

    setFormData((prev) => ({
      ...prev,
      [name]: ['salary', 'companyValue'].includes(name)
        ? parseFloat(formattedValue) || 0
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.salary || !formData.companyValue) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    setLoading(true);
    try {
      await createCustomer(formData);
      loadData();
      setFormData({
        name: '',
        salary: 0,
        companyValue: 0,
        selected: false,
      });
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleUpdateGroup = async (customers: ICustomer[]) => {
    try {
      setLoading(true);
      await Promise.all(
        customers.map(
          async (c) => await updateCustomer({ ...c, selected: false })
        )
      );

      loadData();
    } catch (err) {
      console.error(
        err instanceof Error
          ? err.message
          : `Erro ao remover ${customers.length}`
      );
    } finally {
      setLoading(false);
    }
  };

  const loadData = useCallback(
    async (filters?: IListCustomerFilters) => {
      try {
        setLoading(true);
        const data = await listCustomers({
          limit: filters?.limit || limit,
          page: filters?.page || page,
          selected: filters?.selected || selected,
        });

        setCustomers(data);
        setTotalPages(Math.ceil(data.count / data.limit));

        if (data.data.length === 0) {
          console.info('Nenhum cliente encontrado com esses filtros');
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro desconhecido';
        console.error(`Erro ao carregar: ${message}`);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [limit, page, selected]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (error) {
      console.error(`Erro: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && customers.data.length === 0) {
      console.info('Nenhum cliente encontrado');
    }
  }, [customers.data.length, loading]);

  if (loading) return <div className='loading'>Carregando...</div>;

  return (
    <div className='customer'>
      <NavBar
        onSelectedChange={(selected) => {
          setSelected(selected);
          setIsSelectedView(selected);
          setPage(1);
        }}
        currentSelected={selected}
      />
      <div className='customerContent'>
        <div>
          <p>{customers.count} clientes encontrados.</p>
          <p className='countCustomerLeft'>
            Clientes por página: {customers.limit}
          </p>
        </div>
        <div>
          {customers.count ? (
            customers.data.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onDelete={loadData}
              />
            ))
          ) : (
            <h3>Nenhum cliente encontrado</h3>
          )}
        </div>

        {isSelectedView ? (
          <button
            className='addCustomer'
            onClick={() => handleUpdateGroup(customers.data)}
            disabled={loading || customers.count === 0}
          >
            {loading ? 'Atualizando...' : 'Limpar clientes selecionados'}
          </button>
        ) : (
          <button
            className='addCustomer'
            onClick={() => setIsModalOpen(true)}
            disabled={loading}
          >
            Criar cliente
          </button>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          disabled={loading}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Criar cliente'
      >
        <form onSubmit={handleSubmit} className='formCreateCustomer'>
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
            type='number'
            step='any'
            id='salary'
            name='salary'
            value={formData.salary}
            onChange={handleChange}
            placeholder='Digite o salário:'
            required
          />

          <input
            type='number'
            step='any'
            id='companyValue'
            name='companyValue'
            value={formData.companyValue}
            onChange={handleChange}
            placeholder='Digite o valor da empresa:'
            required
          />

          <button type='submit' disabled={loading}>
            {loading ? 'Cadastrando' : 'Criar cliente'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
