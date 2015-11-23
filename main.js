if (Meteor.isClient) {
	Template.navigation.events({
		'click .logout' : function(event) {
			event.preventDefault();
			console.log('logout');
			Meteor.logout();
			Router.go('login');
		}
	});
}