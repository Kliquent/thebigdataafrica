import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import winston from 'winston';

import authRoutes from './routes/users.js';
import roleRoutes from './routes/roles.js';
import surveyRoutes from './routes/surveys.js';
import questionRoutes from './routes/questions.js';
import optionRoutes from './routes/options.js';
import answerRoutes from './routes/answers.js';
import Analytics from './routes/analytics.js';
import { parseUserAgent } from './utils/parseUserAgent.js';
import { sanitizeUrl } from './utils/sanitizeUrl.js';

const app = express();

dotenv.config();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB connected successfully!'))
	.catch((error) => console.log(error));
app.use(cors('*'));
app.use(express.json()); // used to parse JSON bodies
app.use(express.urlencoded({ limit: '1024mb', extended: true })); // parse URL-encoded bodies

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			json: true,
		}),
	],
});

const morganJSONFormat = () =>
	JSON.stringify({
		method: ':method',
		url: ':url',
		http_version: ':http-version',
		remote_addr: ':remote-addr',
		remote_addr_forwarded: ':req[x-forwarded-for]', // Get a specific header
		response_time: ':response-time',
		status: ':status',
		content_length: ':res[content-length]',
		timestamp: ':date[iso]',
		user_agent: ':user-agent',
	});

app.use(
	morgan(morganJSONFormat(), {
		stream: {
			write: (message) => {
				const data = JSON.parse(message);
				parseUserAgent(data); // Enrich data
				sanitizeUrl(data);
				return logger.info('accesslog', data);
			},
		},
	})
);

// Catch / routes
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to TheBigDataAfrica api endpoint!' });
});

// Routes middleware
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/surveys', surveyRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/options', optionRoutes);
app.use('/api/v1/answers', answerRoutes);
app.use('/api/v1/analytics', Analytics);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	logger.info(`Server listens on *:${PORT}`);
});
