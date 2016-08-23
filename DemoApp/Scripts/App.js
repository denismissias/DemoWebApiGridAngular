var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridconstants) {
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 10,
        sort: null
    };
    $scope.gridOptions = {
        paginationPageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        paginationPageSize: 10,
        useExternalPagination: true,
        useExternalSorting: true,
        columnDefs: [
            { name: 'StudentId' },
            { name: 'FirstName', enableSorting: false },
            { name: 'LastName', enableSorting: false },
            { name: 'Age', enableSorting: false },
            { name: 'Gender', enableSorting: false },
            { name: 'Batch', enableSorting: false },
            { name: 'Address', enableSorting: false },
            { name: 'Class', enableSorting: false },
            { name: 'School', enableSorting: false },
            { name: 'Domicile', enableSorting: false },
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length == 0) {
                    paginationOptions.sort = null;
                } else {
                    paginationOptions.sort = sortColumns[0].sort.direction;
                }
                getPage();
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                getPage();
            });
        }
    };

    var getPage = function () {
        var url;

        switch (paginationOptions.sort) {
            case uiGridconstants.ASC:
                url = 'http://localhost:51631/api/DemoApi/GetStudentsAsc';
                break;
            case uiGridconstants.DESC:
                url = 'http://localhost:51631/api/DemoApi/GetStudentsDesc';
                break;
            default:
                url = 'http://localhost:51631/api/DemoApi/GetStudents';
                break;
        }

        $http.get(url).success(function (data) {
            $scope.gridOptions.totalItems = 100;
            var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
        });
    };

    getPage();
}]);