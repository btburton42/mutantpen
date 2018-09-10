function init(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello',
    }),
  };
}


module.exports = {
  init
}