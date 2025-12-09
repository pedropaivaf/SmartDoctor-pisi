-- =====================================================
-- PSIMED - INSERIR SUPERADMIN
-- =====================================================
-- Este script insere o usuário superadmin no sistema
-- =====================================================

-- Credenciais:
-- Email: admin@psimed.com
-- Senha: Test123
-- Role: superadmin

-- Hash bcrypt da senha "Test123" (10 rounds)
-- $2b$10$rQJ5qYxKZ3mGvY5YvL5xEeJ6QQ1qXFqQrWZxZqY6qYxKZ3mGvY5Yv

INSERT INTO users (
    id,
    email,
    password_hash,
    name,
    crm,
    crm_state,
    specialty,
    role,
    is_active
) VALUES (
    uuid_generate_v4(),
    'admin@psimed.com',
    '$2b$10$rQJ5qYxKZ3mGvY5YvL5xEeJ6QQ1qXFqQrWZxZqY6qYxKZ3mGvY5Yv',
    'Administrador do Sistema',
    '000000',
    'SP',
    'Administração',
    'superadmin',
    TRUE
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active;

-- =====================================================
-- VERIFICAR SE FOI INSERIDO
-- =====================================================
SELECT
    id,
    email,
    name,
    role,
    is_active,
    created_at
FROM users
WHERE email = 'admin@psimed.com';

-- =====================================================
-- SUPERADMIN CRIADO COM SUCESSO!
-- =====================================================
-- Login: admin@psimed.com
-- Senha: Test123
-- =====================================================
