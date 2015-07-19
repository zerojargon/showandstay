angular.module('view', [
	'flickr.models.photos',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('flickr.search.view', {
				url: '/view/:id',
				views: {
					'modal@': {
						controller: 'ViewController as ViewCtrl',
						templateUrl: 'app/search/photos/view/photo-view.tmpl.html'
					},
				},
				resolve: {
                    photo: function(PhotosModel, $stateParams) {
                        return PhotosModel.find($stateParams.id);
                    }
                }
			})
	})
	.controller('ViewController', function ViewController($stateParams, PhotosModel, photo) {
		var ViewCtrl = this;
		ViewCtrl.photo = photo;
		ViewCtrl.id = $stateParams.id;
	})

;