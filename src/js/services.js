//请尝试把BookListCtrl中加载书籍列表数据的部分抽出来作为一个服务

var bookServiceModule = angular.module("BookServiceModule", []);
var DataLoader = function () {
    this.loadData = function () {
        return {x : 1, y : 2};
    };
    this.getPagedDataAsync = function($stateParams,$http,bookType, pageSize, page, searchText) {
        var data;
        setTimeout(function() {
            //var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('../src/data/books' + bookType + '.json')
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        //$scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('../src/data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        data = largeLoad;
                        //$scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };

};

bookServiceModule.service("dataLoader", DataLoader);