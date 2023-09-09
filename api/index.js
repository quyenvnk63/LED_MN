// Import Express module
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const {redisClient} = require('./config/redis');
// const { createExampleDepartments } = require('./config/seeders/createData');

//bull queue 
// const { createBullBoard } = require('@bull-board/api');
// const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
// const { ExpressAdapter } = require('@bull-board/express');
const {scheduledContentQueue} = require('./utils/queue');
// const scheduledContentQueue = require('./controllers/scheduleController');

//

//routers 
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const departmentRouter = require('./routes/department');
const roleRouter = require('./routes/role');
const ledPanelRouter = require('./routes/ledPanel');
const displayContentRouter = require('./routes/displayContent');
const schedule = require('./routes/schedule');



require('dotenv').config();


// Create Express app
const app = express();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Set up BullBoard for monitoring queues
// const serverAdapter = new ExpressAdapter();
// serverAdapter.setBasePath('/admin/queues');


// const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
//   queues: [new BullMQAdapter(scheduledContentQueue)], // Use BullMQAdapter for BullMQ queue
//   serverAdapter: serverAdapter,
// });

// app.use('/admin/queues', serverAdapter.getRouter());



//seeder 
// createExampleDepartments();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/departments',departmentRouter); 
app.use('/api/roles',roleRouter);
app.use('/api/led-panels',ledPanelRouter);
app.use('/api/display-content',displayContentRouter);
app.use('/api/schedule',schedule);

// Set up a basic route
// Start the server

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
