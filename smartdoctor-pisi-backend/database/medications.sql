-- ==================== ESTRUTURA DO BANCO ====================
-- Execute este SQL no seu PostgreSQL antes de rodar a aplicação

-- Criar tabelas (TypeORM faz automaticamente se synchronize=true)
-- Mas se quiser criar manualmente, use o schema.sql

-- ==================== POPULAR MEDICAMENTOS ====================

INSERT INTO medications (generic_name, brand_names, therapeutic_class, subclass, controlled_substance, prescription_type, available_doses, usual_dose_range, indications, common_side_effects, major_interactions) VALUES

('Sertralina', ARRAY['Zoloft', 'Tolrest', 'Assert'], 'Antidepressivo', 'ISRS', 'C1', 'Branca', ARRAY['25mg', '50mg', '100mg'], '50-200mg/dia', ARRAY['Depressão', 'TAG', 'TOC', 'Pânico', 'TEPT'], ARRAY['Náusea', 'Diarreia', 'Insônia', 'Disfunção sexual'], '[{"drug": "IMAO", "effect": "Síndrome serotoninérgica"}, {"drug": "Tramadol", "effect": "Aumento risco convulsões"}]'),

('Escitalopram', ARRAY['Lexapro', 'Reconter'], 'Antidepressivo', 'ISRS', 'C1', 'Branca', ARRAY['10mg', '15mg', '20mg'], '10-20mg/dia', ARRAY['Depressão', 'TAG'], ARRAY['Náusea', 'Fadiga', 'Disfunção sexual'], '[{"drug": "IMAO", "effect": "Síndrome serotoninérgica"}]'),

('Fluoxetina', ARRAY['Prozac', 'Daforin', 'Fluxene'], 'Antidepressivo', 'ISRS', 'C1', 'Branca', ARRAY['10mg', '20mg', '40mg'], '20-80mg/dia', ARRAY['Depressão', 'TOC', 'Bulimia'], ARRAY['Insônia', 'Agitação', 'Disfunção sexual'], '[{"drug": "IMAO", "effect": "Síndrome serotoninérgica"}, {"drug": "Tamoxifeno", "effect": "Reduz eficácia"}]'),

('Venlafaxina', ARRAY['Efexor', 'Venlift'], 'Antidepressivo', 'IRSN', 'C1', 'Branca', ARRAY['37.5mg', '75mg', '150mg'], '75-225mg/dia', ARRAY['Depressão', 'TAG'], ARRAY['Náusea', 'Sudorese', 'Hipertensão'], '[{"drug": "IMAO", "effect": "Síndrome serotoninérgica"}]'),

('Bupropiona', ARRAY['Wellbutrin', 'Zyban'], 'Antidepressivo', 'NDRI', 'C1', 'Branca', ARRAY['150mg', '300mg'], '150-450mg/dia', ARRAY['Depressão', 'Cessação tabagismo'], ARRAY['Insônia', 'Boca seca', 'Agitação'], '[{"drug": "IMAO", "effect": "Crise hipertensiva"}, {"drug": "Álcool", "effect": "Reduz limiar convulsivo"}]'),

('Mirtazapina', ARRAY['Remeron'], 'Antidepressivo', 'NaSSA', 'C1', 'Branca', ARRAY['15mg', '30mg', '45mg'], '15-45mg/dia', ARRAY['Depressão', 'Insônia'], ARRAY['Sonolência', 'Ganho peso', 'Boca seca'], '[{"drug": "IMAO", "effect": "Síndrome serotoninérgica"}]'),

('Risperidona', ARRAY['Risperdal', 'Zargus'], 'Antipsicótico', 'Atípico', 'C1', 'Branca', ARRAY['1mg', '2mg', '3mg'], '2-6mg/dia', ARRAY['Esquizofrenia', 'Mania bipolar', 'Agitação'], ARRAY['Ganho peso', 'Sonolência', 'Hiperprolactinemia'], '[{"drug": "Carbamazepina", "effect": "Reduz níveis"}, {"drug": "Clozapina", "effect": "Aumento toxicidade"}]'),

('Quetiapina', ARRAY['Seroquel'], 'Antipsicótico', 'Atípico', 'C1', 'Branca', ARRAY['25mg', '100mg', '200mg', '300mg'], '150-800mg/dia', ARRAY['Esquizofrenia', 'Bipolar', 'Depressão resistente'], ARRAY['Sedação', 'Ganho peso', 'Síndrome metabólica'], '[{"drug": "Carbamazepina", "effect": "Reduz níveis"}]'),

('Olanzapina', ARRAY['Zyprexa'], 'Antipsicótico', 'Atípico', 'C1', 'Branca', ARRAY['5mg', '10mg'], '5-20mg/dia', ARRAY['Esquizofrenia', 'Mania'], ARRAY['Ganho peso intenso', 'Diabetes', 'Sedação'], '[{"drug": "Fluvoxamina", "effect": "Aumenta níveis"}]'),

('Aripiprazol', ARRAY['Abilify'], 'Antipsicótico', 'Atípico', 'C1', 'Branca', ARRAY['10mg', '15mg', '20mg'], '10-30mg/dia', ARRAY['Esquizofrenia', 'Bipolar', 'Adjuvante depressão'], ARRAY['Acatisia', 'Insônia', 'Náusea'], '[{"drug": "Carbamazepina", "effect": "Reduz níveis"}]'),

('Haloperidol', ARRAY['Haldol'], 'Antipsicótico', 'Típico', 'C1', 'Branca', ARRAY['1mg', '5mg'], '5-20mg/dia', ARRAY['Esquizofrenia', 'Agitação aguda'], ARRAY['Sintomas extrapiramidais', 'Discinesia tardia'], '[{"drug": "Lítio", "effect": "Neurotoxicidade"}]'),

('Lítio', ARRAY['Carbolitium'], 'Estabilizador humor', 'Sal', 'C1', 'Branca', ARRAY['300mg', '450mg'], '900-1800mg/dia', ARRAY['Bipolar', 'Prevenção suicídio'], ARRAY['Tremor', 'Poliúria', 'Hipotireoidismo'], '[{"drug": "Diuréticos tiazídicos", "effect": "Toxicidade"}, {"drug": "AINEs", "effect": "Aumenta níveis"}]'),

('Valproato', ARRAY['Depakote', 'Torval'], 'Estabilizador humor', 'Anticonvulsivante', 'C1', 'Branca', ARRAY['250mg', '500mg'], '750-2000mg/dia', ARRAY['Mania', 'Profilaxia bipolar'], ARRAY['Tremor', 'Ganho peso', 'Hepatotoxicidade'], '[{"drug": "Carbamazepina", "effect": "Reduz níveis mutuamente"}]'),

('Lamotrigina', ARRAY['Lamictal'], 'Estabilizador humor', 'Anticonvulsivante', 'C1', 'Branca', ARRAY['25mg', '50mg', '100mg'], '100-400mg/dia', ARRAY['Bipolar depressão', 'Manutenção'], ARRAY['Rash cutâneo', 'Tontura'], '[{"drug": "Valproato", "effect": "Aumenta níveis - ajustar dose"}, {"drug": "Anticoncepcionais", "effect": "Reduzem níveis"}]'),

('Carbamazepina', ARRAY['Tegretol'], 'Estabilizador humor', 'Anticonvulsivante', 'C1', 'Branca', ARRAY['200mg', '400mg'], '400-1200mg/dia', ARRAY['Bipolar', 'Epilepsia'], ARRAY['Sonolência', 'Ataxia', 'Diplopia'], '[{"drug": "Anticoncepcionais", "effect": "Reduz eficácia"}]'),

('Alprazolam', ARRAY['Frontal'], 'Benzodiazepínico', 'Ansiolítico', 'B1', 'Azul', ARRAY['0.25mg', '0.5mg', '1mg', '2mg'], '0.5-4mg/dia', ARRAY['TAG', 'Pânico'], ARRAY['Sedação', 'Dependência', 'Amnésia'], '[{"drug": "Opioides", "effect": "Depressão respiratória"}, {"drug": "Álcool", "effect": "Sedação grave"}]'),

('Clonazepam', ARRAY['Rivotril'], 'Benzodiazepínico', 'Ansiolítico', 'B1', 'Azul', ARRAY['0.5mg', '2mg'], '0.5-6mg/dia', ARRAY['Pânico', 'TAG', 'Convulsões'], ARRAY['Sedação', 'Dependência', 'Ataxia'], '[{"drug": "Opioides", "effect": "Depressão respiratória"}]'),

('Diazepam', ARRAY['Valium'], 'Benzodiazepínico', 'Ansiolítico', 'B1', 'Azul', ARRAY['5mg', '10mg'], '5-40mg/dia', ARRAY['Ansiedade', 'Espasmo muscular'], ARRAY['Sedação', 'Dependência'], '[{"drug": "Álcool", "effect": "Sedação excessiva"}]'),

('Lorazepam', ARRAY['Lorax'], 'Benzodiazepínico', 'Ansiolítico', 'B1', 'Azul', ARRAY['1mg', '2mg'], '1-6mg/dia', ARRAY['Ansiedade', 'Insônia'], ARRAY['Sedação', 'Dependência'], '[{"drug": "Opioides", "effect": "Depressão respiratória"}]'),

('Zolpidem', ARRAY['Stilnox'], 'Hipnótico', 'Imidazopiridina', 'B1', 'Azul', ARRAY['5mg', '10mg'], '5-10mg ao deitar', ARRAY['Insônia'], ARRAY['Sonolência diurna', 'Comportamento complexo'], '[{"drug": "Álcool", "effect": "Sedação excessiva"}]'),

('Metilfenidato', ARRAY['Ritalina', 'Concerta'], 'Estimulante', 'Anfetamina', 'A3', 'Amarela', ARRAY['10mg', '18mg', '36mg'], '20-60mg/dia', ARRAY['TDAH', 'Narcolepsia'], ARRAY['Insônia', 'Perda apetite', 'Taquicardia'], '[{"drug": "IMAO", "effect": "Crise hipertensiva"}, {"drug": "Anticoagulantes", "effect": "Aumenta efeito"}]'),

('Lisdexanfetamina', ARRAY['Venvanse'], 'Estimulante', 'Anfetamina', 'A3', 'Amarela', ARRAY['30mg', '50mg', '70mg'], '30-70mg/dia', ARRAY['TDAH'], ARRAY['Insônia', 'Perda apetite', 'Ansiedade'], '[{"drug": "IMAO", "effect": "Crise hipertensiva"}]'),

('Atomoxetina', ARRAY['Strattera'], 'TDAH', 'Inibidor recaptação noradrenalina', 'C1', 'Branca', ARRAY['25mg', '40mg', '60mg'], '40-100mg/dia', ARRAY['TDAH'], ARRAY['Náusea', 'Fadiga', 'Diminuição apetite'], '[{"drug": "IMAO", "effect": "Contraindicado"}]'),

('Topiramato', ARRAY['Topamax'], 'Anticonvulsivante', 'Estabilizador', 'C1', 'Branca', ARRAY['25mg', '50mg', '100mg'], '100-400mg/dia', ARRAY['Epilepsia', 'Profilaxia enxaqueca', 'Off-label bipolar'], ARRAY['Parestesias', 'Perda peso', 'Dificuldade cognitiva'], '[{"drug": "Anticoncepcionais", "effect": "Reduz eficácia"}]');

-- ==================== CRIAR ÍNDICES ====================

CREATE INDEX IF NOT EXISTS idx_medications_generic ON medications USING GIN (to_tsvector('portuguese', generic_name));
CREATE INDEX IF NOT EXISTS idx_medications_brands ON medications USING GIN (brand_names);
CREATE INDEX IF NOT EXISTS idx_medications_class ON medications(therapeutic_class, subclass);
CREATE INDEX IF NOT EXISTS idx_medications_indications ON medications USING GIN (indications);
CREATE INDEX IF NOT EXISTS idx_audit_patient ON audit_logs(patient_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id, created_at);
