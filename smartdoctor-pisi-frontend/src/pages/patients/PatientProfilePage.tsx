
import { useParams, Link } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../components/ui';

function PatientProfilePage() {
  const { id } = useParams();

  return (
    <Container maxWidth="lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ana Silva Santos</h1>
          <p className="text-gray-600">CPF: 123.456.789-00 • 34 anos</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/patients/${id}/edit`}>
            <Button variant="outline">Editar</Button>
          </Link>
          <Link to={`/patients/${id}/sumula/new`}>
            <Button leftIcon={<Plus className="w-5 h-5" />}>Nova Súmula</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Informações</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">Email:</span> ana@email.com</div>
              <div><span className="text-gray-500">Telefone:</span> (11) 98765-4321</div>
              <div><span className="text-gray-500">Convênio:</span> <Badge variant="blue">Unimed</Badge></div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Súmulas Psicológicas</CardTitle></CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm">Nenhuma súmula registrada ainda.</p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default PatientProfilePage;
