import { z } from 'zod';
import { isValidCPF } from './utils';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  crm: z.string().min(4, 'CRM inválido'),
  crm_state: z.string().length(2, 'UF deve ter 2 caracteres'),
  clinic_id: z.string().uuid().optional(),
});

// Patient Schemas
export const patientSchema = z.object({
  full_name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (formato: 000.000.000-00)')
    .refine((cpf) => isValidCPF(cpf), 'CPF inválido'),
  birth_date: z.string().refine((date) => {
    const d = new Date(date);
    return d <= new Date();
  }, 'Data de nascimento não pode ser futura'),
  gender: z.enum(['M', 'F', 'Other']).optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().max(2).optional(),
  zip_code: z.string().optional(),
  insurance_provider: z.string().optional(),
  insurance_number: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
});

// Mental Status Exam Schema
export const mentalStatusExamSchema = z.object({
  appearance: z.string().min(1, 'Campo obrigatório'),
  behavior: z.string().min(1, 'Campo obrigatório'),
  speech: z.string().min(1, 'Campo obrigatório'),
  mood: z.string().min(1, 'Campo obrigatório'),
  mood_intensity: z.number().min(1).max(10).optional(),
  affect: z.string().min(1, 'Campo obrigatório'),
  thought_process: z.string().min(1, 'Campo obrigatório'),
  thought_content: z.string().min(1, 'Campo obrigatório'),
  thought_content_details: z
    .object({
      suicidal_ideation: z.boolean().optional(),
      homicidal_ideation: z.boolean().optional(),
      delusions: z.boolean().optional(),
      obsessions: z.boolean().optional(),
      details: z.string().optional(),
    })
    .optional(),
  perception: z.string().min(1, 'Campo obrigatório'),
  perception_details: z
    .object({
      auditory_hallucinations: z.boolean().optional(),
      visual_hallucinations: z.boolean().optional(),
      other_hallucinations: z.boolean().optional(),
      details: z.string().optional(),
    })
    .optional(),
  cognition: z.object({
    orientation: z.string().min(1, 'Campo obrigatório'),
    memory: z.string().min(1, 'Campo obrigatório'),
    attention: z.string().min(1, 'Campo obrigatório'),
  }),
  insight: z.string().min(1, 'Campo obrigatório'),
  judgment: z.string().min(1, 'Campo obrigatório'),
});

// Medical Record (Súmula) Schema
export const medicalRecordSchema = z.object({
  patient_id: z.string().uuid('ID do paciente inválido'),
  doctor_id: z.string().uuid('ID do médico inválido'),
  consultation_date: z.string(),

  // Anamnese
  chief_complaint: z.string().min(10, 'Descreva a queixa principal (mínimo 10 caracteres)'),
  history_present_illness: z.string().optional(),
  past_psychiatric_history: z.string().optional(),
  past_medical_history: z.string().optional(),
  family_history: z.string().optional(),
  social_history: z.string().optional(),
  substance_use: z
    .object({
      alcohol: z
        .object({
          use: z.boolean(),
          frequency: z.string().optional(),
          quantity: z.string().optional(),
        })
        .optional(),
      tobacco: z
        .object({
          use: z.boolean(),
          frequency: z.string().optional(),
          quantity: z.string().optional(),
        })
        .optional(),
      other_drugs: z
        .object({
          use: z.boolean(),
          substances: z.string().optional(),
          frequency: z.string().optional(),
        })
        .optional(),
    })
    .optional(),

  // Exame do Estado Mental
  mental_status_exam: mentalStatusExamSchema,

  // Diagnóstico
  icd10_codes: z.array(z.string()).min(1, 'Adicione ao menos um CID-10'),
  diagnostic_impression: z.string().min(10, 'Descreva a impressão diagnóstica (mínimo 10 caracteres)'),
  differential_diagnoses: z.string().optional(),

  // Plano Terapêutico
  treatment_plan: z.string().min(10, 'Descreva o plano de tratamento (mínimo 10 caracteres)'),
  pharmacological_treatment: z.string().optional(),
  psychotherapy_plan: z.string().optional(),
  psychotherapy_type: z.string().optional(),
  psychotherapy_frequency: z.string().optional(),
  follow_up_plan: z.string().optional(),
  return_appointment: z.string().optional(),
  exams_requested: z.string().optional(),
  referrals: z.string().optional(),

  // Escalas
  scales_applied: z
    .array(
      z.object({
        scale_name: z.string(),
        score: z.number(),
        interpretation: z.string(),
        applied_date: z.string(),
      })
    )
    .optional(),

  // Status
  is_draft: z.boolean(),
});

// Partial schema for drafts (less strict)
export const medicalRecordDraftSchema = medicalRecordSchema.partial({
  chief_complaint: true,
  mental_status_exam: true,
  icd10_codes: true,
  diagnostic_impression: true,
  treatment_plan: true,
});

// Prescription Item Schema
export const prescriptionItemSchema = z.object({
  medication_id: z.string().uuid('ID do medicamento inválido'),
  medication_name: z.string().min(1, 'Nome do medicamento obrigatório'),
  generic_name: z.string().optional(),
  brand_name: z.string().optional(),
  dosage: z.string().min(1, 'Dose obrigatória'),
  frequency: z.string().min(1, 'Frequência obrigatória'),
  duration: z.string().optional(),
  quantity: z.string().optional(),
  instructions: z.string().optional(),
  order_index: z.number().optional(),
});

// Prescription Schema
export const prescriptionSchema = z.object({
  patient_id: z.string().uuid('ID do paciente inválido'),
  prescription_type: z.enum(['amarela', 'azul', 'branca'], {
    message: 'Tipo de receita inválido',
  }),
  valid_until: z.string(),
  notes: z.string().optional(),
  items: z.array(prescriptionItemSchema).min(1, 'Adicione ao menos um medicamento'),
});

// Search/Filter Schemas
export const patientSearchSchema = z.object({
  search: z.string().optional(),
  insurance_provider: z.string().optional(),
  page: z.number().optional(),
  per_page: z.number().optional(),
});

export const medicationSearchSchema = z.object({
  query: z.string().optional(),
  therapeutic_class: z.string().optional(),
  subclass: z.string().optional(),
  prescription_type: z.string().optional(),
  indication: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type PatientFormData = z.infer<typeof patientSchema>;
export type MedicalRecordFormData = z.infer<typeof medicalRecordSchema>;
export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;
export type PrescriptionItemFormData = z.infer<typeof prescriptionItemSchema>;
