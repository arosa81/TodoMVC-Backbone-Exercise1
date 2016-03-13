var app = app || {};

app.TodoView = Backbone.View.extend({
  // a list tag
  tagName: 'li',

  // Cache the template function for a single item.
  template: _.template($('#item-template').html()),

  // DOM events specific to an item
  events: {
    'click .toggle': 'toggleCompleted',
    'dbclick label': 'edit',
    'click .destroy': 'clear',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  // Re-renders the title of the todo item
  render: function() {
    console.log(this.model.attributes);
    this.$el.html(this.template(this.model.attributes));

    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();

    this.$input = this.$('.edit');
    return this;
  },

  // toggle visibility of item
  toggleVisible : function () {
    this.$el.toggleClass( 'hidden',  this.isHidden());
  },

  // determines if item should be shown
  isHidden: function() {
    var isCompleted = this.model.get('completed');
    return ( // hidden cases only
      (!isCompleted && app.TodoFilter === 'completed')
      || (isCompleted && app.TodoFilter === 'active')
    );
  },

  // toggle the "completed" state of the model
  toggleCompleted: function() {
    this.model.toggle();
  },

  // switch view into "editing" mode, displaying input field
  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  // close editing mode, save changes to the todo
  close: function() {
    var value = this.$input.val().trim();

    if (value) {
      this.model.save({ title: value });
    }

    this.$el.removeClass('editing');
  },

  // complete editing when hitting enter
  updateOnEnter: function(e) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  },

  // remove item, destroy model from localstorage and delete its view
  clear: function() {
    this.model.destroy();
  }
});
