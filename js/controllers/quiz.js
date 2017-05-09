(function() {
  angular
    .module("turtleFacts")
    .controller("quizCtrl", QuizController);

  QuizController.$inject = ['quizMetrics','dataService'];

  function QuizController(quizMetrics, dataService) {
    this.quizMetrics = quizMetrics;
    this.dataService = dataService;
    this.activeQuestion = 0;
    this.error = false;
    this.finalise = false;

    var numQuestionsAnswered = 0;

    this.setActiveQuestion = function($index) {
      if($index === undefined) {
        var breakOut = false;
        var quizLength = dataService.quizQuestions.length-1;
        while(!breakOut){
          this.activeQuestion = this.activeQuestion < quizLength ? ++this.activeQuestion : 0;

          if(this.activeQuestion === 0){
            this.error = true;
          }

          if(DataService.quizQuestions[this.activeQuestion].selected === null){
            breakOut = true;
          }
        }
      } else {
        this.activeQuestion = $index;
      }
    }

    this.questionAnswered = function() {
      var quizLength = dataService.quizQuestions.length;
      if(dataService.quizQuestions[this.activeQuestion].selected !== null) {
        numQuestionsAnswered++;

        if(numQuestionsAnswered >= quizLength){
          for(var i = 0; i < quizLength; i++){
              if(DataService.quizQuestions[i].selected === null){
                  setActiveQuestion(i);
                  return;
              }
          }
          this.error = false;
          this.finalise = true;
          return;
        }
      }
      this.setActiveQuestion();
    }

    this.selectAnswer = function(index) {
      dataService.quizQuestions[this.activeQuestion].selected = index;
    }

    this.finaliseAnswers = function() {
      this.finalise = false;
      numQuestionsAnswered = 0;
      this.activeQuestion = 0;
      quizMetrics.markQuiz();
      quizMetrics.changeState("quiz", false);
      quizMetrics.changeState("results", true);
    }
  }
})();
