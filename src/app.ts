import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import responseTime from 'response-time';
import { corsOptions, createSession } from './config';

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message:
            'Too many accounts created from this IP, please try again after 15 mins.',
    }),
);
app.use(responseTime());

app.use(createSession());

export { app };
