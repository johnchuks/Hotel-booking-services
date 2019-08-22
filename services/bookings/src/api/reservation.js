import axios from "axios";
import { Reservation, Room, AccessToken } from "../models";

class Booking {
  static async createReservation(req, res) {
    const { user } = req;
    const { room } = req.query;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const accessToken = await AccessToken.findOne({ where: { uuid: 'booking-1' }});
    const headers = {
      'Content-Type': 'application/json',
      'authorization': accessToken.token
    }
    try {
      const response = await axios.get(
        `${process.env.CUSTOMER_SERV_URL}/get/${user.id}`,
        { headers }
      );
      const authUser = response.data;
      const existingRoom = await Room.findByPk(room);
      if (!existingRoom) {
        return res.status(404).json({
          message: "Room does not exist"
        });
      }
      const existingReservation = await Reservation.findOne({
        where: {
          roomId: room
        }
      });
      if (existingReservation && existingReservation.status === "RESERVED") {
        return res.status(400).json({
          message: "Room has already been reserved"
        });
      }
      let reservation;
      if (user.points >= existingRoom.requiredPoints) {
        try {
          const response = await axios.patch(
            `${process.env.CUSTOMER_SERV_URL}/points/${user.id}`,
            { requiredPoints: existingRoom.requiredPoints },
            { headers }
          );
          reservation =
            response &&
            (await Reservation.create({
              user: authUser.id,
              roomId: existingRoom.id,
              status: "RESERVED"
            }));
        } catch (error) {
          return res.status(400).send({ message: "An error occurred" });
        }
      } else {
        reservation = await Reservation.create({
          user: authUser.id,
          roomId: existingRoom.id,
          status: "PENDING_APPROVAL"
        });
      }
      if (reservation) {
        return res.status(201).send(reservation);
      }
    } catch (error) {
      console.log(error.message)
      return res.status(400).send({ message: "An error occurred" });
    }
  }
}

export default Booking;
