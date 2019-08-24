import { CronJob } from 'cron';
import jwt from 'jsonwebtoken';

import { AccessToken } from '../models';

require("@babel/polyfill");

const createAccessToken = async () => {
  try {
    const existingToken = await AccessToken.findOne({
      where: {
        uuid: 'booking-1'
      }
    });
    const payload = { service: 'booking-service'}
    const token = jwt.sign(
      payload,
      process.env.PRIVATE_JWT_SECRET,
      { expiresIn: "24h" }
    );
    if (existingToken) {
      await existingToken.update({ token });
    } else {
      await AccessToken.create({ token, uuid: 'booking-1' });
    }
  } catch (error) {
      console.log(error)
  }
}

const accessTokenJob = new CronJob(
  '0 0 */23 * * *',
  async () => {
   await createAccessToken();
  });

  export { accessTokenJob, createAccessToken };

