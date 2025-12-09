/**
 * Script para criar o superadmin no banco de dados
 *
 * Credenciais:
 * - Email: admin@psimed.com
 * - Senha: Test123
 * - Role: superadmin
 *
 * Como executar:
 * node scripts/create-superadmin.js
 */

const bcrypt = require('bcrypt');
const { Client } = require('pg');
require('dotenv').config();

async function createSuperAdmin() {
  // Configuração do banco de dados do .env
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_HOST.includes('supabase') ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('🔌 Conectando ao banco de dados...');
    await client.connect();
    console.log('✅ Conectado com sucesso!\n');

    // Gerar hash da senha "Test123"
    console.log('🔐 Gerando hash da senha...');
    const password = 'Test123';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log('✅ Hash gerado!\n');

    // Inserir ou atualizar o superadmin
    console.log('👤 Criando/atualizando superadmin...');
    const query = `
      INSERT INTO users (
        email,
        password_hash,
        name,
        crm,
        crm_state,
        specialty,
        role,
        is_active
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
      ON CONFLICT (email)
      DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        is_active = EXCLUDED.is_active
      RETURNING id, email, name, role, created_at;
    `;

    const values = [
      'admin@psimed.com',
      passwordHash,
      'Administrador do Sistema',
      '000000',
      'SP',
      'Administração',
      'superadmin',
      true,
    ];

    const result = await client.query(query, values);

    console.log('✅ Superadmin criado/atualizado com sucesso!\n');
    console.log('📋 Detalhes do usuário:');
    console.log('-----------------------------------');
    console.log(`ID:         ${result.rows[0].id}`);
    console.log(`Email:      ${result.rows[0].email}`);
    console.log(`Nome:       ${result.rows[0].name}`);
    console.log(`Role:       ${result.rows[0].role}`);
    console.log(`Criado em:  ${result.rows[0].created_at}`);
    console.log('-----------------------------------\n');

    console.log('🔑 CREDENCIAIS DE LOGIN:');
    console.log('-----------------------------------');
    console.log(`Email:    admin@psimed.com`);
    console.log(`Senha:    Test123`);
    console.log('-----------------------------------\n');

  } catch (error) {
    console.error('❌ Erro ao criar superadmin:', error.message);
    console.error('\n💡 Dicas:');
    console.error('1. Verifique se o arquivo .env está configurado corretamente');
    console.error('2. Verifique se as tabelas foram criadas (execute setup-supabase.sql)');
    console.error('3. Verifique a conexão com o banco de dados');
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Conexão fechada.');
  }
}

// Executar
createSuperAdmin();
