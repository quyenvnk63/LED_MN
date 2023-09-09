// Import các model
const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');
const RoleDetail = require('./RoleDetail');
const ResetPassword = require('./ResetPassword');
const LedPanel = require('./LedPanel');
const LedPanelContent = require('./LedPanelContent');
const LedPanelContentHistory = require('./LedPanelContentHistory');
const DisplayContent = require('./DisplayContent');
const Department = require('./Department');
const DepartmentUser = require('./DepartmentUser');


//Thiet lap quan he 
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });
Role.hasMany(RoleDetail, { foreignKey: 'role_id' });
Department.hasMany(DepartmentUser, { foreignKey: 'department_id' });
User.belongsToMany(Department, { through: DepartmentUser, foreignKey: 'user_id' });
// Department.belongsTo(Department, { foreignKey: 'parent_department_id', as: 'parent' });
ResetPassword.belongsTo(User, { foreignKey: 'user_id' });
LedPanel.belongsTo(Department, { foreignKey: 'department_id' });
LedPanelContent.belongsTo(LedPanel, { foreignKey: 'led_panel_id' });
LedPanelContent.belongsTo(DisplayContent, { foreignKey: 'display_content_id'});
LedPanelContentHistory.belongsTo(LedPanel, { foreignKey: 'led_panel_id' });
LedPanelContentHistory.belongsTo(DisplayContent, { foreignKey: 'display_content_id' });
LedPanel.hasMany(LedPanelContent, { foreignKey: 'led_panel_id', as: 'ledPanelContents' });


// Export các model
module.exports = {
    User,
    Role,
    UserRole,
    RoleDetail,
    ResetPassword,
    LedPanelContentHistory,
    LedPanelContent,
    LedPanel,
    DisplayContent,
    DepartmentUser,
    Department
    
  };
  