//enclose in a scope
(function(){

function Chart( value, options )
{

	console.clear();

	options = options || {};

	var that = this;
	
	var height = options.height || this.height;
	var title = options.title || this.title;
	this.maxElems = options.maxElems || 500;

	var element = document.createElement("div");
	element.className = "litepanel";
	if( height )
	{
		element.style.height = LiteGUI.sizeToCSS( height );
		if(!element.style.height)
			element.style.height = "calc(" + LiteGUI.sizeToCSS( height ) + ")";
		element.style.minHeight = "auto";
	}
	this.root = element;
	this.dps = [];
	this.numElems = 0;
	
	this.chart = new CanvasJS.Chart(element, {
	animationEnabled: true,
	theme: "dark2", // "light1", "light2", "dark1", "dark2"
	title: {
		text: title
	},
	axisY: {
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: this.dps
	}]
	});

	this.chart.position = "relative";
	this.chart.render();
	
	// window.setInterval(function(){console.log(this)}.bind(this), 100)
	this.sizeTimer = window.setInterval( function() {
  		// console.log("timer!");
		// console.log($(element).width());
		// this.chart.render();
	}.bind(this), 100)

}

// Chart.prototype.setValue = function(v) { $(this.input).val(v).change(); };
// Chart.prototype.getValue = function() { return $(this.input).val(); };

Chart.prototype.hide = function() { $(this.root).hide(); }
Chart.prototype.show = function() { $(this.root).show(); }
Chart.prototype.pushData = function( xval, yval )
{
	this.dps.push( {
			x: xval,
			y: yval
		} );

	if (this.dps.length > this.maxElems) {
		this.dps.shift();
	}

	this.chart.render();
}

LiteGUI.Chart = Chart;

})();
