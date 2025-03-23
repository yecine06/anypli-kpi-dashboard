import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Download, Users, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Employee {
  id: number;
  name: string;
  role: string;
  hourlyRate: number;
  hoursWorked: number;
}

interface Project {
  id: number;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  description: string;
  employees: Employee[];
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading project data
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockProject: Project = {
        id: parseInt(id || '0'),
        name: `Projet ${id}`,
        client: 'Acme Corporation',
        startDate: '2023-01-15',
        endDate: '2023-06-30',
        budget: 75000,
        status: 'En cours',
        description: 'Refonte complète du système de gestion des ressources humaines.',
        employees: [
          { id: 1, name: 'Sophie Martin', role: 'Chef de projet', hourlyRate: 85, hoursWorked: 120 },
          { id: 2, name: 'Thomas Dubois', role: 'Développeur Frontend', hourlyRate: 65, hoursWorked: 180 },
          { id: 3, name: 'Emma Leroy', role: 'Développeur Backend', hourlyRate: 70, hoursWorked: 160 },
          { id: 4, name: 'Lucas Bernard', role: 'Designer UX', hourlyRate: 60, hoursWorked: 90 }
        ]
      };
      
      setProject(mockProject);
      setLoading(false);
    }, 800);
  }, [id]);

  const calculateTotalCost = () => {
    if (!project) return 0;
    return project.employees.reduce((total, emp) => total + (emp.hourlyRate * emp.hoursWorked), 0);
  };

  const calculateProfitability = () => {
    if (!project) return 0;
    const totalCost = calculateTotalCost();
    return ((project.budget - totalCost) / project.budget) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleExportPDF = () => {
    alert('Fonctionnalité d\'export PDF à implémenter');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Erreur: {error}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">Projet non trouvé</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  const profitability = calculateProfitability();
  const profitabilityColor = profitability > 20 
    ? 'text-green-600' 
    : profitability > 0 
      ? 'text-yellow-600' 
      : 'text-red-600';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {project.status}
          </span>
        </div>
        <button 
          onClick={handleExportPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span>Exporter PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium">{project.client}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Période</p>
                <p className="font-medium">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium">{project.budget.toLocaleString('fr-FR')} €</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Rentabilité</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Coût total</p>
              <p className="font-medium">{calculateTotalCost().toLocaleString('fr-FR')} €</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Marge</p>
              <p className="font-medium">
                {(project.budget - calculateTotalCost()).toLocaleString('fr-FR')} €
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Taux de rentabilité</p>
              <p className={`font-medium ${profitabilityColor}`}>
                {profitability.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Équipe</h2>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">{project.employees.length}</span>
            </div>
          </div>
          <div className="space-y-3">
            {project.employees.map(employee => (
              <div key={employee.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{employee.hoursWorked}h</p>
                  <p className="text-sm text-gray-500">{employee.hourlyRate}€/h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Description du projet</h2>
        <p className="text-gray-700">{project.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Détail des coûts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taux horaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heures travaillées
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coût total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project.employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{employee.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{employee.hourlyRate} €/h</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{employee.hoursWorked} h</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">
                      {(employee.hourlyRate * employee.hoursWorked).toLocaleString('fr-FR')} €
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan={4} className="px-6 py-4 text-right font-medium">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-bold">
                  {calculateTotalCost().toLocaleString('fr-FR')} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
