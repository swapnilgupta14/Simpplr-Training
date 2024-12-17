const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3010;
const DATA_FILE = path.join(__dirname, "users.json");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Connected! ");
});

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

app.get("/allUsers", async (req, res) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

app.post("/newUser", async (req, res) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      ...req.body,
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (index !== -1) {
      // Replace entire user object
      users[index] = { id: users[index].id, ...req.body };
      await writeUsers(users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      await writeUsers(users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const filteredUsers = users.filter((u) => u.id !== parseInt(req.params.id));

    if (filteredUsers.length < users.length) {
      await writeUsers(filteredUsers);
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
