import api from './api';
import type { Prescription, PrescriptionFormData } from '../types';

export const prescriptionsService = {
  async getAll(params?: {
    patient_id?: string;
    is_active?: boolean;
    prescription_type?: string;
    page?: number;
    per_page?: number;
  }): Promise<Prescription[]> {
    const response = await api.get<Prescription[]>('/prescriptions', { params });
    return response.data;
  },

  async getById(id: string): Promise<Prescription> {
    const response = await api.get<Prescription>(`/prescriptions/${id}`);
    return response.data;
  },

  async create(data: PrescriptionFormData): Promise<Prescription> {
    const response = await api.post<Prescription>('/prescriptions', data);
    return response.data;
  },

  async update(id: string, data: Partial<PrescriptionFormData>): Promise<Prescription> {
    const response = await api.put<Prescription>(`/prescriptions/${id}`, data);
    return response.data;
  },

  async deactivate(id: string): Promise<Prescription> {
    const response = await api.put<Prescription>(`/prescriptions/${id}/deactivate`);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/prescriptions/${id}`);
  },

  async getByPatient(patientId: string): Promise<Prescription[]> {
    return this.getAll({ patient_id: patientId });
  },

  async getActivePrescriptions(patientId?: string): Promise<Prescription[]> {
    return this.getAll({ patient_id: patientId, is_active: true });
  },
};

export default prescriptionsService;
