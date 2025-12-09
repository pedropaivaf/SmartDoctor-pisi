// User and Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  crm: string;
  crm_state: string;
  role: string;
  clinic_id?: string;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  crm: string;
  crm_state: string;
  clinic_id?: string;
}

// Patient Types
export interface Patient {
  id: string;
  full_name: string;
  cpf: string;
  birth_date: string;
  gender?: 'M' | 'F' | 'Other';
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  insurance_provider?: string;
  insurance_number?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PatientFormData extends Omit<Patient, 'id' | 'created_at' | 'updated_at'> {}

// Mental Status Exam Types
export interface MentalStatusExam {
  appearance: string;
  behavior: string;
  speech: string;
  mood: string;
  mood_intensity?: number; // 1-10
  affect: string;
  thought_process: string;
  thought_content: string;
  thought_content_details?: {
    suicidal_ideation?: boolean;
    homicidal_ideation?: boolean;
    delusions?: boolean;
    obsessions?: boolean;
    details?: string;
  };
  perception: string;
  perception_details?: {
    auditory_hallucinations?: boolean;
    visual_hallucinations?: boolean;
    other_hallucinations?: boolean;
    details?: string;
  };
  cognition: {
    orientation: string;
    memory: string;
    attention: string;
  };
  insight: string;
  judgment: string;
}

// Scale Types
export interface PsychiatricScale {
  scale_name: string;
  score: number;
  interpretation: string;
  applied_date: string;
}

// Medical Record (Súmula) Types
export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  consultation_date: string;

  // Anamnese
  chief_complaint: string;
  history_present_illness?: string;
  past_psychiatric_history?: string;
  past_medical_history?: string;
  family_history?: string;
  social_history?: string;
  substance_use?: {
    alcohol?: { use: boolean; frequency?: string; quantity?: string };
    tobacco?: { use: boolean; frequency?: string; quantity?: string };
    other_drugs?: { use: boolean; substances?: string; frequency?: string };
  };

  // Exame do Estado Mental
  mental_status_exam: MentalStatusExam;

  // Diagnóstico
  icd10_codes: string[];
  diagnostic_impression: string;
  differential_diagnoses?: string;

  // Plano Terapêutico
  treatment_plan: string;
  pharmacological_treatment?: string;
  psychotherapy_plan?: string;
  psychotherapy_type?: string;
  psychotherapy_frequency?: string;
  follow_up_plan?: string;
  return_appointment?: string;
  exams_requested?: string;
  referrals?: string;

  // Escalas
  scales_applied?: PsychiatricScale[];

  // Status
  is_draft: boolean;

  created_at: string;
  updated_at: string;

  // Relations (for display)
  patient?: Patient;
  doctor?: User;
}

export interface MedicalRecordFormData extends Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at' | 'patient' | 'doctor'> {}

// Medication Types
export interface Medication {
  id: string;
  generic_name: string;
  brand_names: string[];
  therapeutic_class: string;
  subclass?: string;
  controlled_substance?: boolean;
  prescription_type: 'amarela' | 'azul' | 'branca'; // A1-A3, B1-B2, C1-C5
  prescription_type_details?: string; // ex: "A1", "B2", "C3"
  available_doses: string[];
  usual_dose_range?: string;
  maximum_dose?: string;
  indications: string[];
  common_side_effects: string[];
  major_side_effects: string[];
  contraindications: string[];
  pharmacokinetics?: {
    half_life?: string;
    metabolism?: string;
    excretion?: string;
  };
  special_populations?: {
    pregnancy?: string;
    lactation?: string;
    elderly?: string;
    children?: string;
  };
  drug_interactions?: DrugInteraction[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DrugInteraction {
  medication_id: string;
  medication_name: string;
  effect: string;
  severity: 'mild' | 'moderate' | 'severe';
  management?: string;
}

export interface MedicationSearchFilters {
  query?: string;
  therapeutic_class?: string;
  subclass?: string;
  prescription_type?: string;
  indication?: string;
}

// Prescription Types
export interface PrescriptionItem {
  id: string;
  prescription_id?: string;
  medication_id: string;
  medication_name: string;
  generic_name?: string;
  brand_name?: string;
  dosage: string;
  frequency: string;
  duration?: string;
  quantity?: string;
  instructions?: string;
  order_index?: number;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  prescription_date: string;
  prescription_type: 'amarela' | 'azul' | 'branca';
  valid_until: string;
  is_active: boolean;
  notes?: string;
  items: PrescriptionItem[];
  created_at: string;
  updated_at: string;

  // Relations
  patient?: Patient;
  doctor?: User;
}

export interface PrescriptionFormData {
  patient_id: string;
  prescription_type: 'amarela' | 'azul' | 'branca';
  valid_until: string;
  notes?: string;
  items: Omit<PrescriptionItem, 'id' | 'prescription_id'>[];
}

// Clinic Types (for multi-tenant)
export interface Clinic {
  id: string;
  name: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  created_at?: string;
}

// ICD-10 Types
export interface ICD10Code {
  code: string;
  description: string;
  category?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// Dashboard Types
export interface DashboardStats {
  total_patients: number;
  appointments_today: number;
  pending_sumulas: number;
  active_prescriptions: number;
}

export interface UpcomingAppointment {
  id: string;
  patient_id: string;
  patient_name: string;
  date: string;
  time: string;
  type: string;
}

// Form Types
export type FormMode = 'create' | 'edit' | 'view';

// Toast/Notification Types
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  variant: ToastVariant;
  title: string;
  description?: string;
}
