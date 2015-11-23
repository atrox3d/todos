Lists = new Mongo.Collection('lists');


if (Meteor.isClient) {


    Template.lists.helpers({
        'list' : function () {
            return Lists.find();
        }
    });


    Template.addList.events({
        'submit form' : function (event) {
            console.log('add list');
            event.preventDefault();

            var listName = $('[name="listName"]').val();
            Lists.insert({
                name: listName,
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
