angular.module('search', [
	'flickr.models.photos',
	'view'
])
	.config(function($stateProvider) {
		$stateProvider
			.state('flickr.search', {
				url: '/:query',
				views: {
					'content@': {
						controller: 'PhotosController as PhotosCtrl',
						templateUrl: 'app/search/photos/list/photo-list.tmpl.html'
					},
				},
				resolve: {
                    photos: function(PhotosModel, $stateParams) {
                        return PhotosModel.search($stateParams.query);
                    }
                }
			})
	})
	.controller('PhotosController', function PhotosController($stateParams, PhotosModel, photos) {
		var PhotosCtrl = this;
		PhotosCtrl.photos = photos;
		PhotosCtrl.throttle = 0;
		PhotosCtrl.query = $stateParams.query;

		window.setInterval(function()
		{
		    PhotosCtrl.throttle += 100;
		}, 100);

		$(document).ready(function() {
			paddingHeader();
		});
		function paddingHeader() {
			h = $('#header').height();
			$('#content').css('padding-top', (h+20));
		}

		PhotosCtrl.incrementPage = function() {
			if(PhotosCtrl.throttle > 500) {
				//reset throttle
				PhotosCtrl.throttle = 0;
				PhotosModel.nextPage().then(function(result) {
					// merge current photos and new photos
					PhotosCtrl.photos.photos = PhotosCtrl.photos.photos.concat(result.photos);
				});
			}
		};
	})

;