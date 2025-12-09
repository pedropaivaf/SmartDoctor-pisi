import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Container } from '../../components/layout';
import { Card, CardContent, Button, Badge } from '../../components/ui';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../components/ui/Modal';
import { toast } from 'sonner';

function PrescriptionsListPage() {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const prescriptions = [
    {
      id: '1',
      patient_name: 'Ana Silva Santos',
      date: '2024-01-20',
      type: 'amarela',
      status: 'Ativa',
      medications_count: 2,
    },
  ];

  const handleEdit = (id: string) => {
    navigate(`/prescriptions/${id}/edit`);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPrescription(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPrescription) return;

    setIsDeleting(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Prescrição excluída com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedPrescription(null);
    } catch (error) {
      toast.error('Erro ao excluir prescrição');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedPrescription(null);
  };

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Prescrições</h1>
        <Link to="/prescriptions/new">
          <Button leftIcon={<Plus className="w-5 h-5" />}>Nova Prescrição</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} hover>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-800">{prescription.patient_name}</h3>
                  <p className="text-sm text-slate-600 mt-1">Data: {prescription.date}</p>
                  <p className="text-sm text-slate-600">{prescription.medications_count} medicamentos</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <Badge variant="yellow">Receita {prescription.type}</Badge>
                    <Badge variant="green">{prescription.status}</Badge>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Pencil className="w-4 h-4" />}
                      onClick={() => handleEdit(prescription.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={(e) => handleDeleteClick(prescription.id, e)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel} size="sm">
        <ModalHeader>
          <ModalTitle>Confirmar Exclusão</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-slate-700">
            Tem certeza que deseja excluir esta prescrição? Esta ação não pode ser desfeita.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleDeleteConfirm}
            isLoading={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default PrescriptionsListPage;
