
import { Link } from 'react-router-dom';
import { Users, FileText, FileSignature, TrendingUp, Plus } from 'lucide-react';
import { Container } from '../components/layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../components/ui';

function DashboardPage() {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: 'Total de Pacientes',
      value: '248',
      change: '+12% este mês',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Consultas Hoje',
      value: '8',
      change: '3 pendentes',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Súmulas Pendentes',
      value: '3',
      change: 'Finalizar hoje',
      icon: FileSignature,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Prescrições Ativas',
      value: '142',
      change: '+8 esta semana',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const recentPatients = [
    { id: '1', name: 'Ana Silva Santos', lastVisit: '2024-01-20', status: 'Em tratamento' },
    { id: '2', name: 'Carlos Eduardo Souza', lastVisit: '2024-01-19', status: 'Primeira consulta' },
    { id: '3', name: 'Maria Oliveira Lima', lastVisit: '2024-01-18', status: 'Retorno' },
    { id: '4', name: 'João Pedro Costa', lastVisit: '2024-01-15', status: 'Em tratamento' },
  ];

  const upcomingAppointments = [
    { id: '1', patient: 'Ana Silva Santos', time: '14:00', type: 'Retorno' },
    { id: '2', patient: 'Roberto Alves', time: '15:30', type: 'Primeira consulta' },
    { id: '3', patient: 'Juliana Mendes', time: '16:30', type: 'Acompanhamento' },
  ];

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao SmartDoctor. Aqui está um resumo das suas atividades.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <Card>
          <CardHeader actions={
            <Link to="/patients">
              <Button variant="ghost" size="sm">Ver todos</Button>
            </Link>
          }>
            <CardTitle>Pacientes Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentPatients.map((patient) => (
                <Link
                  key={patient.id}
                  to={`/patients/${patient.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500">Último atendimento: {patient.lastVisit}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {patient.status}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader actions={
            <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Nova consulta
            </Button>
          }>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                      <span className="text-xl font-bold text-primary">
                        {appointment.time.split(':')[0]}
                      </span>
                      <span className="text-xs text-primary">
                        :{appointment.time.split(':')[1]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/patients/new">
              <Button variant="outline" className="w-full justify-start" leftIcon={<Plus className="w-5 h-5" />}>
                Novo Paciente
              </Button>
            </Link>
            <Link to="/medications">
              <Button variant="outline" className="w-full justify-start" leftIcon={<Plus className="w-5 h-5" />}>
                Buscar Medicamento
              </Button>
            </Link>
            <Link to="/prescriptions/new">
              <Button variant="outline" className="w-full justify-start" leftIcon={<Plus className="w-5 h-5" />}>
                Nova Prescrição
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DashboardPage;
