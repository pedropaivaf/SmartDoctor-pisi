
import { useParams } from 'react-router-dom';
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../components/ui';

function SumulaViewPage() {
  const { id, recordId } = useParams();

  return (
    <Container maxWidth="xl">
      <h1 className="text-2xl font-bold mb-6">Súmula Psicológica</h1>
      <Card>
        <CardHeader><CardTitle>Visualização da Súmula</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div><strong>Paciente:</strong> Ana Silva Santos</div>
            <div><strong>Data:</strong> 20/01/2024</div>
            <div><strong>Status:</strong> <Badge variant="green">Finalizada</Badge></div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SumulaViewPage;
