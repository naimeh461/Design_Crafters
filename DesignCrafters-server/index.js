const express = require("express")
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY)
app.use(cors())
app.use(express.json())


//  ---------------------------------------------
//  Verify JWT  token for user validation
//  ---------------------------------------------
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'no authorization header is send' })
  }
  // if token  in send in headers.authorization the splite it by bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: true, message: 'token is not valid' })
    }
    req.decoded = decoded;
    next();
  })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tktqebe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// //  send payment confirmation email
const sendPaymentConfirmationEmail =  payment => {
  transporter.sendMail({
    from: "SENDER_EMAIL", // verified sender email
    to: payment.email, // recipient email
    subject: "Your Order is confirmed.Enjoy the food soon.", // Subject line
    text: "Hello world!", // plain text body
    html: "<b>Hello world!</b>", // html body
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 
}

async function run() {
  try {

    //  ----------------------
    //  database connection 
    //  ---------------------
    const userCollection = client.db("designCrafters").collection("users");
    const classCollection = client.db("designCrafters").collection("classes");
    const instructorCollection = client.db("designCrafters").collection("instructors");
    const cardCollection = client.db("designCrafters").collection("classInCard");
    const paymentsCollection = client.db("designCrafters").collection("payment");
    const reviewCollection = client.db("designCrafters").collection("review");


    //  ----------------------
    //  jwt related api 
    //  ---------------------
    // send the jwt token when user log in or register
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.send({ token });
    })


    //  ----------------------------------------------
    //  verify  middleware  & user verify related api
    //  ----------------------------------------------

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next()
    }

    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await userCollection.findOne(query);
      if (user?.role !== "instructor") {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next()
    }

    const verifyStudent = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await userCollection.findOne(query);
      if (user?.role !== "student") {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next()
    }

    //  ----------------------
    //  user role verification
    //  ---------------------
    //verify admin 
    app.get('/users/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email
      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === 'admin' }
      res.send(result);
    })

    // verify user student or not
    app.get('/users/student/:email', verifyJWT, async (req, res) => {
      const email = req.params.email
      if (req.decoded.email !== email) {
        res.send({ student: false })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { student: user?.role === 'student' }
      res.send(result);
    })

    // verify user instructor or not
    app.get('/users/instructor/:email', verifyJWT, async (req, res) => {
      const email = req.params.email
      if (req.decoded.email !== email) {
        res.send({ instructor: false })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { instructor: user?.role === 'instructor' }
      res.send(result);
    })



    // user is post to mongodb server
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUsers = await userCollection.findOne(query);
      if (existingUsers) {
        return res.send
      }
      const result = await userCollection.insertOne(user)
      res.send(result)

    })

    app.get("/userInfo", verifyJWT,  async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ error: true, message: 'invalid email' })
      }
      const query = { email: email }
      const result = await userCollection.findOne(query);
      res.send(result);
    })
    //  ----------------------------------------------
    //  admin related function
    //  ----------------------------------------------


    //find all user for admin
    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    //find all course for admin
    app.get("/courses", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await classCollection.find().toArray();
      res.send(result)
    })


    app.patch("/updateUser", verifyJWT, verifyAdmin, async (req, res) => {
        const id = req.body.value.id;
        const filter = { _id: new ObjectId(id) }
        const updateRole = req.body.value.role;
        console.log(id,updateRole);
        const updateDoc = {
          $set: {
            role: updateRole
          }
        }
        const setRole = await userCollection.updateOne(filter, updateDoc)
        if(updateRole === "instructor"){
          const instructor = req.body.instructor;
          const setInstructor = await instructorCollection.insertOne(instructor)
        }
        res.send({setRole});

    })


    app.patch("/updateCourseStatus", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.body.id;
      const filter = { _id: new ObjectId(id) }
      const updateStatus = req.body.status;
      const updateDoc = {
        $set: {
          status: updateStatus
        }
      }
      const result = await classCollection.updateOne(filter, updateDoc)
      res.send(result);

    })

    app.patch("/updateFeedBack", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.body.id;
      console.log(req.body);
      const filter = { _id: new ObjectId(id) }
      const updateFeedback = req.body.feedback;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          feedback: updateFeedback
        }
      }
      const result = await classCollection.updateOne(filter, updateDoc, options)
      res.send(result);

    })



    //  ----------------------
    //  Instructor related api 
    //  ---------------------
    //add a class by Instructor
    app.post("/classes", verifyJWT, verifyInstructor, async (req, res) => {
      const newCourse = req.body;
      const result = await classCollection.insertOne(newCourse)
      res.send(result);

    })

    //get instructor classes
    app.get("/classes/:email", verifyJWT, verifyInstructor, async (req, res) => {
      const email = req.params.email
      const query = { email: email }
      const result = await classCollection.find(query).toArray();
      res.send(result);
    })


     //  ----------------------
    //  student related api 
    //  ---------------------
    // post classes when student click add to card button
    app.post("/cardCollection", verifyJWT, verifyStudent, async (req, res) => {
      const cardCourse = req.body;
      const result = await cardCollection.insertOne(cardCourse);
      res.send(result);
    })


    // get classes collection by user email
    app.get("/cardCollection", verifyJWT, async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ error: true, message: 'invalid email' })
      }
      const query = { email: email }
      const result = await cardCollection.find(query).toArray();
      res.send(result);
    }
    )

    //delete card by click delete button 
    app.delete("/cardDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await cardCollection.deleteOne(query);
      res.send(result);
    })


    //  ----------------------
    //  classes related api 
    //  ---------------------

    //find all classes
    app.get('/allClasses', async (req, res) => {
      const query = { status: "approved" }
      const result = await classCollection.find(query).sort({ enroll: -1 }).toArray();
      res.send(result);
    })

    //find 6 classes
    app.get('/classes', async (req, res) => {
      const query = { status: "approved" }
      const result = await classCollection.find(query).sort({ enroll: -1 }).limit(6).toArray();
      res.send(result);
    })


    //  ----------------------
    //  instructor related api 
    //  ---------------------

    app.get('/instructor', async (req, res) => {
      const result = await instructorCollection.find().sort({ student: -1 }).limit(6).toArray();
      res.send(result);
    })

    app.get('/allInstructor', async (req, res) => {
      const result = await instructorCollection.find().sort({ student: -1 }).toArray();
      res.send(result);
    })


   




    //  ----------------------
    //  payment related api 
    //  ---------------------

   
    //create payment intent
    app.post("/create-payment-intent", verifyJWT , verifyStudent, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      });
    })

    //payment info store in data base
    app.post('/payments', verifyJWT, verifyStudent, async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentsCollection.insertOne(payment);

      const query = { _id: new ObjectId(payment.classId) }
      const deleteResult = await cardCollection.deleteOne(query)

      const filter = { _id: new ObjectId(payment.course) }
      const updateDoc = {
        $inc: {
          available_seats: -1,
          enroll: 1
        },
      };
      const updateClass = await classCollection.updateOne(filter, updateDoc)
      console.log(payment.instructor)
      const filter2 = { name: payment.instructor }
      const updateDoc2 = {
        $inc: {
          student: 1
        },
      };
      const updateStudent = await instructorCollection.updateOne(filter2, updateDoc2)

      res.send({ insertResult, deleteResult, updateClass, updateStudent })
    })


    // payment data loading by user email
    app.get("/paymentCollection", verifyJWT,  async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([])
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ error: true, message: 'unauthorized access' })
      }
      const query = { email: email }
      const result = await paymentsCollection.find(query).sort({ _id: -1 }).toArray();
      res.send(result);
    })

    //  ----------------------
    //  review related api 
    //  ---------------------
    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })

    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    })

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {

    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("design is running")
})

app.listen(port, () => {
  console.log(`Design is here on port ${port}`)
})