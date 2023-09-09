const {LedPanelContentHistory,DisplayContent} = require('../models/relations');
const { Op } = require('sequelize');



async function createScheduledContent(data) {
    try {
      return await LedPanelContentHistory.create(data);
    } catch (error) {
      throw new Error('Failed to create scheduled content');
    }
  }
  
  // Xóa lịch trình nội dung dựa trên ID
  async function deleteScheduledContent(id) {
    try {
      const deletedRows = await LedPanelContentHistory.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new Error('Scheduled content not found');
      }
    } catch (error) {
      throw new Error('Failed to delete scheduled content');
    }
  }
  
  // Lấy danh sách lịch trình dựa trên ledpanelId
  async function getScheduledContentsByLedPanel(ledpanelId, currentTime) {
    try {
      return await LedPanelContentHistory.findAll({
        where: {
          led_panel_id: ledpanelId,
          created_at: { [Op.gt]: currentTime },
        }, 
        include: [
          {
            model: DisplayContent,
        
            attributes: ['name'], // Specify the attributes you want to include from DisplayContent
          },
        ],
      });
    } catch (error) {
      throw new Error("Failed to get getScheduledContentsByLedPanel");
    }
  }

  async function getScheduledContentByLedPanelAndTime(ledpanelId, parsedScheduleTime) {
    try {
      return await LedPanelContentHistory.findOne({
        where: {
          led_panel_id: ledpanelId,
          created_at: parsedScheduleTime,
        },
       
      });
    } catch (error) {
      // Xử lý lỗi tại nơi sử dụng hàm này thay vì ném ra lỗi ở đây
      return null;
    }
  }
  
  
  
  module.exports = {
    createScheduledContent,
    deleteScheduledContent,
    getScheduledContentsByLedPanel,
    getScheduledContentByLedPanelAndTime,
  }
