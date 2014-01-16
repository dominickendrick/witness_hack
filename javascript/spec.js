require.config({

    paths: {
        'jasmine': 'lib/jasmine/jasmine',
        'jasmine-html': 'lib/jasmine/jasmine-html',
         spec: 'spec',
         'sinon': 'lib/sinon/sinon',
         "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
         
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
		sinon: {
			exports: 'sinon'
		}
    }
});


require(['jasmine-html'], function (jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/WitnessSpec');

    require(specs, function (spec) {
        jasmineEnv.execute();
    });


});