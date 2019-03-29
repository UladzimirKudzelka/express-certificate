import app from './server';

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is starting on port - ${port}`));
