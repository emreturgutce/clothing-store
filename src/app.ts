import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createSession } from './config';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(createSession());

export { app };
