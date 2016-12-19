// This will let you use the .remove() function later on
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
    };
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhZGhlIiwiYSI6IllHYWhiSUEifQ.al-_5fA7j3QPv54YJSTyOQ';

  // This adds the map
  var map = new mapboxgl.Map({
    // container id specified in the HTML
    container: 'map', 
    // style URL
    style: 'mapbox://styles/mapbox/outdoors-v10', 
    // initial position in [long, lat] format
    center: [112.407558, -5.093789],   
    // initial zoom
    zoom: 6
  });

  var stores = {
   "type":"FeatureCollection",
   "features":[  
      {  
         "type":"Feature",
         "geometry":{  
            "type":"Point",
            "coordinates":[  
               114.594378,
               -3.318607
            ]
         },
         "properties":{  
            "cartodb_id":1,
            "id":"a1",
            "name":"Banjarmasin City Scale Mapping",
            "partner":"Turun Tangan",
            "type":"Data Collection",
            "localization":"Banjarmasin",
            "lat":-3.318607,
            "lon":114.594378,
            "ref":"projects/banjarmasin.html",
            "source":"https://www.youtube.com/embed/c1kW6eaJURY"
         }
      },
      {  
         "type":"Feature",
         "geometry":{  
            "type":"Point",
            "coordinates":[  
               110.3957,
               -7.784922
            ]
         },
         "properties":{  
            "cartodb_id":2,
            "id":"a2",
            "name":"Urban Citizenship Academy",
            "partner":"Universitas Islam Negeri",
            "type":"UCA",
            "localization":"Jogja",
            "lat":-7.784922,
            "lon":110.3957,
            "ref":"projects/uca-jogja.html"
         }
      },
      {  
         "type":"Feature",
         "geometry":{  
            "type":"Point",
            "coordinates":[  
               110.774009,
               -7.544259
            ]
         },
         "properties":{  
            "cartodb_id":3,
            "id":"a3",
            "name":"Urban Citizenship Academy",
            "partner":"Kota Hijau",
            "type":"UCA",
            "localization":"Solo",
            "lat":-7.544259,
            "lon":110.774009,
            "ref":"projects/uca-hijau.html"
         }
      },
      {  
         "type":"Feature",
         "geometry":{  
            "type":"Point",
            "coordinates":[  
               110.419239,
               -6.992139
            ]
         },
         "properties":{  
            "cartodb_id":4,
            "id":"a4",
            "name":"Urban Social Forum",
            "partner":"USF",
            "type":"USF",
            "localization":"Semarang",
            "lat":-6.992139,
            "lon":110.419239,
            "ref":"projects/usf.html"
         }
      },
      {  
         "type":"Feature",
         "geometry":{  
            "type":"Point",
            "coordinates":[  
               110.411627,
               -6.979231
            ]
         },
         "properties":{  
            "cartodb_id":5,
            "id":"a5",
            "name":"Right to the City Workshop",
            "partner":"Institute of Policy",
            "type":"USF",
            "localization":"Semarang",
            "lat":-6.979231,
            "lon":110.411627,
            "ref":"projects/right-to-city.html"
         }
      },
      {  
         "type":"Feature",
         "geometry":{  
            "type":"Point",
            "coordinates":[  
               110.824327,
               -7.575489
            ]
         },
         "properties":{  
            "cartodb_id":6,
            "id":"a6",
            "name":"Disability - Inclusive City",
            "partner":"UNESCO",
            "type":"Data Collection",
            "localization":"Solo",
            "lat":-7.575489,
            "lon":110.824327,
            "ref":"projects/dis-solo.html"
         }
      }
   ]
};
  // This adds the data to the map
  map.on('load', function (e) {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource("places", {
      "type": "geojson",
      "data": stores
    });
    // This is where your '.addLayer()' used to be
    // Initialize the list
    buildLocationList(stores);
 
  });
  
  // This is where your interactions with the symbol layer used to be
  // Now you have interactions with DOM markers instead
  stores.features.forEach(function(marker, i) {
    // Create an img element for the marker
    var el = document.createElement('div');
    el.id = "marker-" + i;
    el.className = 'marker';
    el.style.left='-28px';
    el.style.top='-46px';
    // Add markers to the map at all points
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map); 

    el.addEventListener('click', function(e){
        // 1. Fly to the point
        flyToStore(marker);

        // 2. Close all other popups and display popup for clicked store
        createPopUp(marker);
        
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('active');

        e.stopPropagation();
        if (activeItem[0]) {
           activeItem[0].classList.remove('active');
        }

        var listing = document.getElementById('listing-' + i);
        listing.classList.add('active');

    });
  });

  
  function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 11
      }); 
  }

  /* Extent map button
  $("myextent").click(function(){
      map.flyTo({
        center: [112.407558, -5.093789],
        zoom: 6
      }); 
    });*/


  function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

/*var alink = document.createElement('a');
      alink.href = currentFeature.properties.ref;
      alink.className = 'alink';

  var aiframe = document.createElement('iframe');
      aiframe.src = currentFeature.properties.source;
      aiframe.width = '100%';
      aiframe.height = '100px';*/


    var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>'+ currentFeature.properties.name +'</h3>' + 
            '<h4>' + '<p>TYPE </p>' + currentFeature.properties.type + '</h4>' + 
            '<h4>' + '<p>PARTNER </p>' + currentFeature.properties.partner +'</h4>' + 
            '<h4> <a target="_blank" href=' + currentFeature.properties.ref + '> Report </a> </h4>')
          .addTo(map);
  }
 

  function buildLocationList(data) {
    for (i = 0; i < data.features.length; i++) {
      var currentFeature = data.features[i];
      var prop = currentFeature.properties;
      
      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = "listing-" + i;
      
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.name;     
      
      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.localization;
      
      var rlink = listing.appendChild(document.createElement('a'));
      rlink.href = prop.ref;
      rlink.target = '_blank';
      rlink.className = 'rtitle';
      rlink.dataPosition = i;
      rlink.innerHTML = "Report"; 

      /*var aiframe = listing.appendChild(document.createElement('iframe'));
      aiframe.src = prop.source;
      aiframe.width = '100%';
      aiframe.height = '200px';*/


      link.addEventListener('click', function(e){
        // Update the currentFeature to the store associated with the clicked link
        var clickedListing = data.features[this.dataPosition];
        
        // 1. Fly to the point
        flyToStore(clickedListing);

        // 2. Close all other popups and display popup for clicked store
        createPopUp(clickedListing);
        
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('active');

        if (activeItem[0]) {
           activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
      });
    }
  }
// browser-sync start --server --files "**/*"
