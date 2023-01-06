
module.exports = {
  serverMiddleware: [
    {
      path: '/three.module.js',
      handle: (req, res) => {
        res.setHeader('Content-Type', 'application/javascript');
        res.sendFile('./node_modules/three/build/three.module.js');
      }
    }
  ]
};