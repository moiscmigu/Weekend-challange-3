var myApp = angular.module('myApp', []);

var pics = function(img, desc) {
    this.img = img;
    this.desc = desc;
    this.likes = 0;
    this.visible = true;
    this.comment = [];
};

myApp.controller('ng-angular-pictures', function() {
    var vm = this;
    var Beach = new pics('images/beach.jpg', 'My favorite place to be everyday in Mexico');
    var Panther = new pics('images/FullSizeRender.jpg', 'The goodest body out there!!');
    var Nature = new pics('images/nature.jpg', 'Love taking in the beauty of nature');
    var barcelona = new pics('images/barcelona.jpg', 'Barcelona, home to the best team in the world');
    var gtr = new pics('images/gtr.jpg', 'Hope to someday be able to own a GTR');
    var boat = new pics('images/boat.jpg', 'Favorite time to fish is in the late summer nights');
    vm.photos = [Beach, Panther, Nature, barcelona, gtr, boat];

    vm.addLike = function(index) {
        vm.photos[index].likes++;
    };//end add like

    vm.toggleShow = function(index) {
         vm.photos[index].visible = !vm.photos[index].visible;
    };//end toggleShow

});
