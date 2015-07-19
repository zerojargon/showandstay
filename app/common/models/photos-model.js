angular.module('flickr.models.photos', [])
    .service('PhotosModel', function ($http, $q) {
        var model = this,
            API_key = 'b9a33475f3d69b6c811006f078ce8e2c',
            safety = 1,
            URLS = {
                FETCH: 'https://api.flickr.com/services/rest/?api_key='+API_key+'&format=json&nojsoncallback=1&per_page=30&safe_search='+safety+'&extras=description,license,date_upload,date_taken,owner_name,geo,tags'
            },
            photos;

        model.query;

        model.search = function(search) {
            photos = null;
            model.query = (search.length > 0) ? search : 'sightseeing';
            return (photos) ? $q.when(photos) : $http.get(URLS.FETCH + '&method=flickr.photos.search&text='+model.query).then(function(result) {
                return cache(result);
            });
        }

        model.nextPage = function() {
            return $http.get(URLS.FETCH + '&method=flickr.photos.search&text='+model.query+'&page='+(photos.meta.page+1)).then(function(result) {
                return cache(result);
            });
        }

        function cache(result) {
            photos = extract(result);
            return photos;
        }

        function extract(result) {
            return transform(result.data);
        }
        function transform(result) {
            result.photos.photo.map(function(photo) {
                photo.tags = photo.tags.split(' ');
            });
            return {
                photos: result.photos.photo,
                meta: {
                    page: result.photos.page,
                    pages: result.photos.pages,
                    perpage: result.photos.perpage,
                    total: result.photos.total    
                }
            }
        }

        model.find = function(photoId) {
            console.log(photos);
            return _.find(photos.photos, function(photo) {
                return photo.id === photoId;
            })
        }
    })

;
