const Queue = require('bull');
const { setDisplayedContentForLedPanelOverloaded } = require('../controllers/displayContentController');
const { redisClient } = require('../config/redis');

// console.log(redisClient.connect());
// Create the Bull queue instance with the Redis client
const scheduledContentQueue = new Queue('scheduled-content', {
  redis: {
    client: redisClient,
  },
});

console.log(redisClient);
// Process the job in the queue
scheduledContentQueue.process(async (job) => {
  const { ledPanelId, displayContentId } = job.data;
  try {
    // Process the job's task here
    await setDisplayedContentForLedPanelOverloaded(ledPanelId, displayContentId);
    // If successful, remove the job from the queue
    await job.remove();
    console.log(`Job completed: ${job.id}`);
  } catch (error) {
    // Move the job to the failed state if an error occurs during processing
    console.error(`Job failed with error: ${error}`);
    job.moveToFailed({ message: error.message });
  }
});

async function removeJobByDataId(ID){
  try {
    // Xử lý công việc ở đây
    const jobs = await scheduledContentQueue.getJobs(['waiting', 'delayed']);
    const job = jobs.find(job => job.data && job.data.id === parseInt(ID));

    if (!job) {
      throw new Error('Job not found');
    }
  
    // Xóa công việc
    await job.remove();

    // Nếu thành công, xóa công việc khỏi hàng đợi
    console.log(`Job completed: ${job.id}`);
  } catch (error) {
    // Di chuyển công việc vào trạng thái "failed" nếu có lỗi xảy ra trong quá trình xử lý
    console.error(`Job failed with error: ${error}`);
    job.moveToFailed({ message: error.message });
  }};



async function checkWaitingJobs() {
  const waitingJobs = await scheduledContentQueue.getWaiting();
  console.log('Waiting jobs:', waitingJobs);
}


// Listen for job failed event
scheduledContentQueue.on('failed', (job, err) => {
  console.error(`Job failed with error: ${err}`);
});

// Listen for job completed event
scheduledContentQueue.on('completed', (job) => {
  console.log('Job completed:', job.id);
});

// Listen for job removed event
scheduledContentQueue.on('removed', (job) => {
  console.log('Job removed:', job.id);
});

scheduledContentQueue.on('connecting', (job) => {
  console.log('connecting');
});

module.exports = {scheduledContentQueue,removeJobByDataId};
