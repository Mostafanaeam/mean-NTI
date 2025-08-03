// let fs=require('fs')
const todoModel = require("../model/todo");
let gettodo = async (req, res) => {
  try {
    const todos = await todoModel.find().populate("id");
    res.json(todos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  // console.log("hello from get");
  // var todo = JSON.parse(fs.readFileSync("./todo.json", { encoding: "utf8" }));
  // res.json(todo);
};
let posttodo = async (req, res) => {
  // var newdata = { name: "alaa", adddress: "aswan" };
  var newdata = req.body;
  try {
    const savetodo = await todoModel.create(newdata);
    res.json({ message: "success", data: savetodo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // var oldtod = JSON.parse(
  //     fs.readFileSync("./todo.json", { encoding: "utf-8" })
  //   );
  //   oldtod.push(newdata);
  //    fs.writeFileSync("./todo.json", JSON.stringify(oldtod));
  //   // var newtodo = fs.appendFileSync("./todo.json", JSON.stringify(newdata));
  // res.json({message:"done",data:newdata})
  //   res.send(oldtod);
};
let gettodobyid = async (req, res) => {
  //console.log(req.params)
  let { id } = req.params;
  try {
    let todoid = await todoModel.findById(id);
    if (todoid) {
      res.json({ message: "done", id: todoid });
    } else {
      res.status(404).json({ message: "sorry not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // let todo = JSON.parse(fs.readFileSync("./todo.json", { encoding: "utf8" }));
  // let todoid = todo.find((item) => item.id == id);
  // if (todoid) {
  //   res.json({ message: "done", id: todoid });
  // } else {
  //   res.status(404).json({ message: "sorry not found" });
  // }
};
let deletetodo = (req, res) => {
  let { id } = req.params;
  let todo = JSON.parse(fs.readFileSync("./todo.json", { encoding: "utf8" }));
  let index = todo.findIndex((item) => item.id == id);
  if (index == -1) {
    res.status(404).json({ message: "sorry id not found" });
  } else {
    todo.splice(index, 1);
    fs.writeFileSync("./todo.json", JSON.stringify(todo));
    res.status(204).json();
  }
};

module.exports = { gettodo, posttodo, gettodobyid, deletetodo };
