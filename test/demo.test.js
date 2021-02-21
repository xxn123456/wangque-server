const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app.js');

describe('user_api', () => {
    
    it('getUser', (done) => {
        
        var user = {
            mobileNo: '10086',
            password: 111
        }
        request(app.listen())
            .post('/login')
            .send(user)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect(200)                        //断言状态码为200
            .end((err, res) => {

                console.log(res.body);
            
                done();
            });
    })

})