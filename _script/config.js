var version = "0.0.1";

var Config = {
    mapId: "Dummy",
    apiScope: "dummy",
    apiScopeDev: "dummy_dev",
    templateURL: "_templates/main.html",
    showDisclaimerOnFirstUse: false,
    disclaimerUrl: "_templates/disclaimer.html",
    infoUrl: "_templates/info.html",
    // starting point for map
    mapCoordinates: {
      x: 34,
      y: -4,
      zoom: 6,
      bounds: [[39.79,-0.11],[28.47,-6.84]]
    },
    defaultBaseLayerIndex : 2,
    // if preLoad is defined, this occurs before the map is shown - used to pre-generate datasets etc.
    preLoad : function(){Data.init();},
    // baselayer info
    baselayers:[
        {index: 1, id: "satellite", label: "Satelite <font color='grey'>(Mapbox)</font>", url:"mapbox://styles/ipisresearch/ciw6jsekm003a2jql0w0a7qca"},
        {index: 4, id: "satellite_bing", label: "Satelite <font color='grey'>(Bing)</font>", url:"http://ecn.t0.tiles.virtualearth.net/tiles/h{quadkey}.jpeg?g=6412", attribution: "© 2018 Microsoft Corporation © 2018 Digital Globe © CNES (2018) Distribution Airbus DS © 2018 HERE"},
        {index: 2, id: "streets", label: "Streets <font color='grey'>(Mapbox)</font>", url:"mapbox://styles/ipisresearch/ciw6jpn5s002r2jtb615o6shz"},
        {index: 3, id: "empty", label: "None", url:"mapbox://styles/ipisresearch/cjav3e31blm5w2smunhb32kzm"}
    ],
    // layer info
    layers:{

    }
};

