var Data = function () {

    // preload and transform datasets
    var me = {};

	var years = [];

    me.init = function () {

		var dataDone = function () {
			EventBus.trigger(EVENT.preloadDone);
		};



		dataDone();
    };

	me.getYears = function () {
		return years;
	};

    return me;


}();
