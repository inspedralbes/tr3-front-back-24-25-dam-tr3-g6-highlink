import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());


// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
