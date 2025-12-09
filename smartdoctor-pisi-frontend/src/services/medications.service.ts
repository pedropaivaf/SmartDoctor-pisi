import api from './api';
import type { Medication, MedicationSearchFilters, DrugInteraction } from '../types';

export const medicationsService = {
  async search(filters: MedicationSearchFilters): Promise<Medication[]> {
    const params = new URLSearchParams();

    if (filters.query) params.append('q', filters.query);
    if (filters.therapeutic_class) params.append('class', filters.therapeutic_class);
    if (filters.subclass) params.append('subclass', filters.subclass);
    if (filters.prescription_type) params.append('prescription_type', filters.prescription_type);
    if (filters.indication) params.append('indication', filters.indication);

    const response = await api.get<Medication[]>(`/medications/search?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Medication> {
    const response = await api.get<Medication>(`/medications/${id}`);
    return response.data;
  },

  async getClasses(): Promise<Record<string, string[]>> {
    const response = await api.get<Record<string, string[]>>('/medications/classes');
    return response.data;
  },

  async checkInteractions(medicationIds: string[]): Promise<DrugInteraction[]> {
    const params = medicationIds.map((id) => `drugs[]=${id}`).join('&');
    const response = await api.get<DrugInteraction[]>(`/medications/interactions/check?${params}`);
    return response.data;
  },

  async getAll(params?: {
    page?: number;
    per_page?: number;
    therapeutic_class?: string;
  }): Promise<Medication[]> {
    const response = await api.get<Medication[]>('/medications', { params });
    return response.data;
  },
};

export default medicationsService;
