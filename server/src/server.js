const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", blogRouter);

if (require.main === module) {
    app.listen(5001, async () => {
        await mongoose.connect("mongodb://127.0.0.1/react-blog", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Listening on port 5001");
    });
}
