import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import nock from 'nock';
import { app } from '../bin/www';
import { Reservation, Room } from '../models';

const { expect } = chai;
const createReservation = (reservation) => Reservation.create(reservation);
const createRoom = (room) => Room.create(room);

const userDetails = {
    "id": 7,
    "firstName": "John",
    "lastName": "James",
    "email": "john@yahoo.com",
    "points": 500,
    "createdAt": "2019-08-21T10:12:45.882Z",
    "updatedAt": "2019-08-21T10:12:45.882Z"
}
const createToken = (user) => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
chai.use(chaiHttp);
let room1, room2;
let register, register2;
let token
describe('BOOKING SERVICE', () => {
  before(async() => {
    token = createToken(userDetails);
  })
  beforeEach(async () => {
    register = {
      name: 'Economy single room',
      price: 40,
      requiredPoints: 100,
    };
    register2 = {
      name: 'Economy doublee room',
      price: 80,
      requiredPoints: 2000,
    }
     room1 = await createRoom(register);
     room2 = await createRoom(register2);
     nock(process.env.CUSTOMER_SERV_URL)
      .get(`/get/${userDetails.id}`)
      .reply(200, {
        data: {
            ...userDetails
        }
      })
      nock(process.env.CUSTOMER_SERV_URL)
      .patch(`/points/${userDetails.id}`)
      .reply(200)
  });

  afterEach(async () => {
    await Room.destroy({ truncate: true, cascade: true });
    await Reservation.destroy({ truncate: true, cascade: true });
  });

  describe('Create Reservations', () => {
    it('should create a new reservation for the user with RESERVED status', async () => {
      const res = await chai
        .request(app)
        .post(`/reserve?room=${room1.id}`)
        .send()
        .set({ 'authorization': token })
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('RESERVED')
    })
    it('Should create a new reservation with status of Pending approval', async () => {
      const res = await chai
        .request(app)
        .post(`/reserve?room=${room2.id}`)
        .send()
        .set({ 'authorization': token })
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('PENDING_APPROVAL')
    });
  });
});
