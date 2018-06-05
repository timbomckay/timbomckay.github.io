// JavaScript
/*global gtag, ga, Vue */

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
    trackEvent: function(desc, event) {
      gtag('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: event || 'click',
        eventLabel: desc,
        transport: 'beacon'
      });
      ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: event || 'click',
        eventLabel: desc,
        transport: 'beacon'
      });
    },
    showModal: function(entry) {
      this.active = this.entries[entry];
      this.trackEvent(entry, 'View Project')
    }
  }
})
