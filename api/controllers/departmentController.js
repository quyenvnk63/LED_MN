const departmentService = require('../services/departmentService');
const { validationResult } = require('express-validator');
const ledPanelService = require('../services/ledPanelService');

// Tạo một phòng ban mới
async function createDepartment(req, res) {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const departmentData = {...req.body};
    // console.log(departmentData);
    const department = await departmentService.createDepartment(departmentData);

    res.status(201).json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// add user to department
async function assignDepartmentToUser(req,res) {
  try {
    const departmentid = req.params.id;
    const userid = req.body.userId;

    await departmentService.assignDepartmentToUser(userid, departmentid);

    res.status(200).json({message: 'user assigned successfully'});
  }catch (error) {
    res.status(500).json({error:error.message});
  }
}


//get department by department_id 

async function getDepartmentById(req, res) {
  try {
    const departmentId = req.params.departmentId;
    const department = await departmentService.getDepartmentById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllDepartments(req, res) {
  try {
    const departments = await departmentService.getAllDepartment();
    res.json( departments );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

// Cập nhật thông tin phòng ban
async function updateDepartment(req, res) {
  try {
    const departmentId = req.params.departmentId;
    const updatedDepartmentData = { ...req.body };
    const department = await departmentService.updateDepartment(departmentId, updatedDepartmentData);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Xóa phòng ban
async function deleteDepartment(req, res) {
  try {
    const departmentId = req.params.departmentId;
    const result = await departmentService.deleteDepartment(departmentId);

    if (result === 'Department deleted successfully') {
      return res.json({ message: 'Department deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getLedPanelsByDepartment(req, res) {
  const departmentId = req.params.departmentId;
  console.log(departmentId);
  try {
    const ledPanels = await ledPanelService.getLedPanelsByDepartment(departmentId);
    res.json(ledPanels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports = {
  createDepartment,
  // getDepartmentsByUserId,
  getDepartmentById,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  assignDepartmentToUser,
  getLedPanelsByDepartment,
  
};
