import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO } from 'date-fns';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: v4(),
    provider,
    date,
  };

  appointments.push(appointment);

  response.json(appointment);
});

export default appointmentsRouter;
