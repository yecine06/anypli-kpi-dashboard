import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ message: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project details with cost calculation
app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;
  
  try {
    // Get project details
    const [projectRows] = await pool.query(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    
    if (projectRows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const project = projectRows[0];
    
    // Get working slots for this project within date range
    let query = `
      SELECT ws.*, u.first_name, u.last_name, u.id as user_id
      FROM working_slots ws
      JOIN users u ON ws.employee_id = u.id
      WHERE ws.project_id = ?
    `;
    
    const params = [id];
    
    if (startDate && endDate) {
      query += ' AND ws.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    
    const [slotsRows] = await pool.query(query, params);
    
    // Calculate costs for each slot
    const employeeSlots = {};
    const employeeCosts = {};
    let totalCost = 0;
    let totalSlots = 0;
    
    for (const slot of slotsRows) {
      // Get applicable salary for this employee at the time of the slot
      const [salaryRows] = await pool.query(
        `SELECT * FROM salaries 
         WHERE employee_id = ? 
         AND start_date_salary <= ? 
         AND (end_date_salary IS NULL OR end_date_salary >= ?)
         ORDER BY start_date_salary DESC LIMIT 1`,
        [slot.employee_id, slot.date, slot.date]
      );
      
      if (salaryRows.length > 0) {
        const salary = salaryRows[0];
        const dailyCost = salary.raw / 22; // Assuming 22 working days per month
        const slotCost = dailyCost / 2; // Each slot is 0.5 day
        
        // Add to employee totals
        if (!employeeSlots[slot.employee_id]) {
          employeeSlots[slot.employee_id] = {
            id: slot.employee_id,
            name: `${slot.first_name} ${slot.last_name}`,
            slots: 0,
            cost: 0
          };
        }
        
        employeeSlots[slot.employee_id].slots += 1;
        employeeSlots[slot.employee_id].cost += slotCost;
        
        totalCost += slotCost;
        totalSlots += 1;
      }
    }
    
    res.json({
      project,
      totalCost,
      totalSlots,
      totalDays: totalSlots / 2,
      employees: Object.values(employeeSlots),
      slots: slotsRows
    });
    
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
});

// Get project costs summary
app.get('/api/projects-summary', async (req, res) => {
  const { startDate, endDate } = req.query;
  
  try {
    // Get all projects
    const [projectRows] = await pool.query('SELECT * FROM projects');
    
    const projectsSummary = [];
    
    for (const project of projectRows) {
      // Get working slots for this project within date range
      let query = `
        SELECT ws.*, u.id as user_id
        FROM working_slots ws
        JOIN users u ON ws.employee_id = u.id
        WHERE ws.project_id = ?
      `;
      
      const params = [project.id];
      
      if (startDate && endDate) {
        query += ' AND ws.date BETWEEN ? AND ?';
        params.push(startDate, endDate);
      }
      
      const [slotsRows] = await pool.query(query, params);
      
      // Calculate costs for each slot
      let totalCost = 0;
      let totalSlots = 0;
      
      for (const slot of slotsRows) {
        // Get applicable salary for this employee at the time of the slot
        const [salaryRows] = await pool.query(
          `SELECT * FROM salaries 
           WHERE employee_id = ? 
           AND start_date_salary <= ? 
           AND (end_date_salary IS NULL OR end_date_salary >= ?)
           ORDER BY start_date_salary DESC LIMIT 1`,
          [slot.employee_id, slot.date, slot.date]
        );
        
        if (salaryRows.length > 0) {
          const salary = salaryRows[0];
          const dailyCost = salary.raw / 22; // Assuming 22 working days per month
          const slotCost = dailyCost / 2; // Each slot is 0.5 day
          
          totalCost += slotCost;
          totalSlots += 1;
        }
      }
      
      projectsSummary.push({
        ...project,
        totalCost,
        totalSlots,
        totalDays: totalSlots / 2
      });
    }
    
    res.json(projectsSummary);
    
  } catch (error) {
    console.error('Error fetching projects summary:', error);
    res.status(500).json({ error: 'Failed to fetch projects summary' });
  }
});

// Get employee workload
app.get('/api/employees/:id/workload', async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;
  
  try {
    // Get employee details
    const [employeeRows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    if (employeeRows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const employee = employeeRows[0];
    
    // Get working slots for this employee within date range
    let query = `
      SELECT ws.*, p.id as project_id, p.name as project_name
      FROM working_slots ws
      JOIN projects p ON ws.project_id = p.id
      WHERE ws.employee_id = ?
    `;
    
    const params = [id];
    
    if (startDate && endDate) {
      query += ' AND ws.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    
    const [slotsRows] = await pool.query(query, params);
    
    // Calculate costs for each slot
    const projectSlots = {};
    let totalCost = 0;
    let totalSlots = 0;
    
    for (const slot of slotsRows) {
      // Get applicable salary for this employee at the time of the slot
      const [salaryRows] = await pool.query(
        `SELECT * FROM salaries 
         WHERE employee_id = ? 
         AND start_date_salary <= ? 
         AND (end_date_salary IS NULL OR end_date_salary >= ?)
         ORDER BY start_date_salary DESC LIMIT 1`,
        [id, slot.date, slot.date]
      );
      
      if (salaryRows.length > 0) {
        const salary = salaryRows[0];
        const dailyCost = salary.raw / 22; // Assuming 22 working days per month
        const slotCost = dailyCost / 2; // Each slot is 0.5 day
        
        // Add to project totals
        if (!projectSlots[slot.project_id]) {
          projectSlots[slot.project_id] = {
            id: slot.project_id,
            name: slot.project_name,
            slots: 0,
            cost: 0
          };
        }
        
        projectSlots[slot.project_id].slots += 1;
        projectSlots[slot.project_id].cost += slotCost;
        
        totalCost += slotCost;
        totalSlots += 1;
      }
    }
    
    res.json({
      employee,
      totalCost,
      totalSlots,
      totalDays: totalSlots / 2,
      projects: Object.values(projectSlots),
      slots: slotsRows
    });
    
  } catch (error) {
    console.error('Error fetching employee workload:', error);
    res.status(500).json({ error: 'Failed to fetch employee workload' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
