//Middleware function to trim a input string
const trimmer = (_req, res, next) => {
    const { body } = _req;
  
    Object.keys(body).forEach(val => {
      if (typeof body[val] === 'string') {
        body[val] = body[val].trim();
      }
    });
    return next();
  };
  
  export default trimmer;
