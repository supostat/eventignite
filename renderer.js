window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
const markersCoords = new Set();
const notes = [];

for (let i = 0; i < 5000; i++) {
  const randCoord1 = (Math.random() * (1 - 0.01) + 0.01).toFixed(2);
  const randCoord2 = (Math.random() * (1 - 0.01) + 0.01).toFixed(2);
  const concatinated = `${randCoord1}${randCoord2}`;
  if (!markersCoords.has(concatinated)) {
    markersCoords.add(concatinated);
    notes.push({
      x: randCoord1, y: randCoord2, note:
        `
        <center><b>${faker.lorem.sentence(5)}</b><br/>
        <img src="${faker.internet.avatar()}"/></center>
        <a href="${faker.internet.url()}" target="blank">${faker.company.companyName()}</a>
        is an <a href="${faker.internet.url()}" target="blank">${faker.lorem.sentence()}</a>
      `})
  }
}

$.widget("wgm.imgNotes2", $.wgm.imgViewer2, {
  options: {
    addNote: function (data) {
      var map = this.map,
        loc = this.relposToLatLng(data.x, data.y);
      var popup = L.responsivePopup({ hasTip: false, autoPan: false, closeButton: true }).setContent(data.note);

      return L.marker(loc).bindPopup(popup);
    }
  },

  import: function (notes) {
    if (this.ready) {
      var self = this;
      self.map.options.maxZoom = 5;
      var markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });
      $.each(notes, function () {
        markers.addLayer(self.options.addNote.call(self, this));
      });
      self.map.addLayer(markers);
    }
  }
});

$(document).ready(function () {
  $("#image1").imgNotes2({
    onReady: function () {
      this.import(notes);
    }
  });
})

