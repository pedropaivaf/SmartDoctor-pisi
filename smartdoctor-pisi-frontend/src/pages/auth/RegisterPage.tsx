import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity } from 'lucide-react';
import { Button, Input, Select } from '../../components/ui';
import { registerSchema, type RegisterFormData } from '../../lib/validations';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';

const BRAZILIAN_STATES = [
  { value: '', label: 'Selecione o estado' },
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await authService.register(data);
      // Navigation handled by authService
    } catch (error) {
      // Error handled by authService (toast)
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartDoctor</h1>
          <p className="text-gray-600">Cadastre-se para começar</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Criar Conta</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Dr. João Silva"
              error={errors.name?.message}
              {...register('name')}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="joao.silva@email.com"
              error={errors.email?.message}
              {...register('email')}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="CRM"
                type="text"
                placeholder="12345"
                error={errors.crm?.message}
                {...register('crm')}
                required
              />

              <Select
                label="UF"
                options={BRAZILIAN_STATES}
                error={errors.crm_state?.message}
                {...register('crm_state')}
                required
              />
            </div>

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              helperText="Mínimo 6 caracteres"
              error={errors.password?.message}
              {...register('password')}
              required
            />

            <div className="pt-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  Concordo com os{' '}
                  <a href="#" className="text-primary hover:text-primary-dark">
                    Termos de Uso
                  </a>{' '}
                  e{' '}
                  <a href="#" className="text-primary hover:text-primary-dark">
                    Política de Privacidade
                  </a>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Cadastrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          © 2025 SmartDoctor. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
