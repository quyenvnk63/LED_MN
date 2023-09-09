const scheduleService= require('../services/scheduleService');
const displayContentService = require('../services/displayContentService');
const {scheduledContentQueue,removeJobByDataId} = require('../utils/queue');
const {uuidToInt} = require('../utils/uuidInt');




// Tạo lịch trình cho nội dung
// Chuyển đổi chuỗi định dạng 'YYYY-MM-DDTHH:mm:ss.sssZ' thành đối tượng Date
function parseISODate(dateString) {
    return new Date(dateString);
  }
  
  // Hàm tạo lịch trình
  async function scheduleDisplayContent(req, res) {
    const { displayContentId, ledPanelId, startTime, endTime } = req.body;
  
    try {
      // Parse startTime and endTime to Date objects
      const parsedStartTime = parseISODate(startTime);
      const parsedEndTime = parseISODate(endTime);
  
      // Get display content information
      const displayContent = await displayContentService.getDisplayContentById(displayContentId);
  
      if (!displayContent) {
        return res.status(404).json({ error: 'DisplayContent not found' });
      }
  
      const currentTime = new Date().getTime();
      const scheduleTimestamp = parsedStartTime.getTime();
      const delayTime = Math.max(0, scheduleTimestamp - currentTime);
  
      const isDuplicate = await scheduleService.getScheduledContentByLedPanelAndTime(ledPanelId, parsedStartTime);
  
      if (isDuplicate) {
        return res.status(400).json({ error: 'Duplicate schedule with the same delay time and ledPanelId' });
      }
  
      // Generate an ID and prepare data for scheduling
      const id = await uuidToInt();
      const data = {
        id,
        led_panel_id: ledPanelId,
        display_content_id: displayContentId,
        created_at: parsedStartTime,
        end_time: parsedEndTime, // Include the endTime in the data
      };
  
      // Add the scheduled content to the queue with a delay
      scheduledContentQueue.add(
        {
          id,
          ledPanelId: ledPanelId,
          displayContentId: displayContentId,
        },
        {
          delay: delayTime,
        }
      ).then(() => {
        console.log('Queued content added');
      });
  
      // Create the scheduled content entry
      const scheduledContent = await scheduleService.createScheduledContent(data);
  
      res.json(scheduledContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
// Xóa lịch trình dựa trên ID
async function deleteScheduledContent(req, res) {
  const { id } = req.params;

  try {

    const job = await removeJobByDataId(id);
    // Remove the job from the queue

    // Now that the job is removed from the queue, you can proceed to delete the related content in your database
    await scheduleService.deleteScheduledContent(id);

    res.json({ message: 'Scheduled content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


  
  async function getScheduledContentsByLedPanel(req, res) {
    const { ledpanelId } = req.params;
  
    try {
      // Get the current time
      const currentTime = new Date();
  
      // Call the scheduleService function to get scheduled contents
      const scheduledContents = await scheduleService.getScheduledContentsByLedPanel(ledpanelId, currentTime);
  
      // Get the pending jobs from the queue
      const pendingJobs = await scheduledContentQueue.getDelayed();
      console.log('Pending jobs:', pendingJobs); // Logging pending jobs
  
      res.json(scheduledContents);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    scheduleDisplayContent,
    deleteScheduledContent,
    getScheduledContentsByLedPanel,
}



