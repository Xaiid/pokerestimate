define([

  'Backbone',

  //Template
  'text!templates/project-page/taskItemTemplate.html',

  'jquery-ui'
], function(

  Backbone,

  //Template
  itemTemplate

){

  var TaskItemView = Backbone.View.extend({

    template: _.template(itemTemplate),

    events: {
      'click' : 'selected'
    },

    initialize: function(title){
      this.$el.html(this.template({title: this.model.get('title')}));

      this.$el.draggable({
        revert: "invalid",
        scroll: false,
        cursor: "move",
        cursorAt: { top: 25, left: 10 },

        helper: function(event){
          var num = $('.selected').length || '';
          var helper = $(event.currentTarget).clone();
          var span   = helper.find('span');
          var name   = span.text();

          helper.width('710px');

          if(num){ span.text(name + ' + ' + num); }
          return helper;
        },

        start: function(event, ui){
          var $target = $(event.currentTarget);
          $target.find('li').addClass('selected');
        }
      });

      return this;
    },

    selected: function(event){
      var $target = $(event.currentTarget).find('li');
      $target.toggleClass('selected');
    }

  });

  return TaskItemView;
});
