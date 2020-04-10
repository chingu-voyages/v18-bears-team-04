import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const baseUrl = '/api/v1';

chai.use(chaiHttp);

describe('LOGIN CONTROLLER TEST', () => {
  it('should return an error if email is not in the database', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'tes@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { errors } = res.body;
        expect(res).to.be.a('object');
        expect(errors.body[0]).to.be.equal('invalid email address');
        done();
      });
  });
  it('should return successfull message if user exist', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'favorrmemr@gmail.com' })
      .end((err, res) => {
        const { data } = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(data).to.be.a('object');
        done();
      });
  });
});
