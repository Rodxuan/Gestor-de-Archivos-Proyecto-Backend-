const {Schema, model} = require('mongoose')

const tasksChema = Schema({
    title: {type :String, required:true},
    description: {type:String, required:true},
    category: { type: String, required:true},
    comments: { type: String, required:true},
    status: { type: String, required:true },
    priority: { type: String, required:true},
    tags: { type: String, required:true},
    project: {type: String, required:true},
  });

  const categorySchema = Schema({
    name: {type :String, required:true},
  });
  
  const commentSchema = Schema({
    text: {type :String, required:true},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  });
  
  const statusSchema = Schema({
    name: {type :String, required:true},
  });
  
  const prioritySchema = Schema({
    name: {type :String, required:true},
  });
  
  const tagSchema = Schema({
    name: {type :String, required:true},
  });
  
  const projectSchema = Schema({
    name: {type :String, required:true},
    description: {type :String, required:true}
  });
  
  const Task = model('Task', tasksChema);
  const Category = model('Category', categorySchema);
  const Comment = model('Comment', commentSchema);
  const Status = model('Status', statusSchema);
  const Priority = model('Priority', prioritySchema);
  const Tag = model('Tag', tagSchema);
  const Project = model('Project', projectSchema);
  
  module.exports = {
    Task,
    Category,
    Comment,
    Status,
    Priority,
    Tag,
    Project,
  };
