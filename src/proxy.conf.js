const serverTarget = 'http://localhost:3000';
module.exports = [{
  context: ['/api/**'],
  target: serverTarget,
  changeOrigin: true
}];
