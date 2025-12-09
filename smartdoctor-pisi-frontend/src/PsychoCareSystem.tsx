import React, { useState, useMemo } from 'react';
import {
  Search,
  Users,
  Pill,
  AlertTriangle,
  Activity,
  ChevronRight,
  Save,
  X,
  Eye,
  EyeOff,
} from 'lucide-react';

// ==================== INTERFACES ====================

interface Patient {
  id: string;
  full_name: string;
  cpf: string;
  birth_date: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  email: string;
  diagnosis: string;
  allergies: string[]; // Array de alergias (nomes de substâncias/classes)
  status: 'active' | 'inactive';
}

interface Medication {
  id: string;
  generic_name: string;
  brand_names: string[];
  activeIngredient: string; // Princípio ativo
  class: string; // Classe terapêutica
  therapeutic_class: string;
  subclass: string;
  available_doses: string[];
  indications: string[];
  contraindications: string[];
  side_effects: string[];
  prescription_type: 'amarela' | 'azul' | 'branca';
}

interface ExamItem {
  value: string;
  notes: string;
}

interface MentalExam {
  appearance: ExamItem;
  consciousness: ExamItem;
  mood: ExamItem;
  thought: ExamItem;
  perception: ExamItem;
}

// ==================== MOCK DATA ====================

const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    full_name: 'Maria Eduarda Silva',
    cpf: '123.456.789-00',
    birth_date: '1985-03-15',
    age: 39,
    gender: 'F',
    phone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
    diagnosis: 'Transtorno Depressivo Maior (F32.1)',
    allergies: ['Fluoxetina', 'ISRS'], // Alergia a Fluoxetina e toda classe ISRS
    status: 'active',
  },
  {
    id: '2',
    full_name: 'João Carlos Mendes',
    cpf: '987.654.321-00',
    birth_date: '1978-07-22',
    age: 46,
    gender: 'M',
    phone: '(11) 91234-5678',
    email: 'joao.mendes@email.com',
    diagnosis: 'Transtorno de Ansiedade Generalizada (F41.1)',
    allergies: ['Sulfa', 'Carbamazepina'],
    status: 'active',
  },
  {
    id: '3',
    full_name: 'Ana Paula Costa',
    cpf: '456.789.123-00',
    birth_date: '1992-11-10',
    age: 32,
    gender: 'F',
    phone: '(21) 99876-5432',
    email: 'ana.costa@email.com',
    diagnosis: 'Transtorno Bipolar Tipo I (F31.0)',
    allergies: [],
    status: 'active',
  },
  {
    id: '4',
    full_name: 'Roberto Alves Santos',
    cpf: '321.654.987-00',
    birth_date: '1990-05-30',
    age: 34,
    gender: 'M',
    phone: '(31) 98234-5678',
    email: 'roberto.santos@email.com',
    diagnosis: 'Esquizofrenia Paranoide (F20.0)',
    allergies: ['Haloperidol', 'Antipsicóticos Típicos'],
    status: 'active',
  },
];

const MOCK_MEDICATIONS: Medication[] = [
  {
    id: '1',
    generic_name: 'Fluoxetina',
    brand_names: ['Prozac', 'Daforin', 'Fluxene'],
    activeIngredient: 'Fluoxetina',
    class: 'ISRS',
    therapeutic_class: 'Antidepressivo',
    subclass: 'Inibidor Seletivo da Recaptação de Serotonina',
    available_doses: ['20mg', '40mg'],
    indications: ['Depressão Maior', 'TOC', 'Bulimia Nervosa'],
    contraindications: ['Uso concomitante com IMAOs', 'Hipersensibilidade'],
    side_effects: ['Náusea', 'Insônia', 'Cefaleia', 'Disfunção sexual'],
    prescription_type: 'branca',
  },
  {
    id: '2',
    generic_name: 'Sertralina',
    brand_names: ['Zoloft', 'Assert', 'Tolrest'],
    activeIngredient: 'Sertralina',
    class: 'ISRS',
    therapeutic_class: 'Antidepressivo',
    subclass: 'Inibidor Seletivo da Recaptação de Serotonina',
    available_doses: ['25mg', '50mg', '100mg'],
    indications: ['Depressão', 'TAG', 'TOC', 'TEPT'],
    contraindications: ['Uso concomitante com IMAOs'],
    side_effects: ['Náusea', 'Diarreia', 'Insônia', 'Fadiga'],
    prescription_type: 'branca',
  },
  {
    id: '3',
    generic_name: 'Escitalopram',
    brand_names: ['Lexapro', 'Exodus'],
    activeIngredient: 'Escitalopram',
    class: 'ISRS',
    therapeutic_class: 'Antidepressivo',
    subclass: 'Inibidor Seletivo da Recaptação de Serotonina',
    available_doses: ['10mg', '15mg', '20mg'],
    indications: ['Depressão Maior', 'TAG', 'Fobia Social'],
    contraindications: ['Uso com IMAOs', 'Hipersensibilidade'],
    side_effects: ['Náusea', 'Sonolência', 'Sudorese'],
    prescription_type: 'branca',
  },
  {
    id: '4',
    generic_name: 'Venlafaxina',
    brand_names: ['Efexor XR', 'Venlift'],
    activeIngredient: 'Venlafaxina',
    class: 'IRSN',
    therapeutic_class: 'Antidepressivo',
    subclass: 'Inibidor da Recaptação de Serotonina e Noradrenalina',
    available_doses: ['75mg', '150mg', '225mg'],
    indications: ['Depressão Maior', 'TAG', 'Fobia Social'],
    contraindications: ['Uso com IMAOs', 'Hipertensão não controlada'],
    side_effects: ['Náusea', 'Tontura', 'Insônia', 'Hipertensão'],
    prescription_type: 'branca',
  },
  {
    id: '5',
    generic_name: 'Clonazepam',
    brand_names: ['Rivotril'],
    activeIngredient: 'Clonazepam',
    class: 'Benzodiazepínico',
    therapeutic_class: 'Ansiolítico',
    subclass: 'Benzodiazepínico de alta potência',
    available_doses: ['0.5mg', '1mg', '2mg'],
    indications: ['Transtornos de Ansiedade', 'Síndrome do Pânico', 'Epilepsia'],
    contraindications: ['Glaucoma de ângulo fechado', 'Miastenia gravis'],
    side_effects: ['Sonolência', 'Tontura', 'Descoordenação motora'],
    prescription_type: 'azul',
  },
  {
    id: '6',
    generic_name: 'Alprazolam',
    brand_names: ['Frontal', 'Apraz'],
    activeIngredient: 'Alprazolam',
    class: 'Benzodiazepínico',
    therapeutic_class: 'Ansiolítico',
    subclass: 'Benzodiazepínico de ação intermediária',
    available_doses: ['0.25mg', '0.5mg', '1mg', '2mg'],
    indications: ['TAG', 'Síndrome do Pânico'],
    contraindications: ['Glaucoma', 'Depressão respiratória'],
    side_effects: ['Sedação', 'Amnésia anterógrada', 'Dependência'],
    prescription_type: 'azul',
  },
  {
    id: '7',
    generic_name: 'Quetiapina',
    brand_names: ['Seroquel', 'Ketipinor'],
    activeIngredient: 'Quetiapina',
    class: 'Antipsicótico Atípico',
    therapeutic_class: 'Antipsicótico',
    subclass: 'Antipsicótico de Segunda Geração',
    available_doses: ['25mg', '100mg', '200mg', '300mg'],
    indications: ['Esquizofrenia', 'Transtorno Bipolar', 'Depressão Maior'],
    contraindications: ['Hipersensibilidade'],
    side_effects: ['Sedação', 'Ganho de peso', 'Disglicemia'],
    prescription_type: 'branca',
  },
  {
    id: '8',
    generic_name: 'Risperidona',
    brand_names: ['Risperdal', 'Zargus'],
    activeIngredient: 'Risperidona',
    class: 'Antipsicótico Atípico',
    therapeutic_class: 'Antipsicótico',
    subclass: 'Antipsicótico de Segunda Geração',
    available_doses: ['1mg', '2mg', '3mg'],
    indications: ['Esquizofrenia', 'Transtorno Bipolar', 'Agitação'],
    contraindications: ['Hipersensibilidade'],
    side_effects: ['Hiperprolactinemia', 'Ganho de peso', 'SEP'],
    prescription_type: 'branca',
  },
  {
    id: '9',
    generic_name: 'Haloperidol',
    brand_names: ['Haldol'],
    activeIngredient: 'Haloperidol',
    class: 'Antipsicóticos Típicos',
    therapeutic_class: 'Antipsicótico',
    subclass: 'Antipsicótico de Primeira Geração',
    available_doses: ['1mg', '5mg'],
    indications: ['Esquizofrenia', 'Agitação psicomotora', 'Delírio'],
    contraindications: ['Doença de Parkinson', 'Depressão do SNC'],
    side_effects: ['Sintomas extrapiramidais', 'Discinesia tardia', 'Sedação'],
    prescription_type: 'branca',
  },
  {
    id: '10',
    generic_name: 'Lítio',
    brand_names: ['Carbolitium'],
    activeIngredient: 'Carbonato de Lítio',
    class: 'Estabilizador de Humor',
    therapeutic_class: 'Estabilizador de Humor',
    subclass: 'Sal de Lítio',
    available_doses: ['300mg', '450mg'],
    indications: ['Transtorno Bipolar', 'Episódio Maníaco', 'Depressão Bipolar'],
    contraindications: ['Insuficiência renal', 'Gravidez'],
    side_effects: ['Tremor', 'Poliúria', 'Ganho de peso', 'Hipotireoidismo'],
    prescription_type: 'branca',
  },
  {
    id: '11',
    generic_name: 'Carbamazepina',
    brand_names: ['Tegretol'],
    activeIngredient: 'Carbamazepina',
    class: 'Anticonvulsivante',
    therapeutic_class: 'Estabilizador de Humor',
    subclass: 'Anticonvulsivante',
    available_doses: ['200mg', '400mg'],
    indications: ['Transtorno Bipolar', 'Epilepsia', 'Neuralgia do trigêmeo'],
    contraindications: ['Bloqueio AV', 'Porfiria'],
    side_effects: ['Tontura', 'Ataxia', 'Diplopia', 'Leucopenia'],
    prescription_type: 'branca',
  },
  {
    id: '12',
    generic_name: 'Metilfenidato',
    brand_names: ['Ritalina', 'Concerta'],
    activeIngredient: 'Metilfenidato',
    class: 'Estimulante do SNC',
    therapeutic_class: 'Psicoestimulante',
    subclass: 'Estimulante dopaminérgico',
    available_doses: ['10mg', '18mg', '36mg', '54mg'],
    indications: ['TDAH', 'Narcolepsia'],
    contraindications: ['Glaucoma', 'Hipertireoidismo', 'Uso de IMAOs'],
    side_effects: ['Insônia', 'Diminuição do apetite', 'Taquicardia'],
    prescription_type: 'amarela',
  },
];

// Mental Status Exam Options
const MENTAL_EXAM_OPTIONS = {
  appearance: ['Adequada', 'Desleixada', 'Bizarra', 'Boa apresentação'],
  consciousness: ['Lúcido', 'Obnubilado', 'Confuso', 'Sonolento'],
  mood: ['Eutímico', 'Deprimido', 'Eufórico', 'Ansioso', 'Irritável', 'Lábil'],
  thought: [
    'Organizado',
    'Desorganizado',
    'Tangencial',
    'Circunstancial',
    'Bloqueio',
    'Fuga de ideias',
  ],
  perception: ['Sem alterações', 'Alucinações auditivas', 'Alucinações visuais', 'Ilusões'],
};

// ==================== MAIN COMPONENT ====================

export default function PsychoCareSystem() {
  // Navigation State
  const [currentView, setCurrentView] = useState<'patients' | 'medications'>('patients');

  // Patient State
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSearch, setPatientSearch] = useState('');

  // Medication State
  const [medicationSearch, setMedicationSearch] = useState('');
  const [hideAllergyMeds, setHideAllergyMeds] = useState(false);

  // Mental Exam State (for editing)
  const [mentalExam, setMentalExam] = useState<MentalExam>({
    appearance: { value: 'Adequada', notes: '' },
    consciousness: { value: 'Lúcido', notes: '' },
    mood: { value: 'Eutímico', notes: '' },
    thought: { value: 'Organizado', notes: '' },
    perception: { value: 'Sem alterações', notes: '' },
  });

  // Filtered Patients
  const filteredPatients = useMemo(() => {
    return MOCK_PATIENTS.filter(
      (p) =>
        p.full_name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(patientSearch.toLowerCase())
    );
  }, [patientSearch]);

  // Filtered Medications with Allergy Check
  const filteredMedications = useMemo(() => {
    let filtered = MOCK_MEDICATIONS.filter((med) =>
      med.generic_name.toLowerCase().includes(medicationSearch.toLowerCase())
    );

    if (hideAllergyMeds && selectedPatient) {
      filtered = filtered.filter((med) => {
        const hasAllergy = selectedPatient.allergies.some(
          (allergy) =>
            allergy.toLowerCase() === med.activeIngredient.toLowerCase() ||
            allergy.toLowerCase() === med.class.toLowerCase()
        );
        return !hasAllergy;
      });
    }

    return filtered;
  }, [medicationSearch, hideAllergyMeds, selectedPatient]);

  // Check if medication has allergy risk
  const checkAllergyRisk = (medication: Medication): boolean => {
    if (!selectedPatient) return false;
    return selectedPatient.allergies.some(
      (allergy) =>
        allergy.toLowerCase() === medication.activeIngredient.toLowerCase() ||
        allergy.toLowerCase() === medication.class.toLowerCase()
    );
  };

  // Update Mental Exam
  const updateMentalExam = (
    field: keyof MentalExam,
    property: 'value' | 'notes',
    newValue: string
  ) => {
    setMentalExam((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [property]: newValue,
      },
    }));
  };

  // Save Evolution
  const handleSaveEvolution = () => {
    console.log('Salvando evolução...', {
      patient: selectedPatient,
      mentalExam,
    });
    alert('Evolução salva com sucesso! (Veja o console para detalhes)');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* ==================== SIDEBAR ==================== */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">PsychoCare</h1>
              <p className="text-xs text-slate-500">Sistema Psiquiátrico</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setCurrentView('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'patients'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Pacientes</span>
          </button>

          <button
            onClick={() => setCurrentView('medications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === 'medications'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Pill className="w-5 h-5" />
            <span className="font-medium">Medicamentos</span>
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Selected Patient Card (Fixed at Bottom) */}
        {selectedPatient && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Paciente em Atendimento
                </p>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{selectedPatient.full_name}</h3>
              <p className="text-xs text-slate-600 mb-3">
                {selectedPatient.age} anos • {selectedPatient.diagnosis}
              </p>

              {/* Allergy Alert */}
              {selectedPatient.allergies.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-800 mb-1">ALERGIAS</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatient.allergies.map((allergy) => (
                          <span
                            key={allergy}
                            className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 overflow-auto">
        {/* Patients View */}
        {currentView === 'patients' && (
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Pacientes</h1>
                <p className="text-slate-600">Selecione um paciente para visualizar o prontuário</p>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou diagnóstico..."
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Patient Cards */}
              {!selectedPatient ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {patient.full_name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {patient.age} anos • {patient.gender === 'M' ? 'Masculino' : 'Feminino'}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            patient.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 mb-3">{patient.diagnosis}</p>

                      {patient.allergies.length > 0 && (
                        <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-medium text-amber-800">
                            {patient.allergies.length} alergia(s) registrada(s)
                          </span>
                        </div>
                      )}

                      <div className="mt-3 flex items-center text-indigo-600 text-sm font-medium">
                        Ver prontuário <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Patient Details with Editable Mental Exam */
                <div className="space-y-6">
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                  >
                    ← Voltar para lista de pacientes
                  </button>

                  {/* Patient Info */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      Prontuário - {selectedPatient.full_name}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">CPF:</span>
                        <span className="ml-2 text-slate-800 font-medium">
                          {selectedPatient.cpf}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Telefone:</span>
                        <span className="ml-2 text-slate-800 font-medium">
                          {selectedPatient.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Email:</span>
                        <span className="ml-2 text-slate-800 font-medium">
                          {selectedPatient.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Diagnóstico:</span>
                        <span className="ml-2 text-slate-800 font-medium">
                          {selectedPatient.diagnosis}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editable Mental Status Exam */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-5">
                      Súmula Psíquica (Editável)
                    </h3>

                    <div className="space-y-5">
                      {/* Appearance */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Aparência
                          </label>
                          <select
                            value={mentalExam.appearance.value}
                            onChange={(e) =>
                              updateMentalExam('appearance', 'value', e.target.value)
                            }
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {MENTAL_EXAM_OPTIONS.appearance.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Observações
                          </label>
                          <input
                            type="text"
                            value={mentalExam.appearance.notes}
                            onChange={(e) =>
                              updateMentalExam('appearance', 'notes', e.target.value)
                            }
                            placeholder="Adicione observações..."
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Consciousness */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Consciência
                          </label>
                          <select
                            value={mentalExam.consciousness.value}
                            onChange={(e) =>
                              updateMentalExam('consciousness', 'value', e.target.value)
                            }
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {MENTAL_EXAM_OPTIONS.consciousness.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Observações
                          </label>
                          <input
                            type="text"
                            value={mentalExam.consciousness.notes}
                            onChange={(e) =>
                              updateMentalExam('consciousness', 'notes', e.target.value)
                            }
                            placeholder="Adicione observações..."
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Mood */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Humor
                          </label>
                          <select
                            value={mentalExam.mood.value}
                            onChange={(e) => updateMentalExam('mood', 'value', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {MENTAL_EXAM_OPTIONS.mood.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Observações
                          </label>
                          <input
                            type="text"
                            value={mentalExam.mood.notes}
                            onChange={(e) => updateMentalExam('mood', 'notes', e.target.value)}
                            placeholder="Adicione observações..."
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Thought */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Pensamento
                          </label>
                          <select
                            value={mentalExam.thought.value}
                            onChange={(e) => updateMentalExam('thought', 'value', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {MENTAL_EXAM_OPTIONS.thought.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Observações
                          </label>
                          <input
                            type="text"
                            value={mentalExam.thought.notes}
                            onChange={(e) => updateMentalExam('thought', 'notes', e.target.value)}
                            placeholder="Adicione observações..."
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Perception */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Percepção
                          </label>
                          <select
                            value={mentalExam.perception.value}
                            onChange={(e) =>
                              updateMentalExam('perception', 'value', e.target.value)
                            }
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {MENTAL_EXAM_OPTIONS.perception.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Observações
                          </label>
                          <input
                            type="text"
                            value={mentalExam.perception.notes}
                            onChange={(e) =>
                              updateMentalExam('perception', 'notes', e.target.value)
                            }
                            placeholder="Adicione observações..."
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleSaveEvolution}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        <Save className="w-5 h-5" />
                        Salvar Evolução
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medications View (Vademecum) */}
        {currentView === 'medications' && (
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Vademecum</h1>
                <p className="text-slate-600">Busca de medicamentos psiquiátricos</p>
              </div>

              {/* Search Bar and Filters */}
              <div className="mb-6 space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar medicamentos..."
                    value={medicationSearch}
                    onChange={(e) => setMedicationSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Toggle: Hide Allergy Medications */}
                {selectedPatient && selectedPatient.allergies.length > 0 && (
                  <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      {hideAllergyMeds ? (
                        <EyeOff className="w-5 h-5 text-slate-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-slate-600" />
                      )}
                      <span className="text-sm font-medium text-slate-700">
                        Ocultar medicamentos que causam alergia
                      </span>
                    </div>
                    <button
                      onClick={() => setHideAllergyMeds(!hideAllergyMeds)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        hideAllergyMeds ? 'bg-teal-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          hideAllergyMeds ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Medications Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredMedications.map((med) => {
                  const hasAllergyRisk = checkAllergyRisk(med);

                  return (
                    <div
                      key={med.id}
                      className={`rounded-xl p-5 shadow-sm border transition-all ${
                        hasAllergyRisk
                          ? 'bg-red-50 border-red-300'
                          : 'bg-white border-slate-200 hover:shadow-md'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3
                            className={`text-lg font-bold ${
                              hasAllergyRisk ? 'text-red-800' : 'text-slate-800'
                            }`}
                          >
                            {med.generic_name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {med.brand_names.slice(0, 2).join(', ')}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            med.prescription_type === 'amarela'
                              ? 'bg-amber-100 text-amber-700'
                              : med.prescription_type === 'azul'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Receita {med.prescription_type}
                        </span>
                      </div>

                      {/* Allergy Warning */}
                      {hasAllergyRisk && (
                        <div className="mb-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-5 h-5 text-red-700" />
                            <span className="text-sm font-bold text-red-800">
                              RISCO DE ALERGIA
                            </span>
                          </div>
                          <p className="text-xs text-red-700">
                            Paciente possui alergia a {med.activeIngredient} ou {med.class}
                          </p>
                        </div>
                      )}

                      {/* Info */}
                      <div className="space-y-2 text-sm mb-4">
                        <div>
                          <span className="text-slate-500">Classe:</span>
                          <span className="ml-2 text-slate-800 font-medium">{med.class}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Doses:</span>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {med.available_doses.map((dose) => (
                              <span
                                key={dose}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded"
                              >
                                {dose}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        disabled={hasAllergyRisk}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          hasAllergyRisk
                            ? 'bg-red-200 text-red-400 cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        {hasAllergyRisk ? 'Prescrição Bloqueada' : 'Prescrever'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredMedications.length === 0 && (
                <div className="text-center py-12">
                  <Pill className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Nenhum medicamento encontrado
                  </h3>
                  <p className="text-slate-500">
                    Tente ajustar sua busca ou desative o filtro de alergias
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
