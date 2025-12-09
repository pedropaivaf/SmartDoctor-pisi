import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select } from '../../components/ui';
import { toast } from 'sonner';

function PatientEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with API call
  const [formData, setFormData] = useState({
    full_name: 'Ana Silva Santos',
    cpf: '123.456.789-00',
    birth_date: '1990-05-15',
    gender: 'F',
    phone: '(11) 98765-4321',
    email: 'ana@email.com',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zip_code: '01234-567',
    insurance_provider: 'Unimed',
    insurance_number: '123456789',
    emergency_contact_name: 'João Silva',
    emergency_contact_phone: '(11) 91234-5678',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Paciente atualizado com sucesso!');
      navigate(`/patients/${id}`);
    } catch (error) {
      toast.error('Erro ao atualizar paciente');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/patients/${id}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o perfil
        </button>
        <h1 className="text-3xl font-bold text-slate-800">Editar Paciente</h1>
        <p className="text-slate-600 mt-1">Atualize as informações do paciente</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3">
                <Input
                  label="Nome Completo"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                required
              />

              <Input
                label="Data de Nascimento"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Idade</label>
                <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                  {calculateAge(formData.birth_date)} anos
                </div>
              </div>

              <Select
                label="Gênero"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="Other">Outro</option>
              </Select>

              <Input
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="paciente@email.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="md:col-span-2 lg:col-span-2">
                <Input
                  label="Endereço"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, número, complemento"
                />
              </div>

              <Input
                label="Cidade"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="Estado"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="UF"
                maxLength={2}
              />

              <Input
                label="CEP"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                placeholder="00000-000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Convênio e Contato de Emergência */}
        <Card>
          <CardHeader>
            <CardTitle>Convênio e Contato de Emergência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Convênio"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={handleChange}
                placeholder="Nome do convênio"
              />

              <Input
                label="Número da Carteirinha"
                name="insurance_number"
                value={formData.insurance_number}
                onChange={handleChange}
                placeholder="Número"
              />

              <Input
                label="Contato de Emergência"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleChange}
                placeholder="Nome"
              />

              <Input
                label="Telefone de Emergência"
                name="emergency_contact_phone"
                value={formData.emergency_contact_phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/patients/${id}`)}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default PatientEditPage;
