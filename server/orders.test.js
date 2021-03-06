'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const Order = require('APP/db/models/order');
const app = require('./start');


//THESE TESTS ARE RUN ASSUMING THE DATABASE LOOKS LIKE THE SEED filters

/* IMPLEMENT CUSTOM TESTS FOR EACH ROUTE */
describe('/api/orders', () => {

  beforeEach('Synchronize and clear database', () => {
    return db.sync({force: true});

    })

  describe('Order functionality when not logged in', () => {
    //TODO: eventually only serve this route to logged in Users / Admins
    beforeEach('Add an order', () => {
       return Order.create({
        status: 'Created',
        isActive: true,
        items: [ 100, 102 ]
      })
    })
    //dont mix done and promises, if you take in done, it wont succeeed unless you call that done
    it('GET / Returns all Orders', () => {
        return request(app).get('/api/orders')
       .expect(200)
       .then( (res) => {
       expect(res.body.length).to.equal(1);
       expect(res.body[0]).to.have.property('status', 'Created');
       expect(res.body[0]).to.have.property('isActive', true);
       expect(res.body[0].items).to.include(100, 102);
     })
    })

    it('GET /api/:orderId finds an order', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then( (res) => {
          // expect(res.body.to.)
          expect(res.body.id).to.equal(1);
          expect(res.body.status).to.equal('Created');
        })
    })

    it('PUT /api/:orderId successfully updates an order', () => {
      return request(app)
        .put('/api/orders/1')
        .send({
          isActive: false
        })
        .expect(200)
        .then( (res) => {
          expect(res.body.isActive).to.equal(false);
        })
    })

    it('POST /api/orders successfully creates a  new order', () => {
      return request(app)
        .post('/api/orders')
        .send({
          status: 'Created',
          items: [1, 2, 3]
        })
        .expect(201)
        .then( (res) => {
          expect(res.body.items).to.include(1, 2, 3);
        })
    })

    it('DELETE /api/orders successfully destroys an instance', () => {
      request(app)
        .delete('/api/orders/1')
        .expect(204)
        .then( () => {
          return request(app).get('api/orders/1').expect(404);
        })
    })

    //   EXAMPLE
    // it('POST redirects to the user it just made', () =>
    //   request(app)
    //     .post('/api/orders')
    //     .send({
    //       email: 'eve@interloper.com',
    //       password: '23456',
    //     })
    //     .redirects(1)
    //     .then(res => expect(res.body).to.contain({
    //       email: 'eve@interloper.com'
    //     }))
    // )
  })
})
