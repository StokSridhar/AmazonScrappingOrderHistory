import express from 'express';
import purchaseHistoryRouter from './routes/History';
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use('/api/purchase-history', purchaseHistoryRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});