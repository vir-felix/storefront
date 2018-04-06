import express from "express";
import nextApp from "next";

import { appPath, dev } from "./config";

const app = nextApp({ dir: appPath, dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    /* BEGIN EXPRESS ROUTES */
    // This is how to render a masked route with NextJS
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get("*", (req, res) => handle(req, res));

    /* END EXPRESS ROUTES */


    server.listen(4000, (err) => {
      if (err) throw err;
      console.log("> App ready on http://localhost:4000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

export default app;
