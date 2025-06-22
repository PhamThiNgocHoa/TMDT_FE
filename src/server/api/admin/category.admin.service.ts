import { CategoryRequestDTO } from '../../../models/request/CategoryRequestDTO';
import { CategoryResponseDTO } from '../../../models/response/CategoryResponseDTO';
import ApiService from '../ApiService';

export const adminCategoryApi = {
  getAll: async (): Promise<CategoryResponseDTO[]> => {
    const res = await ApiService.get('/api/admin/category/list', {}, true);
    return res.data || res;
  },
  add: async (data: CategoryRequestDTO): Promise<CategoryResponseDTO> => {
    const res = await ApiService.post('/api/admin/category', data, {}, true);
    return res.data || res;
  },
  update: async (data: CategoryRequestDTO): Promise<CategoryResponseDTO> => {
    const res = await ApiService.put('/api/admin/category', data, {}, true);
    return res.data || res;
  },
  delete: async (id: number): Promise<void> => {
    await ApiService.delete(`/api/admin/category/${id}`, {}, true);
  },
  getById: async (id: number): Promise<CategoryResponseDTO> => {
    const res = await ApiService.get(`/api/admin/category/${id}`, {}, true);
    return res.data || res;
  }
}; 