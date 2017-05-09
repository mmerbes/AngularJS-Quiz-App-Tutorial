(function(){

    angular
        .module("turtleFacts")
        .controller("resultsCtrl", ResultsController);

    ResultsController.$inject = ['quizMetrics','dataService'];

    function ResultsController(quizMetrics, dataService){
        this.quizMetrics = quizMetrics;
        this.dataService = dataService;

        this.activeQuestion = 0;

        this.getAnswerClass = function() {
          if(index === quizMetrics.correctAnswers[this.activeQuestion]) {
            return 'bg-success';
          }else if(index === dataService.quizQuestions[this.activeQuestion].selected) {
            return 'bg-danger';
          }
        }

        this.setActiveQuestion = function(index){
          this.activeQuestion = index;
        }

        this.calculatePerc = function() {
          return quizMetrics.numCorrect / dataService.quizQuestions.length * 100;
        }
    }
})();
