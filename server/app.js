import express from 'express';

const app = express();
const port = process.env.PORT || 6000;

//Get Welcome Message
app.get('/', (req, res) => {
  res.send('Welcome to Authors Haven');
});

// Get all invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on Port ${port}`);
});

export default app;
