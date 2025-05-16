import { Schema, model, connect } from 'mongoose';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors'

// loading the .env file to ensure, you can get key
dotenv.config({ path: '../.env' });
const mongoDbKey = process.env.MONGO_DB_KEY;


interface ISponsorFormData {
    address: string;
    email: string;
    phone: string;
    supportType: string;
    amount: string;
    companyName: string;
}

const uri = `mongodb+srv://randomacc12411:${mongoDbKey}@cluster0.y0nio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const sponsorFormDataSchema = new Schema<ISponsorFormData>({
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    supportType: { type: String, required: true },
    amount: { type: String, required: true },
    companyName: { type: String, required: true },
});

const FormDataModel = model<ISponsorFormData>('SponsorFormData', sponsorFormDataSchema);


run().catch(err => console.error('MongoDB connection error:', err));

async function run() {
    console.log('Connecting to the database...');
    await connect(uri);
    console.log('Successfully connected to the database!');
}

const fastify = Fastify({
    logger: true
});

//cors very important else, we wouldn't be able to make a request
await fastify.register(cors, {
    origin: (origin, cb) => {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
        if (!origin || allowedOrigins.includes(origin)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.post('/sendInformation', async (request, reply) => {
    try {
        const data = request.body as ISponsorFormData;
        const newSponsor = new FormDataModel(data);
        await newSponsor.save();
        reply.code(201).send({ success: true, message: 'Sponsor data saved successfully.' });
    } catch (error) {
        console.error('Failed to save sponsor data:', error);
        reply.code(500).send({ success: false, message: 'Failed to save sponsor data.' });
    }
});


fastify.get('/getInformation', async (_request, reply) => {
    try {
        const sponsors = await FormDataModel.find();
        reply.code(200).send(sponsors);
    } catch (error) {
        console.error('Failed to retrieve sponsor data:', error);
        reply.code(500).send({ success: false, message: 'Failed to retrieve sponsor data.' });
    }
});



// Listen on port 3001 for development purposes since vite has 3000 very important.
fastify.listen({ port: 3001 }, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
