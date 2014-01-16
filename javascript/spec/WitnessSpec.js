define (['src/witness'], function(witness){

    describe("witness", function () {

        it("should get valid parameters from the url query string", function() {
         var queryString = 'location=paris';
         var result = witness.getParameters(queryString);
         expect(result).toEqual('paris');
        });

    });
    
});