import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import schema from "./schema";

const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const mongo_uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.6dpsb.gcp.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Notetaking API v1",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
