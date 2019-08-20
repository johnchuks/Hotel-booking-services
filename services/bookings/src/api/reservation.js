import axios from 'axios';
import { Reservation, Room } from '../models';


class Booking {
  static async createReservation(req, res) {
    const { user } = req;
    const { room } = req.body;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    let response = await axios.get(`${process.env.CUSTOMER_SERV_URL}/get/${user.id}`);
    const existingUser = response.data;
    const existingRoom = await Room.findByPk(room);
    if (!existingRoom) {
      return res.status(404).json({
        message: 'Room does not exist'
      })
    }
    const reservation = await Reservation.findOne({
      where: {
        'roomId': room
      }
    });
    if (reservation.status === 'RESERVED') {
      return res.status(400).json({
        message: 'This Room has been already been reserved'
      })
    }

  }
}

export default Booking;
