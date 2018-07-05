// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
const markersCoords = new Set();
const notes = [];

for (let i = 0; i < 200; i ++) {
  const randCoord1 = (Math.random() * (1 - 0.01) + 0.01).toFixed(2);
  const randCoord2 = (Math.random() * (1 - 0.01) + 0.01).toFixed(2);
  const concatinated = `${randCoord1}${randCoord2}`;
  if (!markersCoords.has(concatinated)) {
    markersCoords.add(concatinated);
    notes.push({x: randCoord1, y:randCoord2, note:
      `
        <center><b>${faker.lorem.sentence(5)}</b><br/>
        <img src="${faker.internet.avatar()}"/></center>
        <a href="${faker.internet.url()}" target="blank">${faker.company.companyName()}</a>
        is an <a href="${faker.internet.url()}" target="blank">${faker.lorem.sentence()}</a>
      `})
  }
}

// console.log('object', jQuery, $)
// $("#image1").imgViewer2({
//   onClick: function( e, pos ) {
//     console.log('object: ', pos);
//     $("#position").html("relx: " + pos.x + " rely: " + pos.y + " zoom: " + this.getZoom() );
//   }
// });

// $("#image1").on('load', function() {
//   console.log('loaded');
//   // this.imgViewer2()
// });

$.widget("wgm.imgNotes2", $.wgm.imgViewer2, {
  options: {
/*
*	Defaault action for addNote callback
*/
    addNote: function(data) {
      var map = this.map,
        loc = this.relposToLatLng(data.x, data.y);
      var popup = L.responsivePopup({ hasTip: true, autoPan: false}).setContent(data.note);
      var icon = L.BeautifyIcon.icon({icon: 'arrow-down',
                      borderColor: 'red',
                      textColor: 'red',
                      backgroundColor: 'transparent'
      });

      L.marker(loc, {icon: icon}).addTo(map).bindPopup(popup);
    }

  },

/*
*	Add notes from a javascript array
*/
  import: function(notes) {
    if (this.ready) {
      var self = this;
      $.each(notes, function() {
        self.options.addNote.call(self, this);
      });
    }
  }
});

var image = new Image();
image.onload = function () {
   console.info("Image loaded !");
   var $img = $("#image1").imgNotes2( {
    onReady: function() {
      this.import(notes);
    }
});
}
image.onerror = function () {
   console.error("Cannot load image");
   //do something else...
}
image.src = "https://image.ibb.co/danAZy/cphi_china_18_floorplan.jpg";