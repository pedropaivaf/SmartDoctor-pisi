
import { useParams } from 'react-router-dom';
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Textarea } from '../../components/ui';

function SumulaNewPage() {
  const { id } = useParams();

  return (
    <Container maxWidth="xl">
      <div className="sticky top-0 bg-gray-50 z-10 pb-4 mb-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nova Súmula Psicológica</h1>
            <p className="text-gray-600">Paciente: Ana Silva Santos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Salvar Rascunho</Button>
            <Button>Finalizar</Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Anamnese</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea label="Queixa Principal" placeholder="Motivo da consulta..." rows={3} required />
            <Textarea label="História da Doença Atual" rows={4} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Exame do Estado Mental</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="Humor" placeholder="Descreva o humor do paciente" required />
            <Input label="Afeto" placeholder="Descreva o afeto" required />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Diagnóstico</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="CID-10" placeholder="Buscar CID-10..." required />
            <Textarea label="Impressão Diagnóstica" rows={3} required />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Plano Terapêutico</CardTitle></CardHeader>
          <CardContent>
            <Textarea label="Plano de Tratamento" rows={4} required />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default SumulaNewPage;
