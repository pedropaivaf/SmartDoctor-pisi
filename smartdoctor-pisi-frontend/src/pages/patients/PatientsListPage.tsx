
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Container } from '../../components/layout';
import { Card, CardContent, Button, SearchBar, Badge } from '../../components/ui';
import { formatDate, calculateAge, formatCPF } from '../../lib/utils';

function PatientsListPage() {
  // Mock data - replace with real API call
  const patients = [
    {
      id: '1',
      full_name: 'Ana Silva Santos',
      cpf: '123.456.789-00',
      birth_date: '1990-05-15',
      phone: '(11) 98765-4321',
      insurance_provider: 'Unimed',
    },
    {
      id: '2',
      full_name: 'Carlos Eduardo Souza',
      cpf: '987.654.321-00',
      birth_date: '1985-08-22',
      phone: '(11) 91234-5678',
      insurance_provider: 'Bradesco Saúde',
    },
  ];

  return (
    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pacientes</h1>
          <p className="text-gray-600">Gerencie seus pacientes</p>
        </div>
        <Link to="/patients/new">
          <Button leftIcon={<Plus className="w-5 h-5" />}>
            Novo Paciente
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent>
          <SearchBar placeholder="Buscar por nome, CPF..." onSearch={(q) => console.log(q)} />
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPF</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Idade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Convênio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{patient.full_name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatCPF(patient.cpf)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{calculateAge(patient.birth_date)} anos</td>
                    <td className="px-6 py-4">
                      <Badge variant="blue">{patient.insurance_provider}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link to={`/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm">Ver</Button>
                      </Link>
                      <Link to={`/patients/${patient.id}/edit`}>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PatientsListPage;
