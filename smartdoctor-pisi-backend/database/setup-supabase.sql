-- =====================================================
-- PSIMED - SETUP COMPLETO DO BANCO DE DADOS SUPABASE
-- =====================================================
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. TABELA: CLINICS
-- =====================================================
CREATE TABLE IF NOT EXISTS clinics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. TABELA: USERS
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    crm VARCHAR(20) NOT NULL,
    crm_state VARCHAR(2) NOT NULL,
    specialty VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'doctor',
    is_active BOOLEAN DEFAULT TRUE,
    clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_clinic ON users(clinic_id);

-- =====================================================
-- 3. TABELA: PATIENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    birth_date DATE NOT NULL,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    emergency_contact VARCHAR(255),
    emergency_phone VARCHAR(20),
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(50),
    clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
    responsible_doctor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para patients
CREATE INDEX IF NOT EXISTS idx_patients_cpf ON patients(cpf);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(full_name);
CREATE INDEX IF NOT EXISTS idx_patients_clinic ON patients(clinic_id);
CREATE INDEX IF NOT EXISTS idx_patients_doctor ON patients(responsible_doctor_id);

-- =====================================================
-- 4. TABELA: MEDICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    generic_name VARCHAR(255) NOT NULL,
    brand_names TEXT[] DEFAULT '{}',
    therapeutic_class VARCHAR(100) NOT NULL,
    subclass VARCHAR(100),
    controlled_substance VARCHAR(50),
    prescription_type VARCHAR(20),
    available_doses TEXT[] DEFAULT '{}',
    usual_dose_range VARCHAR(100),
    max_daily_dose VARCHAR(100),
    indications TEXT[] DEFAULT '{}',
    contraindications TEXT[] DEFAULT '{}',
    common_side_effects TEXT[] DEFAULT '{}',
    serious_side_effects TEXT[] DEFAULT '{}',
    major_interactions JSONB,
    half_life VARCHAR(100),
    pregnancy_category VARCHAR(10),
    breastfeeding_safe BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para medications
CREATE INDEX IF NOT EXISTS idx_medications_generic ON medications(generic_name);
CREATE INDEX IF NOT EXISTS idx_medications_class ON medications(therapeutic_class);

-- =====================================================
-- 5. TABELA: MEDICAL_RECORDS (Súmulas)
-- =====================================================
CREATE TABLE IF NOT EXISTS medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    consultation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Anamnese
    chief_complaint TEXT,
    history_present_illness TEXT,
    past_psychiatric_history TEXT,
    past_medical_history TEXT,
    family_history TEXT,
    social_history TEXT,
    substance_use TEXT,

    -- Exame Mental
    mental_status_exam JSONB,

    -- Diagnóstico
    icd10_codes TEXT[] DEFAULT '{}',
    diagnostic_impression TEXT,

    -- Plano Terapêutico
    treatment_plan TEXT,
    psychotherapy_plan TEXT,
    follow_up_plan TEXT,

    -- Escalas
    scales_applied JSONB,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para medical_records
CREATE INDEX IF NOT EXISTS idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_doctor ON medical_records(doctor_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_date ON medical_records(consultation_date);

-- =====================================================
-- 6. TABELA: PRESCRIPTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    prescription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prescription_type VARCHAR(20) NOT NULL,
    valid_until DATE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para prescriptions
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_active ON prescriptions(is_active);

-- =====================================================
-- 7. TABELA: PRESCRIPTION_ITEMS
-- =====================================================
CREATE TABLE IF NOT EXISTS prescription_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
    medication_id UUID NOT NULL REFERENCES medications(id) ON DELETE RESTRICT,
    medication_name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    brand_name VARCHAR(255),
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration VARCHAR(100),
    quantity VARCHAR(50),
    instructions TEXT,
    order_index INTEGER DEFAULT 0
);

-- Índices para prescription_items
CREATE INDEX IF NOT EXISTS idx_prescription_items_prescription ON prescription_items(prescription_id);
CREATE INDEX IF NOT EXISTS idx_prescription_items_medication ON prescription_items(medication_id);

-- =====================================================
-- 8. TABELA: AUDIT_LOGS
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- =====================================================
-- 9. TRIGGERS PARA UPDATED_AT
-- =====================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para patients
DROP TRIGGER IF EXISTS update_patients_updated_at ON patients;
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para medical_records
DROP TRIGGER IF EXISTS update_medical_records_updated_at ON medical_records;
CREATE TRIGGER update_medical_records_updated_at
    BEFORE UPDATE ON medical_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para prescriptions
DROP TRIGGER IF EXISTS update_prescriptions_updated_at ON prescriptions;
CREATE TRIGGER update_prescriptions_updated_at
    BEFORE UPDATE ON prescriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SETUP COMPLETO!
-- =====================================================
-- Próximo passo: Execute o arquivo insert-superadmin.sql
-- =====================================================
