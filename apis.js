module.exports = [
  {
    context: ['/api', '/reverse'],
    options: {
      secure: false,
      changeOrigin: true,
      target: 'https://photon.komoot.io',
    },
  },
  {
    context: ['/driving'],
    options: {
      secure: false,
      changeOrigin: true,
      target: 'https://router.project-osrm.org/route/v1',
    },
  },
  {
    context: ['/*/tile/**'],
    options: {
      secure: false,
      changeOrigin: true,
      pathRewrite: (path) => path.replace(/\/.\/tile/, ''),
      target: 'https://{s}.tile.openstreetmap.org',
      router: (req) => {
        const subDomain = req.url.split('/')[1];
        return `https://${subDomain}.tile.openstreetmap.org`;
      },
    },
  },
];
