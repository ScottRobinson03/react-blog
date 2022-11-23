const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

if (require.main === module) {
    app.listen(5001, async () => {
        await mongoose.connect("mongodb://127.0.0.1/react-blog", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Listening on port 5001");
    });
}
