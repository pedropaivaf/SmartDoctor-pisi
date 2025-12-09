
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Select, Input } from '../../components/ui';

function PrescriptionNewPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const prescriptionTypes = [
    { value: 'amarela', label: 'Receita Amarela (A1-A3)' },
    { value: 'azul', label: 'Receita Azul (B1-B2)' },
    { value: 'branca', label: 'Receita Branca (C1-C5)' },
  ];

  return (
    <Container maxWidth="xl">
      <h1 className="text-2xl font-bold mb-6">Nova Prescrição</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Tipo de Receita</CardTitle></CardHeader>
            <CardContent>
              <Select label="Selecione o tipo" options={prescriptionTypes} required />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Medicamentos</CardTitle></CardHeader>
            <CardContent>
              <Input label="Buscar medicamento" placeholder="Digite o nome..." />
              <p className="text-sm text-gray-500 mt-4">Nenhum medicamento adicionado.</p>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button>Salvar Prescrição</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Cancelar</Button>
          </div>
        </div>

        <Card className="lg:sticky lg:top-6 h-fit">
          <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded border-2 border-gray-200 min-h-[400px]">
              <p className="text-sm text-gray-500 text-center">Preview da receita aparecerá aqui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default PrescriptionNewPage;
