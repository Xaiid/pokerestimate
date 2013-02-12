define([

  'Backbone',

  //Collection
  'app/collections/projects',

  //Views
  'app/views/projectsController',

  //Templates
  'text!templates/home/loginTemplate.html',
], function(

  Backbone,

  //Collection
  Projects,

  //views
  projectsController,

  //Template
  loginTemplate
){

  var ProjectsView = Backbone.View.extend({

    template: _.template(loginTemplate),

    collection: new Projects(),

    events: {
      'submit #login-form' : 'login'
    },

    initialize: function(){
      this.options.account.bind('change', this.render, this);

      this.projectsList = new projectsController({
        collection: this.collection
      });
    },

    login: function(event){
      event.preventDefault();
      var form = this.$(event.currentTarget).serialize();
      this.options.account.login(form);
    },

    render: function(){
      var user = this.options.account.get('user');
      this.$el.html(this.template({user: user}));

      if(user){
        this.projectsList.setElement('.projects-list');
        this.collection.fetch();
      }
    }

  });


  return ProjectsView;

});
