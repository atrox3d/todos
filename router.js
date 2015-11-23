Router.configure({
    layoutTemplate: 'main',
});

Router.onBeforeAction(function() {
        var currentUser = Meteor.userId();

        if(currentUser) {
            console.log("onBeforeAction GLOBAL logged");
            this.next();
        } else {
            console.log("onBeforeAction GLOBAL not logged");
            this.render("login");
        }
    },
    {
        except: ['home', 'register', 'login', ]
    }
);

Router.route('/', {
    name: 'home',
    template: 'home',
});

Router.route('/register');
Router.route('/login');

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function () {
        var currentList = this.params._id;
        var currentUser = Meteor.userId();

        return Lists.findOne({
            _id: currentList,
            createdBy: currentUser
        });
    },

    // onBeforeAction: function() {
    //     var currentUser = Meteor.userId();
    //
    //     if(currentUser) {
    //         console.log("onBeforeAction logged");
    //         this.next();
    //     } else {
    //         console.log("onBeforeAction not logged");
    //         this.render("login");
    //     }
    // },

    onRun: function() {
        console.log("onRun");
        this.next();
    },

    onReRun: function() {
        console.log("onReRun");
        this.next();
    },

    onStop: function() {
        console.log("onStop");
    },
});
