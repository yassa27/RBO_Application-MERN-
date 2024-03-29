const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const Message = require('./models/message.model');


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

var chatSocket = require('socket.io')(
  {
      cors: {
          origins: ['http://localhost:8080']
      }
  }
);
var chatController = require("./controllers/chat.controller");

var chat = chatSocket
    .of('/chat') //API endpoint
    .on('connection', function (socket) {
        chatController.respond(chat,socket);
    });

chatSocket.on('message', (msg) => {
  // Create a message with the content and the name of the user.
  const message = new Message({
    content: msg.content,
    username: msg.username,
  });

  // Save the message to the database.
  message.save((err) => {
    if (err) return console.error(err);
  });
  socket.broadcast.emit('push', msg);
})

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RBO application." });
});


// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/purchaserequest.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//automatic population of database if empty
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'employee' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
module.exports = {app, chatSocket}; 
