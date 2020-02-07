import { Router } from 'express';
import TourCtrl from '../controllers/tourController'

const tourRouter = Router();
const tourCtrl = new TourCtrl();

tourRouter.get('/:id', tourCtrl.get);
tourRouter.get('/', tourCtrl.getAll);
tourRouter.post('/', tourCtrl.create);
tourRouter.post('/:id/submit', tourCtrl.submit);
tourRouter.post('/:id/approve', tourCtrl.approve);
tourRouter.post('/:id/reject', tourCtrl.reject);
tourRouter.post('/:id/inquire', tourCtrl.inquire);
tourRouter.post('/:id/add-info', tourCtrl.addInfo);
tourRouter.put('/:id', tourCtrl.edit);

export default tourRouter;
