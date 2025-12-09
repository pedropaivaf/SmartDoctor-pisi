import api from './api';
import type { Patient, PatientFormData, PaginatedResponse } from '../types';

export const patientsService = {
  async getAll(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    insurance_provider?: string;
  }): Promise<PaginatedResponse<Patient> | Patient[]> {
    const response = await api.get<PaginatedResponse<Patient> | Patient[]>('/patients', { params });
    return response.data;
  },

  async getById(id: string): Promise<Patient> {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  async create(data: PatientFormData): Promise<Patient> {
    const response = await api.post<Patient>('/patients', data);
    return response.data;
  },

  async update(id: string, data: Partial<PatientFormData>): Promise<Patient> {
    const response = await api.put<Patient>(`/patients/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/patients/${id}`);
  },

  async search(query: string): Promise<Patient[]> {
    const response = await api.get<PaginatedResponse<Patient> | Patient[]>('/patients', {
      params: { search: query },
    });
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return (response.data as PaginatedResponse<Patient>).data || [];
  },
};

export default patientsService;
