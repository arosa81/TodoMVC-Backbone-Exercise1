var app = app || {};

app.TodoView = Backbone.View.extend({
  // a list tag
  tagName: 'li',

  // Cache the template function for a single item.
  template: _.template($('#item-template').html()),

  // DOM events specific to an item
  events: {

  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {

  },

  // Re-renders the title of the todo item
  render: function() {

  },

  // switch view into "editing" mode, displaying input field
  edit: function() {

  },

  // close editing mode, save changes to the todo
  close: function() {

  },

  // complete editing when hitting enter
  updateOnEnter: function() {

  }
});
