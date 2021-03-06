describe('TestCategoryCtrl', function () {

    var scope, modal;
    var categoryController, Category;

    beforeEach(function () {
        module('contas');
    });

    beforeEach(inject(function ($controller, $rootScope, $q, $modal, _Category_) {
        scope = $rootScope.$new();
        Category = _Category_;
        modal = $modal;

        spyOn(Category, 'query').and.callThrough();
        spyOn(modal, 'open').and.callThrough();

        categoryController = $controller('CategoryCtrl', {
            $scope: scope,
            $modal: modal,
            $log: null,
            Category: Category
        });
    }));

    //~--------------------------------------
    //~-- PRIVATE METHODS
    //~--------------------------------------
    describe("Private methods", function () {
        //~-- loadCategories
        it('expect loadCategories load categoris using category factory', function () {
            categoryController.loadCategories();
            expect(Category.query).toHaveBeenCalled();
        });

        //~-- createModal
        it('expect createModal call bootstrap modal open', function () {
            var category = null;
            categoryController.createModal(category);
            expect(modal.open).toHaveBeenCalled();
        });

        //~-- addCategoryInArray
        it('expect call saveCategory', function () {
            // mock internal method
            var pushCategoryInArray = jasmine.createSpy('pushCategoryInArray');
            categoryController.saveCategory = saveCategory;

            categoryController.addCategoryInArray();
            expect(saveCategory).toHaveBeenCalled();
        });

        //~-- addSubCategoryInArray
        it('expect do nothing when category is null', function () {
            // mock internal method
            var pushCategoryInArray = jasmine.createSpy('pushCategoryInArray');
            categoryController.saveCategory = saveCategory;

            scope.$modelValue = null;

            categoryController.addSubCategoryInArray(scope, null);

            expect(scope.$modelValue).toBeNull();
            expect(saveCategory).not.toHaveBeenCalled();
        });

        //~-- addSubCategoryInArray
        it('expect do nothing when category is undefined', function () {
            // mock internal method
            var pushCategoryInArray = jasmine.createSpy('pushCategoryInArray');
            categoryController.saveCategory = saveCategory;

            scope.$modelValue = undefined;

            categoryController.addSubCategoryInArray(scope, null);

            expect(scope.$modelValue).toBeUndefined();
            expect(saveCategory).not.toHaveBeenCalled();
        });

        it('expect create array into category to subcategories if subcategories is null and call saveCategory method', function () {
            // mock internal method
            var pushCategoryInArray = jasmine.createSpy('pushCategoryInArray');
            categoryController.saveCategory = saveCategory;

            scope.$modelValue = {
                name: 'Alimentação'
            };

            categoryController.addSubCategoryInArray(scope, null);

            expect(scope.$modelValue.category).not.toBeNull();
            expect(saveCategory).toHaveBeenCalled();

        });

        it('expect not create array into category to subcategories if subcategories is not null and call saveCategory method', function () {
            // mock internal method
            var pushCategoryInArray = jasmine.createSpy('pushCategoryInArray');
            categoryController.saveCategory = saveCategory;

            var category = {
                name: 'Alimentação',
                category: [
                    {
                        name: 'Restaurantes'
                    },
                    {
                        name: 'Padaria'
                    }
                ]
            };

            scope.$modelValue = category;

            categoryController.addSubCategoryInArray(scope, null);

            expect(category.category.length).toBe(scope.$modelValue.category.length);
            expect(saveCategory).toHaveBeenCalled();
        });

        //~-- saveCategory
        it('expect do nothing when categories is null', function () {
            var categories = null;
            var newCategory = 'New Category';

            categoryController.saveCategory(categories, newCategory);
            expect(categories).toBeNull();
        });

        it('expect do nothing when categories is undefined', function () {
            var categories;
            var newCategory = 'New Category';

            categoryController.saveCategory(categories, newCategory);
            expect(categories).toBeUndefined();
        });

        it('expect do nothing when newCategory is null', function () {
            var categories = [];
            var newCategory = null;

            categoryController.saveCategory(categories, newCategory).
            expect(newCategory).toBeNull();
        });

        it('expect do nothing when newCategory is undefined', function () {
            var categories = [];
            var newCategory;

            categoryController.saveCategory(categories, newCategory);
            expect(newCategory).toBeUndefined();
        });
    });

    //~--------------------------------------
    //~-- LOAD
    //~--------------------------------------
    describe('Load functions and values', function () {
        it('expect load categories length zero', function () {
            expect(0).toBe(scope.categories.length);
        });

        it('expect load collapse is true', function () {
            expect(true).toBe(scope.collapsed);
        });

        it('expect loading categories on controller loaded', function () {
            expect(Category.query).toHaveBeenCalled();
        });
    });

    //~--------------------------------------
    //~-- SCOPE FUNCTIONS
    //~--------------------------------------
    describe('Scope functions', function () {
        it('expect toggle collapsed variable to true', function () {
            var category = {
                toggle: function () {
                }
            };
            spyOn(category, 'toggle');

            scope.collapsed = true;
            scope.toggleCategory(category);

            expect(false).toBe(scope.collapsed);
            expect(category.toggle).toHaveBeenCalled();

        });

        it('expect toggle collapsed variable to false', function () {
            var category = {
                toggle: function () {
                }
            };
            spyOn(category, 'toggle');

            scope.collapsed = false;
            scope.toggleCategory(category);

            expect(true).toBe(scope.collapsed);
            expect(category.toggle).toHaveBeenCalled();
        });
    });

});