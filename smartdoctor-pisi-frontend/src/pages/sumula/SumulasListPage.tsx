
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui';

function SumulasListPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Súmulas Psicológicas</h1>
      <Card>
        <CardHeader><CardTitle>Lista de Súmulas</CardTitle></CardHeader>
        <CardContent>
          <p className="text-gray-500">Nenhuma súmula encontrada.</p>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SumulasListPage;
