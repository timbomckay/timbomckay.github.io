// JavaScript
/*global gtag, Vue */

// register modal component
Vue.component('modal', {
  template: '#modal-template'
})

Vue.config.devtools = true

// start app
new Vue({
  el: '#app',
  mounted: function() {
    let self = this
    fetch('dist/entries.min.json')
    .then(response => {
      response.json().then(function(data) {
        self.entries = data
      })
    })
  },
  data: {
    active: false,
    entries: false
  },
  methods: {
    trackEvent: function(label, action = 'click', cat = 'engagement') {
      gtag('event', action, {
        'event_category': cat,
        'event_label': label
      });
    },
    showModal: function(entry) {
      this.active = this.entries[entry];
      this.trackEvent(entry, 'view', 'project')
    }
  }
})
