const TodoList = artifacts.require("./TodoList");
const { assert } = require("chai")


contract('TodoList', (accounts) => {

    before(async () => {
        this.todoList = await TodoList.deployed()
    })

  it("Deployed successfuly", async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0, "constructor doesnt work");
    
  });

  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, "First dApp project by Emoshimo")
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)
  });

  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new task')
    assert.equal(event.completed, false)
  })


  it("toggles task ", async () => {
    const result = await this.todoList.toggleTask(1);
    const task = await this.todoList.tasks(1);
    assert.equal(task.completed, true);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
    
  });

  it("updates tasks", async () => {
    await this.todoList.updateTask(1, "New content");
    const task = await this.todoList.tasks(1);
    assert.equal(task.content, "New content");
    assert.equal(task.id.toNumber(), 1);
    
  });

});

