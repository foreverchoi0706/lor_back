const express = require("express");
const cors = require("cors");
const navigation = require("./routes/navigations");
const search = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
    origin: ["http://localhost:3000","https://lor.foreverchoi0706.com"]
}));

app.use("/navigation", navigation);
app.use("/search", search);

app.get("/", (_, res) => res.send("lor server"));

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));