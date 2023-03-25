import express from 'express';
import path from 'path';
import {
  fileURLToPath,
} from 'url';
import bodyParser from 'body-parser';

import homepageRouter from './src/routes/homepage-router.mjs';
import tripRouter from './src/routes/trip-router.mjs';
import formRouter from './src/routes/form-router.mjs';
import registrationRouter from './src/routes/registration-router.mjs';
import utilities from './src/services/database-manager.mjs';

const __filename = fileURLToPath(
  import.meta.url,
);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');
app.use(bodyParser());

app.use((req, res, next) => {
  res.locals.server_state = req.server_state;
  next();
});

app.use('/', express.static(path.join(__dirname, 'src', 'public')));

function logger(req, res, next) {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  dd = String(dd).padStart(2, '0');
  mm = String(mm).padStart(2, '0');

  const has_an_incorrect_extension = req.originalUrl.match(/\.(css|mjs|ico)$/i);
  if (has_an_incorrect_extension) {
    next();
    return;
  }

  console.log(`Żądanie nastąpiło w dniu ${dd}/${mm}/${yyyy}`);

  if (dd === '16' && mm === '04') {
    res.locals.server_state = 'Trwa przerwa w pracy serwera';
    res.render('data');
    return;
  }

  res.locals.server_state = 'Dzisiaj serwer działa';
  next();
}

app.use(logger);

app.use((req, res, next) => {
  if (utilities.allTrips.length === 0) {
    next('Przepraszamy, obecnie nie ma dostępnych żadnych wycieczek');
  } else {
    next();
  }
});

app.use('/data', (req, res) => {
  res.render('data');
});

app.use('/wycieczka', tripRouter);
app.use('/strona-glowna', homepageRouter);
app.use('/formularz-rezerwacji', formRouter);

app.use('/formularz', registrationRouter);

app.use('/', homepageRouter);

app.use((req, res, next) => {
  next('Nieprawidłowy adres strony');
});

app.use((err, req, res, next) => {
  res.status(404).render('error', { error: err });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
