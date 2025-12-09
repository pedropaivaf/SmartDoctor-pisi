
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '../../components/ui';

function PatientNewPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Novo Paciente</h1>
        <p className="text-gray-600">Preencha os dados do paciente</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input label="Nome Completo" placeholder="Nome do paciente" required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="CPF" placeholder="000.000.000-00" required />
              <Input label="Data de Nascimento" type="date" required />
            </div>
            <Input label="Telefone" placeholder="(00) 00000-0000" />
            <Input label="Email" type="email" placeholder="email@exemplo.com" />
            
            <div className="flex gap-3 pt-4">
              <Button type="submit">Salvar</Button>
              <Button variant="outline" onClick={() => navigate(-1)}>Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PatientNewPage;
