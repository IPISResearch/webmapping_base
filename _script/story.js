var Story = function(){
    var me = {};
    var scroller;
    var storyPath;


     me.init = function(){
         console.log("init Story");
         scroller = scrollama();

         storyPath = "stories/" + Config.useStory + "/";

         loadStoryScript(function(){

             //console.warn(StoryConfig);
             var config = StoryConfig;
             buildStory(config);

             scroller
                 .setup({
                     step: '.step',
                     offset: 0.5,
                     progress: true
                 })
                 .onStepEnter(function(response){
                     var chapter = config.chapters.find(function(chap){return chap.id === response.element.id});
                     response.element.classList.add('active');

                     if (chapter.urlHash){
                         var hash = chapter.urlHash.substr(1);
                         MapService.decodeHash(hash);

                         chapter.location = chapter.location || {};
                         chapter.location.center = [Config.mapCoordinates.x,Config.mapCoordinates.y];
                         chapter.location.zoom = Config.mapCoordinates.zoom;

                         MapService.setMapState(Config.initLayerIds,null,Config.initBaselayer)


                         //Config.initBaselayer = urlparams[3] || 2;
                         //if (urlparams[4]) Config.initLayerIds = (urlparams[4]).split(",");
                         //if (urlparams[5]) Config.initfilterIds = (urlparams[5]).split(",");


                     }

                     if (chapter.location){
                         map.flyTo(chapter.location);
                     }

                     //if (chapter.onChapterEnter.length > 0) {
                         //chapter.onChapterEnter.forEach(setLayerOpacity);
                     //}
                 })
                 .onStepExit(function(response){
                     var chapter = config.chapters.find(function(chap){return chap.id === response.element.id});
                     response.element.classList.remove('active');
                    // if (chapter.onChapterExit.length > 0) {
                         //chapter.onChapterExit.forEach(setLayerOpacity);
                     //}
                 });



             window.addEventListener('resize', scroller.resize);
         });


     };

     var loadStoryScript = function(next){
         if (Config.useStory){
             var head = document.getElementsByTagName("head")[0];

             var script = document.createElement("script");
             script.async = 1;
             script.onload = script.onreadystatechange = function(_, isAbort){
                 if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                     script.onload = script.onreadystatechange = null;
                     script = undefined;
                     if (!isAbort) {
                         if (next) next();
                     }
                 }
             };
             script.src = storyPath  + "config.js";
             head.appendChild(script);

             var link = document.createElement("link");
             link.rel = "stylesheet";
             link.type = "text/css";
             link.href = storyPath  + "style.css?v2";
             head.appendChild(link);
         }
     };

     var buildStory  = function(config){

         var storyContainer = document.createElement("div");
         storyContainer.id = "story";
         document.body.appendChild(storyContainer);

         var closeButton = document.createElement('div');
         closeButton.className = "storyclose";
         closeButton.innerHTML = "Back to the Map";
         closeButton.onclick = function(){
             document.body.classList.remove("storyfied");
             document.body.classList.add("wasstoryfied");
         };
         document.body.appendChild(closeButton);

         var openButton = document.createElement('div');
         openButton.className = "storyopen";
         openButton.innerHTML = "Show Story";
         openButton.onclick = function(){
             document.body.classList.add("storyfied");
         };
         document.body.appendChild(openButton);

         var storyLogo = document.createElement("div");
         storyLogo.id = "storylogo";
         storyLogo.innerHTML = '<a href="https://ipisresearch.be/" target="_blank"><img src="_img/ipislogo.png" alt="IPIS logo" border="0"></a>';
         document.body.appendChild(storyLogo);

         var features = document.createElement('div');
         features.className = "lefty";
         features.setAttribute('id', 'features');


         var header = document.createElement('div');

         if (config.title) {
             var titleText = document.createElement('h1');
             titleText.innerText = config.title;
             header.appendChild(titleText);
         }

         if (config.subtitle) {
             var subtitleText = document.createElement('h2');
             subtitleText.innerText = config.subtitle;
             header.appendChild(subtitleText);
         }

         if (config.byline) {
             var bylineText = document.createElement('p');
             bylineText.innerText = config.byline;
             header.appendChild(bylineText);
         }

         if (header.innerText.length > 0) {
             header.classList.add(config.theme);
             header.setAttribute('id', 'header');
             story.appendChild(header);
         }

         config.chapters.forEach(function(record, idx){
             var container = document.createElement('div');
             var chapter = document.createElement('div');

             if (record.title) {
                 var title = document.createElement('h3');
                 title.innerText = record.title;
                 chapter.appendChild(title);
             }

             if (record.image) {
                 var image = new Image();
                 if (record.image.indexOf("://")<0){
                     record.image = storyPath + "images/" + record.image;
                 }
                 image.src = record.image;
                 chapter.appendChild(image);
             }

             if (record.description) {
                 var storyP = document.createElement('p');
                 storyP.innerHTML = record.description;
                 chapter.appendChild(storyP);
             }

             container.setAttribute('id', record.id);
             container.classList.add('step');
             if (idx === 0) {
                 container.classList.add('active');
             }

             var nextButton = undefined;
             if (idx<config.chapters.length-1){
                 var nextChapter = config.chapters[idx+1];
                 nextButton = document.createElement('div');
                 nextButton.classList.add("next");
                 nextButton.innerHTML = "<i>▾</i>";
                 nextButton.onclick = function(){
                    console.log(nextChapter);
                     var to = document.getElementById(nextChapter.id).offsetTop;
                     storyScrollTo(document.body,to,500);



                 };
             }


             chapter.classList.add(config.theme);
             container.appendChild(chapter);
             if (nextButton) container.appendChild(nextButton);
             features.appendChild(container);
         });

         story.appendChild(features);

         var footer = document.createElement('div');

         if (config.footer) {
             var footerText = document.createElement('p');
             footerText.innerHTML = config.footer;
             footer.appendChild(footerText);
         }

         if (footer.innerText.length > 0) {
             footer.classList.add(config.theme);
             footer.setAttribute('id', 'footer');
             story.appendChild(footer);
         }


     };

     return me;
}();


function storyScrollTo(element, to, duration) {

    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        storyScrollTo(element, to, duration - 10);
    }, 10);
}