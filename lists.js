Lists = new Mongo.Collection('lists');


if (Meteor.isClient) {


    Template.lists.helpers({
        'list' : function () {
            var currentUser = Meteor.userId();
            return Lists.find({createdBy:currentUser});
        }
    });


    Template.addList.events({
        'submit form' : function (event) {
            console.log('add list');
            event.preventDefault();
            var currentUser = Meteor.userId();
            var listName = $('[name="listName"]').val();
            Lists.insert({
                name: listName,
                createdBy: currentUser
            }, function (error, result){
                Router.go('listPage', {_id: result});
            }
            );
            $('[name="listName"]').val('');
            console.log('add list end');
        }
    });
}

if (Meteor.isServer) {
}
