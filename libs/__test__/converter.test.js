const converter = require('./../converter');

describe('test', () => {
  it('should return a valid message', () => {
    let body = converter.init().body
    expect(JSON.parse(body).message).toEqual('hello')
  })
})