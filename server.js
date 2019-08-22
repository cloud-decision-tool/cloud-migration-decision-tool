const express = require('express')
const next = require('next')
const compression = require('compression')

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



  // const FRONTEND_DEV_URLS = [ 'http://localhost:3003' ];
  // const FRONTEND_PROD_URLS = [
  //   'http://www.touchon.com.au',
  //   'http://touchon.com.au'
  // ];
  // const CORS_WHITELIST = process.env.NODE_ENV === 'production'? FRONTEND_PROD_URLS: FRONTEND_DEV_URLS;
  // const corsOptions = {
  //   origin: (origin, callback) =>
  //     (CORS_WHITELIST.indexOf(origin) !== -1)
  //       ? callback(null, true)
  //       : callback(new Error('Not allowed by CORS'))
  // };

  // server.use(cors(corsOptions));

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
