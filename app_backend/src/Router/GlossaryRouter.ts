import { Router } from 'express';
import GlossaryController from '../Controller/GlossaryController';
const router = Router();

router.get('/glossary/:id', GlossaryController.getSingleGlossaryById);
router.get('/admin/glossary/:id', GlossaryController.getSingleGlossaryById);

export default router;
