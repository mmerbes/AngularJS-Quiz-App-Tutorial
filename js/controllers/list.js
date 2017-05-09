(function() {
  angular
    .module("turtleFacts")
    .controller('listCtrl', ListController);

    ListController.$inject = ['quizMetrics', 'dataService'];

    function ListController(quizMetrics, dataService) {
      this.quizMetrics = quizMetrics;
      this.dataService = dataService;

      this.activeTurtle = {};
      this.search = "";

      this.data = dataService.turtlesData;

      this.changeActiveTurtle = function(index) {
        this.activeTurtle = index;
      }

      this.activateQuiz = function() {
        quizMetrics.changeState("quiz",true);
      }
    };

})();
