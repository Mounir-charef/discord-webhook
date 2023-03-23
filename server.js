require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send(`
        <html lang="en">
            <head><title>Success boi!</title></head>
            <body>
                <h1>Zaaamn daniel</h1>
                <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
            </body>
        </html>
    `));


app.post("/github", (req, res) => {
    console.log(req.body)
    action = req.body.action
    const content = `:wave: sup nigs! ${req.body.sender.login} just ${action} to/from ${req.body.repository.full_name}!`;
    const avatarUrl = action === 'started' ? "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif" : "https://media.giphy.com/media/W0c3xcZ3F1d0EYYb0f/giphy.gif"
    axios
        .post(process.env.DISCORD_WEBHOOK_URL, {
            content: content,
            embeds: [
                {
                    image: {
                        url: avatarUrl,
                    },
                },
            ],
        })
        .then((discordResponse) => {
            console.log("Success!");
            res.status(204).send(discordResponse);
        })
        .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.use((error, req, res, next) => {
    res.status(500)
    res.send({error: error})
    console.error(error.stack)
    next(error)
})

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);