
const { DepartmentUser,Department,LedPanel } = require('../models/relations');

async function createDepartment(departmentData) {
  try {
    // console.log(departmentData);
    const department = await Department.create(departmentData);
    return department;
  } catch (error) {
    throw error;
  }
}

//assign department to user

async function assignDepartmentToUser(userid, departmentid) {
  try {
    const [departmentUser, created] = await DepartmentUser.findOrCreate({
      where: {
        user_id: userid,
        department_id: departmentid,
      },
      defaults: {
        user_id: userid,
        department_id: departmentid,
      },
      attributes: ['id', 'user_id', 'department_id', 'created_at', 'updated_at'], // Chỉ lấy các cột có sẵn trong bảng
    });
    
    if (!created) {
      throw new Error('User already in the department');
    }

    return departmentUser;
  } catch (error) {
    throw error;
  }
}

 

async function getDepartmentsByUserId(userId) {
  try {
    const departments = await Department.findAll({
      include: [
        {
          model: DepartmentUser,
          where: { user_id: userId },
          attributes: [],
        },
      ],
      attributes: ['id', 'name', 'address', 'deleted_at', 'created_at', 'updated_at', 'status'],
    });

    return departments;
  } catch (error) {
    throw new Error('Failed to get departments');
  }
}

  // get department by department_id 
  async function getDepartmentById(department_id) {
    try {
      const department = await Department.findByPk(department_id);
      if (department == null){
        console.log(2);
      }
      return department;
    } catch (error) {
      throw new Error('Failed to get department');
    }
  }
  //  get all department
  async function getAllDepartment() {
    try {
      console.log(1);
      const department = await Department.findAll();
      return department;
    } catch (error) {
      throw new Error('Failed to get departments');
    }
  }
  
  // UPDATE
  async function updateDepartment(department_id, updatedDepartmentData) {
    try {
      const department = await Department.findByPk(department_id);
      if (department) {
        await department.update(updatedDepartmentData);
        return department;
      }
      throw new Error('Department not found');
    } catch (error) {
      throw new Error('Failed to update departments');
    }
  }
  
  // DELETE
  async function deleteDepartment(department_id) {
    try {
      const department = await Department.findByPk(department_id);
      if (department) {
        department.updated_at = new Date();
        await department.destroy();
        return 'Department deleted successfully';
      } else {
        throw new Error('Department not found');
      }
    } catch (error) {
      throw new Error('Failed to delete department');
    }
  }
  

module.exports = {
  createDepartment,
  getDepartmentsByUserId,
  getDepartmentById,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
  assignDepartmentToUser,
};
