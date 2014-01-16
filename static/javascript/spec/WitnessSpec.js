define (['src/witness','sinon'], function(witness, sinon){
    
    describe("witness", function () {
        
        var server;
        
        beforeEach(function () { server = sinon.fakeServer.create(); })
        afterEach(function () { server.restore(); }); 
        
        
        it("should get valid parameters from the url query string", function() {
            var queryString = 'location=paris&group=group/guardianwitness/travel';
            var result = witness.getParameters(queryString);
            expect(result).toEqual({ location : 'paris', group : 'group/guardianwitness/travel' });
        });
        
        it("should retrieve the witness data based on the query string", function() {
            var queryString = 'location=paris&group=group/guardianwitness/travel';
            var url = 'http://n0ticeapis.com/2/search?';
            params = witness.getParameters(queryString);
            
            var callback = sinon.spy();
            witness.queryApi(url, params, callback);

            // This is part of the FakeXMLHttpRequest API
            server.requests[0].respond(
                200,
                { "Content-Type": "application/json" },
                JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
            );
            
            expect(callback.calledOnce).toBe(true);
            
        });

    });
    
});