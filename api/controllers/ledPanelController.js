const ledPanelService = require('../services/ledPanelService');
const {validateLedPanelData}  = require('../utils/validationResult');

async function getAllLedPanels(req, res, next) {
  try {
    const ledPanels = await ledPanelService.getAllLedPanels();
    res.json(ledPanels);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}

async function createLedPanel(req, res, next) {

    
  try {
    // validateLedPanelData(req.body);
    const { name, address, department_id, device_code, size } = req.body;
    const data = { name, address, department_id, device_code, size };
    validateLedPanelData(data);
    const ledPanel = await ledPanelService.createLedPanel(data);
    res.status(201).json(ledPanel);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}

async function updateLedPanel(req, res, next) {
  try {
    validateLedPanelData(req.body);
    const { id } = req.params;
    const { name, address, department_id, device_code, size } = req.body;
    const data = { name, address, department_id, device_code, size };
    const ledPanel = await ledPanelService.updateLedPanel(id, data);
    res.json(ledPanel);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}

async function deleteLedPanel(req, res, next) {
  try {
    const { id } = req.params;
    const ledPanelId = parseInt(id, 10);
    const message = await ledPanelService.deleteLedPanel(ledPanelId);
    res.json({ message }); 
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}

async function getLedPanelsByDepartmentId(req, res){
  const { departmentId } = req.params;
  try {
    const ledPanels = await ledPanelService.getLedPanelsByDepartmentId(departmentId);
    res.json(ledPanels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get LedPanels by Department ID' });
  }
};


module.exports = {
  getAllLedPanels,
  createLedPanel,
  updateLedPanel,
  deleteLedPanel,
  getLedPanelsByDepartmentId,
  
};
