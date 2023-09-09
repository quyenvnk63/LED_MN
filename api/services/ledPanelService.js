const {LedPanel,LedPanelContent,DisplayContent} = require('../models/relations');

async function getAllLedPanels() {
  try {
    const ledPanels = await LedPanel.findAll();
    return ledPanels;
  } catch (error) {
    throw new Error('Failed to fetch LED panels');
  }
}

async function createLedPanel(data) {
  try {
    console.log(data);
    const ledPanel = await LedPanel.create(data);
    return ledPanel;
  } catch (error) {
    throw new Error('Failed to create LED panel');
  }
}

async function updateLedPanel(id, data) {
  try {
    const ledPanel = await LedPanel.findByPk(id);
    if (!ledPanel) {
      throw new Error('LED panel not found');
    }
    await ledPanel.update(data);
    return ledPanel;
  } catch (error) {
    throw new Error('Failed to update LED panel');
  }
}

async function deleteLedPanel(id) {
  try {
    console.log('Deleting LED panel with ID:', id);

    const ledPanel = await LedPanel.findByPk(id);
    console.log('LED panel found:', ledPanel);

    if (!ledPanel) {
      throw new Error('LED panel not found');
    }
    

    await ledPanel.destroy();
    console.log('LED panel deleted successfully');
    return 'LED panel deleted successfully';
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete LED panel');
  }
}


// Get LedPanels by Department ID
async function getLedPanelsByDepartmentId(departmentId){
  try {
    const ledPanels = await LedPanel.findAll({
      where: { department_id: departmentId },
    });
    return ledPanels;
  } catch (error) {
    throw new Error('Failed to get LedPanels by Department ID');
  }
};

async function getLedPanelsByDepartment(departmentId) {
  try {
    const ledPanels = await LedPanel.findAll({
      where: { department_id: departmentId },
      attributes: ['id', 'name', 'address','created_at','device_code'], // Chỉ định các thuộc tính LedPanel cần trả về
      include: [
        {
          model: LedPanelContent,
          as: 'ledPanelContents',
          where: { is_displayed: true },
          include: [
            {
              model: DisplayContent,
              attributes: ['id', 'name', 'path','type'], // Chỉ định các thuộc tính DisplayContent cần trả về
            },
          ],
        },
      ],
    });
    const modifiedLedPanels = ledPanels.map((ledPanel) => {
      const ledPanelContents = ledPanel.ledPanelContents.map((ledPanelContent) => {
        return ledPanelContent.DisplayContent;
      });

      return {
        id: ledPanel.id,
        name: ledPanel.name,
        address: ledPanel.address,
        created_at:ledPanel.created_at,
        device_code:ledPanel.device_code,
        DisplayContent: ledPanelContents[0],
      };
    });

    return modifiedLedPanels;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllLedPanels,
  createLedPanel,
  updateLedPanel,
  deleteLedPanel,
  getLedPanelsByDepartmentId,
  getLedPanelsByDepartment,
};
