import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// const appointmentsRepository = new AppointmentsRepository();
const appointmentsRouter = Router();

// SoC: Separation of Concerns
// DTO: Data Transfer Object
// Rota: Receber requisição, chamar outro arquivo e devolver resposta (nada mais)

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  /**
   * the user id is now available in every route due to the ensureAuthenticated middleware
   * console.log(request.user);
   */
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  // const createAppointment = new CreateAppointmentService(
  //   appointmentsRepository,
  // );
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
