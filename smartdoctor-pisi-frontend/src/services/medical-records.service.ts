import api from './api';
import type { MedicalRecord, MedicalRecordFormData } from '../types';

export const medicalRecordsService = {
  async getByPatient(patientId: string): Promise<MedicalRecord[]> {
    const response = await api.get<MedicalRecord[]>(`/patients/${patientId}/medical-records`);
    return response.data;
  },

  async getById(patientId: string, recordId: string): Promise<MedicalRecord> {
    const response = await api.get<MedicalRecord>(`/patients/${patientId}/medical-records/${recordId}`);
    return response.data;
  },

  async create(patientId: string, data: MedicalRecordFormData): Promise<MedicalRecord> {
    const response = await api.post<MedicalRecord>(`/patients/${patientId}/medical-records`, data);
    return response.data;
  },

  async update(patientId: string, recordId: string, data: Partial<MedicalRecordFormData>): Promise<MedicalRecord> {
    const response = await api.put<MedicalRecord>(`/patients/${patientId}/medical-records/${recordId}`, data);
    return response.data;
  },

  async delete(patientId: string, recordId: string): Promise<void> {
    await api.delete(`/patients/${patientId}/medical-records/${recordId}`);
  },

  async saveDraft(patientId: string, recordId: string | null, data: Partial<MedicalRecordFormData>): Promise<MedicalRecord> {
    if (recordId) {
      return this.update(patientId, recordId, { ...data, is_draft: true });
    } else {
      return this.create(patientId, { ...data, is_draft: true } as MedicalRecordFormData);
    }
  },

  async finalize(patientId: string, recordId: string, data: MedicalRecordFormData): Promise<MedicalRecord> {
    return this.update(patientId, recordId, { ...data, is_draft: false });
  },
};

export default medicalRecordsService;
