import { http } from "@ampt/sdk";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send({
    success: true,
  });
});

app.post("/", async (req, res) => {
  console.log("hooked2", req.body);
  if (req.body.token !== process.env.TOKEN) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  await fetch("https://rw.vestaboard.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Vestaboard-Read-Write-Key": process.env.VESTABOARD_KEY,
    },
    body: JSON.stringify({
      text: req.body.text,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));

  res.send({
    success: true,
  });
});

http.node.use(app);
