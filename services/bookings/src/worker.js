const Queue = require('bull');

const REDIS_URL = process.env.REDIS_URL;

console.log(REDIS_URL, '====S=S==S=S=S===S')
let emailQueue = new Queue('email', REDIS_URL);

emailQueue.process(function (job, done) {
  const { user, room } = job.data
    try {
      console.log('Processing via email queue');
      console.log(`${user.firstName} ${user.lastName} just made a reservation for ${room}`);
      done();
    } catch (err) {
      console.log(err.message);
    }
});

export default emailQueue;
