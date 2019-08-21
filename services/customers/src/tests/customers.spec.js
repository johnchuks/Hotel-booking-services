import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../bin/www';
import { Customer } from '../models';

const { expect } = chai;
const createUser = (user) => Customer.create(user);
chai.use(chaiHttp);
let register = {};
let login = {};
let user;
describe('CUSTOMER SERVICE', () => {
  beforeEach(async () => {
    register = {
      firstName: 'vincent',
      lastName: 'hamza',
      password: '12345678',
      email: 'frank@gmail.com',
      points: 230
    };

    user = await createUser(register);

    login = {
      password: '12345678',
      email: 'frank@gmail.com',
    };
  });

  afterEach(async () => {
    await Customer.destroy({ truncate: true, cascade: true });
  });

  describe('Log in', () => {
    it('should not login user if info is invalid', async () => {
      login.password = '1234567';
      const res = await chai
        .request(app)
        .post('/login')
        .send(login);
      expect(res.body).to.be.an('object');
      expect(res.status).to.equal(401)
      expect(res.body.message).to.be.a('string');
      expect(res.body.message).to.include('Please ensure you have entered a valid email address and password.');
    });

    it('should login user if info is valid', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send(login);
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object');
      expect(res.body.user.email).to.include(login.email);
    });

    it('Should not login user with non-existent email', async () => {
      const res = await chai.request(app).post('/login').send({
        ...login,
        email: 'frank@john.com',
      });
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal(
        'The credentials you entered are not any account on the system'
      );
    });
  });
  describe('Update bonus point', () => {
    it('Should update the bonus point for a user', async () => {
      const res = await chai
        .request(app)
        .patch(`/points/${user.id}`)
        .send({ requiredPoints: 100 })
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Points successfully deducted')
      expect(res.body.points).to.equal(130)
    })
  })
  it('Should not deduct points if user does not exist', async() => {
    const res = await chai
        .request(app)
        .patch(`/points/${100}`)
        .send({ requiredPoints: 100 })
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('User does not exist')
  })
  it('Should not deduct points if user does not have required amount of points', async() => {
    const res = await chai
        .request(app)
        .patch(`/points/${user.id}`)
        .send({ requiredPoints: 900 })
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('User does not have the required points');
  })
});
