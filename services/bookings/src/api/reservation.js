import axios from 'axios';
import { Reservation, Room } from '../models';


class Booking {
  static async createReservation(req, res) {
    const { user } = req;
    const { room } = req.body;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    let response = await axios.get(`${process.env.CUSTOMER_SERV_URL}/get/${user.id}`);
    const authUser = response.data;
    if (authUser.id) {
      const existingRoom = await Room.findByPk(room);
      if (!existingRoom) {
        return res.status(404).json({
          message: 'Room does not exist'
        })
      }
      const existingReservation = await Reservation.findOne({
        where: {
          'roomId': room
        }
      });
      if (existingReservation && existingReservation.status === 'RESERVED') {
        return res.status(400).json({
          message: 'This Room has been already been reserved'
        })
      }
      let reservation;
      if (authUser.points >= existingRoom.requiredPoints) {
          const response = await axios.patch(
            `${process.env.CUSTOMER_SERV_URL}/points/${user.id}`,
              { requiredPoints: existingRoom.requiredPoints }
            )
          reservation = response.status === 200 && await Reservation.create({ 
            user: authUser.id,
            roomId: existingRoom.id,
            status: 'RESERVED'
          })
      } else {
        reservation = await Reservation.create({ 
          user: authUser.id,
          roomId: existingRoom.id,
          status: 'PENDING_APPROVAL'
        });
      }
      if (reservation) {
        return res.status(201).send(reservation);
      }
    }

  }
}

export default Booking;
