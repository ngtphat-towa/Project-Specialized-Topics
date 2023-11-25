import { api } from "../api";

export const createAccount = async (accountData) => {
  return await api.post('/account', accountData);
};

export const updateAccount = async (id, accountData) => {
  return await api.put(`/account/${id}`, accountData);
};
