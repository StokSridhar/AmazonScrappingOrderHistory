import { Router } from 'express';
import { getPurchaseHistory } from '../controllers/HistoryControllers';
const router = Router();
router.post('/', getPurchaseHistory);
export default router;