const express = require('express')
const next = require('next')
const compression = require('compression')

const getAzureData = require('./cloud-data/azure')
const getAWSData = require('./cloud-data/aws')

const cors = require('cors');
const bodyParser = require('body-parser');
const configureStripe = require('stripe');
// const stripe = configureStripe('pk_test_CxirylwEmIxObJVBNBKrQylD');

const stripe = configureStripe('sk_test_mH5CXHAO0wPG0r2fC95BmRiR');

const port = parseInt(process.env.PORT, 10) || 3003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(compression())

    server.use(cors());

    server.get("/azure", async (req, res, next) => {
      try {
        const data = await getAzureData();
        res.json(data);
      } catch (error) {
        next(error);
      }
    });

    server.get("/aws", async (req, res, next) => {
      try {
        const awsData = await getAWSData();
        res.json(awsData);
      } catch (error) {
        next(error);
      }
    });

    server.use(bodyParser.json());

    server.get('/about', (req, res) => {
      return app.render(req, res, '/about', req.query)
    })
    server.get('/forgot', (req, res) => {
      return app.render(req, res, '/forgot', req.query)
    })

    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })

    server.get('/user/*', (req, res) => {
      return app.render(req, res, '/user', { id: req.params.id })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const postStripeCharge = res => (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else {
        res.status(200).send({ success: stripeRes });
      }
    }

    server.post('/payment', (req, res) => {
      console.log(' post data ', req.body)
      stripe.charges.create(req.body, postStripeCharge(res))
      // res.send(JSON.stringify({ status: true, message : 'ss s'}))
      // stripe.charges.create(req.body, postStripeCharge(res));
    });


    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

  });
