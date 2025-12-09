
import { Search } from 'lucide-react';
import { Container } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle, SearchBar, Badge } from '../../components/ui';

function MedicationsPage() {
  const medications = [
    {
      id: '1',
      generic_name: 'Sertralina',
      brand_names: ['Zoloft', 'Assert'],
      therapeutic_class: 'Antidepressivo',
      prescription_type: 'branca',
      available_doses: ['25mg', '50mg', '100mg'],
    },
  ];

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Busca de Medicamentos</h1>

      <Card className="mb-6">
        <CardContent>
          <SearchBar placeholder="Buscar medicamentos..." onSearch={(q) => console.log(q)} />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {medications.map((med) => (
          <Card key={med.id} hover clickable>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{med.generic_name}</h3>
                  <p className="text-sm text-gray-600">Nomes comerciais: {med.brand_names.join(', ')}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="blue">{med.therapeutic_class}</Badge>
                    <Badge variant="yellow">Receita {med.prescription_type}</Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  {med.available_doses.map((dose) => (
                    <Badge key={dose} variant="gray" size="sm">{dose}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default MedicationsPage;
