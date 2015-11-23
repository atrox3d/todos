Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {

    Template.todos.helpers({
        'todo' : function () {
            var currentList = this._id;
            var currentUser = Meteor.userId();
            return Todos.find({
                listId: currentList,
                createdBy: currentUser
            });
        }
    });

    Template.lists.helpers({
        'list' : function () {
            return Lists.find();
        }
    });

    Template.addTodo.events({
        'submit form' : function (event) {
            event.preventDefault();

            var todoName = $('[name="todoName"]').val();
            var currentList = this._id;
            var currentUser = Meteor.userId();

            Todos.insert({
                name: todoName,
                completed: false,
                createdAt: new Date(),
                createdBy: currentUser,
                listId: currentList,
            });
            $('[name="todoName"]').val('');
        }
    });

    Template.todoItem.events({
        'click .delete-todo' : function(event) {
            event.preventDefault();
            var documentId=this._id;
            if(window.confirm("Delete this task?")) {
                Todos.remove({_id:documentId});
            }
        },
        'keyup [name="todoItem"]' : function(event) {
            var documentId = this._id;
            var todoItem = $(event.target).val();
            Todos.update(
                {_id: documentId},
                {$set: {
                        name: todoItem
                    }
                }
            );
        }
    });

}

if (Meteor.isServer) {
}
