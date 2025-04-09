import { ICustomer } from '../types';

export const listCustomers = async (): Promise<ICustomer[]> => {
  try {
    const response = await fetch('http://localhost:3000/customers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Falha ao buscar clientes:', error);
    throw error;
  }
};

export const removeCustomer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error(`Falha ao remover o cliente ${id}:`, error);
    throw error;
  }
};

export const updateCustomer = async (customer: ICustomer): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:3000/customers/${customer.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error(`Falha ao atualizar o cliente ${customer.id}:`, error);
    throw error;
  }
};
