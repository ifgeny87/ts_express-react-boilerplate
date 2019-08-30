import express, { Request, Response } from 'express';

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.static('./public'));

app.use('/api/ping', (req: Request, res: Response) => res.json({
    pong: new Date().toUTCString()
}));

app.listen(PORT, (err: any) => {
    if (err) {
        global.console.error('🔴 Error while listening webserver', err)
    } else {
        global.console.log(`🌎 Listening to http://localhost:${PORT}`)
    }
});
