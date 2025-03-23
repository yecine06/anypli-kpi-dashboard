import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Clock, Filter } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  hoursWorked: number;
  projectsCount: number;
  utilization: number;
}

const EmployeeAnalysis: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockEmployees: Employee[] = [
        { id: 1, name: 'Sophie Martin', role: 'Chef de projet', department: 'Management', hoursWorked: 520, projectsCount: 4, utilization: 85 },
        { id: 2, name: 'Thomas Dubois', role: 'Développeur Frontend', department: 'Technique', hoursWorked: 480, projectsCount: 3, utilization: 78 },
        { id: 3, name: 'Emma Leroy', role: 'Développeur Backend', department: 'Technique', hoursWorked: 510, projectsCount: 2, utilization: 83 },
        { id: 4, name: 'Lucas Bernard', role: 'Designer UX', department: 'Créatif', hoursWorked: 390, projectsCount: 5, utilization: 64 },
        { id: 5, name: 'Camille Petit', role: 'Analyste Business', department: 'Business', hoursWorked: 450, projectsCount: 3, utilization: 73 },
        { id: 6, name: 'Antoine Moreau', role: 'Développeur Mobile', department: 'Technique', hoursWorked: 530, projectsCount: 2, utilization: 87 },
        { id: 7, name: 'Julie Roux', role: 'Designer UI', department: 'Créatif', hoursWorked: 410, projectsCount: 4, utilization: 67 },
        { id: 8, name: 'Nicolas Fournier', role: 'Architecte Solution', department: 'Technique', hoursWorked: 490, projectsCount: 3, utilization: 80 }
      ];
      
      setEmployees(mockEmployees);
      setLoading(false);
    }, 800);
  }, []);

  const filteredEmployees = filter === 'all' 
    ? employees 
    : employees.filter(emp => emp.department === filter);

  const chartData = filteredEmployees.map(emp => ({
    name: emp.name,
    'Taux d\'utilisation': emp.utilization,
    'Nombre de projets': emp.projectsCount * 10 // Scale for better visualization
  }));

  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analyse des employés</h1>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'Tous les départements' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nombre d'employés</p>
              <p className="text-2xl font-bold">{filteredEmployees.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Heures travaillées (total)</p>
              <p className="text-2xl font-bold">
                {filteredEmployees.reduce((sum, emp) => sum + emp.hoursWorked, 0).toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <div className="h-6 w-6 flex items-center justify-center text-purple-600 font-bold">%</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Taux d'utilisation moyen</p>
              <p className="text-2xl font-bold">
                {(filteredEmployees.reduce((sum, emp) => sum + emp.utilization, 0) / filteredEmployees.length || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Utilisation des ressources</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Taux d'utilisation" fill="#3B82F6" />
              <Bar dataKey="Nombre de projets" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Détails des employés</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heures travaillées
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{employee.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {employee.hoursWorked}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {employee.projectsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            employee.utilization > 80 ? 'bg-green-600' : 
                            employee.utilization > 60 ? 'bg-blue-600' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${employee.utilization}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-gray-900">{employee.utilization}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAnalysis;
