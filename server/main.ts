import { Schema, model, connect } from 'mongoose';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'path';

// important to get dirname(directory name)
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Adding port
const PORT = parseInt(process.env.PORT || "3000", 10);




// loading the .env file to ensure, you can get key
if (process.env.NODE_ENV !== 'production') {
    const pathToEnv = path.join(__dirname, '../.env');
    dotenv.config({ path: pathToEnv });
}

// Works in both local and Heroku
const mongoDbKey = process.env.MONGO_DB_KEY;
console.log(mongoDbKey);


interface ISponsorFormData {
    address: string;
    email: string;
    phone: string;
    supportType: 'lejrsponsorat' | 'børnesponsorat' | 'foreningsstøtte';
    amount: number;
    companyName: string;
}

const uri = `mongodb+srv://randomacc12411:${mongoDbKey}@cluster0.y0nio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const sponsorFormDataSchema = new Schema<ISponsorFormData>({
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    supportType: {
        type: String,
        required: true,
        enum: ['lejrsponsorat', 'børnesponsorat', 'foreningsstøtte'],
    },
    amount: { type: Number, required: true },
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


// very important for debugging,which gets the current path if the path would end up failing
console.log(path.join(__dirname));

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../dist"),
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
        const rawData = request.body as ISponsorFormData;

        const errors: string[] = [];

        const validateEmail = (email: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        const validatePhone = (phone: string) =>
            /^[0-9+\-\s()]{7,20}$/.test(phone);

        const allowedSupportTypes = ['lejrsponsorat', 'børnesponsorat', 'foreningsstøtte'];

        if (!allowedSupportTypes.includes(rawData.supportType)) {
            errors.push('Invalid support type. Must be one of: lejrsponsorat, børnesponsorat, foreningsstøtte.');
        }

        const parsedAmount = parseInt(rawData.amount as unknown as string, 10);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            errors.push('Amount must be a valid number greater than 0.');
        }

        if (!validateEmail(rawData.email)) {
            errors.push('Invalid email address.');
        }

        if (!validatePhone(rawData.phone)) {
            errors.push('Invalid phone number.');
        }

        ['address', 'companyName'].forEach(field => {
            if (!rawData[field as keyof ISponsorFormData]) {
                errors.push(`${field} is required.`);
            }
        });

        if (errors.length > 0) {
            reply.code(400).send({ success: false, message: 'Validation failed.', errors });
            return;
        }

        const sanitizedData: ISponsorFormData = {
            ...rawData,
            amount: parsedAmount,
        };

        const newSponsor = new FormDataModel(sanitizedData);
        await newSponsor.save();
        reply.code(201).send({ success: true, message: 'Sponsor data saved successfully.' });
    } catch (error) {
        console.error('Failed to save sponsor data:', error);
        reply.code(500).send({ success: false, message: 'Failed to save sponsor data.' });
    }
});



fastify.get('/getInformation', async (_request, reply) => {
    try {
        const sponsors = await FormDataModel.find({}, {
            email: 0,
            phone: 0,
            __v: 0
        });
        reply.code(200).send(sponsors);
    } catch (error) {
        console.error('Failed to retrieve sponsor data:', error);
        reply.code(500).send({ success: false, message: 'Failed to retrieve sponsor data.' });
    }
});


const availablePaths = ["/", "/about-us", "/thanks",  "/contact", "/sponsor"];

// Serving the dist/index.html

availablePaths.map((path) => {
    fastify.get(path, async (_request, reply) => {
        return reply.sendFile('index.html'); // this just looks for dist/index.html
    });

})



// Listen on port 3001 for development purposes since vite has 3000 very important
// Added 0.0.0.0 to ensure no binding issues.
fastify.listen({ port: PORT, host: '0.0.0.0' }, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
