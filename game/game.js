const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: " ﻣﻨﺎﺑﻊ ﻣﻬﻢ ﺳﯿﺮة کدام ها آند: ",
        choice1: "قرآنکریم",
        choice2: "سنت نبوی",
        choice3: "هر دو",
        choice4: "هیچکدام",
        answer: 3
    },
    {
        question: " ﻫﺪف از ﻣﻄﺎﻟﻌﻪ ﺳﯿﺮة ﻧﺒﻮي ﭼﯿﺴت؟ ",
        choice1: "پیروی کردن از سنت پیامبر اسلام (ص)",
        choice2: "اسوة قرار دادن پیامبر (ص)  ",
        choice3: "حرکت نمودن در مسیر سنت",
        choice4: "همه درست است",
        answer: 4
    },
    {
        question: "نسب پیامبرﷺ تا کجا ذکر شده:",
        choice1: " اسماعیل پسر ابراهیم",
        choice2: "عبدالمناف",
        choice3: " کعب ",
        choice4: " کنانه ",
        answer: 1
    },
    {
        question: "پیامبرﷺ در چه سالی به دنیا آمد؟",
        choice1: "571 م",
        choice2: "572 م",
        choice3: "751 م",
        choice4: "521 م",
        answer: 1
    },
    {
        question: "چی اتفاقی با ولادت پیامبرﷺ در دنیا بوجود آمد؟ ",
        choice1: "نوری بسوی آسمان بالا رفت",
        choice2: "آتشکده فارس خاموش شد",
        choice3: " 14 کنگره ای از ایوان کسری شکست ",
        choice4: "همه درست است",
        answer: 4
    },
    {
        question: " پیامبرﷺ چه مدت در نزد حلیمه ماند؟ ",
        choice1: "6 سال",
        choice2: "3 سال",
        choice3: "5 سال",
        choice4: "4 سال",
        answer: 4
    },
    {
        question: "چه کسی نام محمد را برای پیامبرﷺ برگزید",
        choice1: "پدرش عبدالله",
        choice2: "مادرش بی بی آمنه",
        choice3: "کاکایش ابو طالب",
        choice4: "پدر بزرگش عبدالمطلب ",
        answer: 4
    },
    {
        question: "پیامبرﷺ در چه سرزمینی بدنیا آمد؟ ",
        choice1: " مدینه ",
        choice2: " مکه",
        choice3: "شام",
        choice4: "یثرب",
        answer: 2
    },
    {
        question: "  چه حادثه ای برای پیامبرﷺ زمانی که در نزد حلیمه بود روی داد؟ ",
        choice1: "شهید شدن دندان مبارک ",
        choice2: " شق القمر",
        choice3: "شق الصدر",
        choice4: "هیچکدام",
        answer: 3
    },
    {
        question: " پیامبرﷺ در چه سنی مادرش را از دست داد؟",
        choice1: " 9 سالگی ",
        choice2: " 7 سالگی",
        choice3: "8 سالگی",
        choice4: "6 سالگی",
        answer: 4
    },
    {
        question: "چه کسی بعد از وفات مادرش سرپرستی پیامبر را بر عهده گرفت؟ ",
        choice1: " ابو طالب ",
        choice2: " عبدالمطلب",
        choice3: "ابو لهب",
        choice4: "حمزه",
        answer: 2
    },
    {
        question: " پس از وفات پدر بزرگش چه کسی سرپرستی او را به عهده گرفت؟  ",
        choice1: " ابو طالب ",
        choice2: "عباس",
        choice3: "ابو لهب",
        choice4: "حمزه",
        answer: 1
    },
    {
        question: " پیامبرﷺ در چند سالگی با خدیجه ازدواج نمود؟  ",
        choice1: " 32 سالگی ",
        choice2: " 23 سالگی",
        choice3: "25 سالگی",
        choice4: " 35 سالگی ",
        answer: 3
    },
    {
        question: "   چه انگیزه ای باعث شد که خدیجه از پیامبرﷺ خواستگاری نماید؟  ",
        choice1: "اخلاق نیک ",
        choice2: " رفتار نیک",
        choice3: "امانتداری",
        choice4: "همه درست است",
        answer: 4
    },
    {
        question: "پیامبرﷺ در هنگام بروز اختلاف در میان قبایل قریش در مـورد نصـب سـنگ حجرلاسود در دیوار کعبه چند سال داشت؟ ",
        choice1: "25 سال ",
        choice2: " 30 سال",
        choice3: "35 سال",
        choice4: "40 سال ",
        answer: 3
    },
    {
        question: "کدام کتاب های آسمانی به بعثت محمدﷺ بشارت داده اند؟ ",
        choice1: " تورات",
        choice2: " انجیل",
        choice3: "زبور",
        choice4: " گزینه 1 و 2 درست است ",
        answer: 4
    },
    {
        question: "نام غاری که پیامبر در آن خلوت مینمود چیست؟  ",
        choice1: " غار ثور ",
        choice2: "  غار حراء ",
        choice3: "غار نور",
        choice4: "هیچکدام ",
        answer: 2
    },
    {
        question: "اولین آیه قرآنی که بر پیامبرﷺ نازل شد چه بود؟ ",
        choice1: "الم، ‌‌‌ذالک الکتاب",
        choice2: "ن والقلم",
        choice3: "اقرأ باسم ربک",
        choice4: "الحمد الله رب العالمین",
        answer: 3
    },
    {
        question: "یکی از اصحاب ذیل به مدت ده سال در خدمت رسول الله (ص) بودند: ",
        choice1: "علی (رض)",
        choice2: "عمر (رض)",
        choice3: "ابوهریرة (رض)",
        choice4: "انس (رض)",
        answer: 4
    },
    {
        question: "حضرت محمدﷺ با عایشه (رض) در یکی از سالهای ذیل ازدواج نمود: ",
        choice1: "سال دوم هجری",
        choice2: "سال هفتم هجری",
        choice3: "سال نهم هجری",
        choice4: "سال چهارم هجری",
        answer: 1
    },
    {
        question: "اوﻟﯿﻦ افرادی ﮐﻪ ﻧﻮر اﺳﻼم وارد دل ﻫﺎﯾﺸﺎن ﺷﺪ کدام ها آند؟ ",
        choice1: " خدیجه (رض)",
        choice2: " علی (رض)",
        choice3: "ابوبکر صدیق",
        choice4: "همه درست است",
        answer: 4
    },
    {
        question: " ﭼﻪ ﮐﺴﯽ ﺑﻼل را از دﺳﺖ ﮐﺴﺎﻧﯽ ﮐﻪ او را ﺷﮑﻨﺠﻪ ﻣﯽ کردند آزاد ﻧﻤﻮد؟ ",
        choice1: "عمر (رض)",
        choice2: "ابوبکر صدیق",
        choice3: "عثمان (رض)",
        choice4: "علی (رض)",
        answer: 2
    },
    {
        question: " اوﻟﯿﻦ ﻫﺠﺮت ﻣﺴﻠﻤﺎﻧﺎن از ﻣﮑﻪ ﺑﻪ ﮐﺠﺎ ﺻﻮرت ﮔﺮﻓﺖ؟ ",
        choice1: "شام",
        choice2: "مصر",
        choice3: "حبشه",
        choice4: "یمن",
        answer: 3
    },
    {
        question: "  بیشترین فرزندان پیامبرﷺ از کدام همسر وی بودند؟ ",
        choice1: "حضرت بی بی اسما",
        choice2: "حضرت بی بی عایشه صدیقه",
        choice3: " حضرت بی بی خدیجه (رضی الله عنها)",
        choice4: "حضرت بی بی سوده ",
        answer: 3
    },
    {
        question: "  تعداد فرزندان دختر و پسر پیامبرﷺ به چه تعداد میرسید؟ ",
        choice1: "2 دختر و 5 پسر",
        choice2: "4 دختر و 3 پسر",
        choice3: " 4 پسر و 3 دختر",
        choice4: "5 دختر و 2 پسر",
        answer: 2
    },
    {
        question: "  اسم دختران پیامبرﷺ چه بود؟  ",
        choice1: "زﯾﻨﺐ، عایشه، ام ﮐﻠﺜﻮم و ﻓﺎﻃﻤﻪ ",
        choice2: "اسما، زینب، ام ﮐﻠﺜﻮم و ﻓﺎﻃﻤﻪ ",
        choice3: "زﯾﻨﺐ، رﻗﯿﻪ، ام ﮐﻠﺜﻮم و ﻓﺎﻃﻤﻪ ",
        choice4: "اسما، رﻗﯿﻪ، ام ﮐﻠﺜﻮم و ﻓﺎﻃﻤﻪ ",
        answer: 3
    },
    {
        question: " نخستین فرزند پیامبرﷺ چه نام داشت؟  ",
        choice1: "ام کلثوم",
        choice2: "رقیه",
        choice3: "عبدالله",
        choice4: "قاسم",
        answer: 4
    },
    {
        question: "  اسم پسران پیامبرﷺ چه بود؟ ",
        choice1: "ابراهیم، عبدالله، سعد",
        choice2: "قاسم، عبدالله، ابراهیم",
        choice3: " عبدالله، قاسم، عمر",
        choice4: "ابراهیم، قاسم، انس",
        answer: 2
    },
    {
        question: " چه کسی با رقیه دختر پیامبرﷺ ازدواج نمود؟  ",
        choice1: "ﻋﻤﺮو ﺑﻦ ﻋﻤﯿﺮ ",
        choice2: "ﻋﻠﯽ ﺑﻦ اﺑﯽ ﻃﺎﻟﺐ ",
        choice3: " اﺑﻮﻋﺎص اﺑﻦ رﺑﯿﻊ ",
        choice4: "عثمان بن عفان",
        answer: 4
    },
    {
        question: "  پیغمبرﷺ در کدام سال به طایف سفر کرد؟ ",
        choice1: "سال دهم بعثت",
        choice2: "سال هشتم بعثت",
        choice3: "سال چهارم بعثت",
        choice4: "سال دوم بعثت",
        answer: 1
    },
    {
        question: "چی کسی در اسرا و معراج پیامبرﷺ را همراهی نمود؟ ",
        choice1: " حضرت عمر (رض) ",
        choice2: "عثمان بن عفان",
        choice3: " جبرایل امین ",
        choice4: "حضرت علی (رض)",
        answer: 3
    },
    {
        question: " پیامبرﷺ در سفر معراج با چی کسانی ملاقات نمود؟  ",
        choice1: "  ادم (علیه سلام)  و  ابراهیم (علیه سلام)",
        choice2: "عیسی (علیه سلام) و یوسف (علیه سلام) ",
        choice3: "هارون (علیه سلام) و موسی (علیه سلام",
        choice4: "همه درست است",
        answer: 4
    },
    {
        question: "   پیامبرﷺ به همراه ابوبکر (رض) چی مدت درغار حرا ماند؟ ",
        choice1: "دو شبانه روز",
        choice2: "سه شبانه روز",
        choice3: "چهار شبانه روز",
        choice4: "یک شبانه روز",
        answer: 2
    },
    {
        question: "   پیامبرﷺ چی وقت به مدینه رسید؟  ",
        choice1: " روز دوم ماه ربیع الثانی ",
        choice2: " روز دوم ماه ربیع الاول ",
        choice3: " روز سوم ماه ربیع الاول ",
        choice4: "روز سوم ماه ربیع الثانی ",
        answer: 2
    },
    {
        question: "   پیامبرﷺ ﺑﻌﺪ از وارد ﺷﺪن ﺑﻪ ﻣﺪﯾﻨﻪ ﺑﻪ ﻣﻨﺰل ﭼﻪ ﮐﺴﯽ رﻓﺖ؟ ",
        choice1: "ﻋﺒﺪاﷲ ﺑﻦ زﺑﯿﺮ",
        choice2: " ﺳﺎﻟﻢ ﺑﻦ ﻋﻮف ",
        choice3: "اﺑﻮاﯾﻮب اﻧﺼﺎري",
        choice4: " ﻋﺒﺪاﷲ ﺑﻦ زﯾﺪ ",
        answer: 3
    },
    {
        question: " دو صحابه که در رؤیا نحوه اذان را یاد گرفتند نام ببرید؟   ",
        choice1: "عبدالله بن زید و عمر بن خطاب ",
        choice2: " بلال حبشی و عبدالله بن ام مکتوم ",
        choice3: " بلال حبشی و عبدالله بن زید ",
        choice4: " عمر بن خطاب و عبدالله بن ام مکتوم ",
        answer: 1
    },
    {
        question: " غزوه چیست؟ ",
        choice1: " نبردهایی که پیامبرﷺ در آن حضور نداشتند",
        choice2: "نبردهایی که پیامبرﷺ در آن حضور داشتند",
        choice3: "هر دو",
        choice4: "هیچکدام",
        answer: 2
    },
    {
        question: "   روزه ماه رمضان در چه ماهی واجب شد؟ ",
        choice1: "در ماه ربیع الاول سال سوم هجری ",
        choice2: "در ماه ربیع الاول سال دوم هجری ",
        choice3: "در ماه شعبان سال سوم هجری ",
        choice4: "در ماه شعبان سال دوم هجری ",
        answer: 4
    },
    {
        question: " پیامبرﷺ نامه های خود را برای پادشاهان با چه چیزی مهر میکرد؟ ",
        choice1: "انگشتری از مس ",
        choice2: "انگشتری از طلا ",
        choice3: "انگشتری از نقره ",
        choice4: "هیچکدام",
        answer: 3
    },
    {
        question: "   پیامبرﷺ پرچم مهاجرین را در ﻏﺰوه اﺣﺪ ﺑﻪ دﺳﺖ ﭼﻪ ﮐﺴﯽ داد؟ ",
        choice1: "  اﺳﯿﺪ ﺑﻦ ﺣﻀﯿﺮ",
        choice2: "ﻣﺼﻌﺐ ﺑﻦ ﻋﻤﯿﺮ",
        choice3: " عبدالله بن زید",
        choice4: "یک شبانه روز",
        answer: 2
    },
    {
        question: "ﭘﺲ از ﻓﺘﺢ ﻣﮑﻪ، ﭘﯿﺎﻣﺒﺮﷺ ﭼﻨﺪ روز در ﻣﮑﻪ اﻗﺎﻣﺖ ﮔﺰﯾﺪ؟ ",
        choice1: "18 روز ",
        choice2: "16 روز",
        choice3: " 14 روز",
        choice4: "12 روز",
        answer: 1
    },
    {
        question: "ﭘﯿﺎﻣﺒﺮﷺ  ﭼﻨﺪ ﺳﺎﻟﻪ ﺑﻮد ﮐﻪ ﺑﺎ ﻋﻤﻮﯾﺶ ﺑﻪ ﺷﺎم ﺳﻔﺮ ﻧﻤﻮد؟",
        choice1: "12 سال ",
        choice2: "14 سال",
        choice3: "16 سال",
        choice4: "18 سال",
        answer: 1
    },
    {
        question: "ﭘﯿﺎﻣﺒﺮﷺ در ﭼند سالگی ﺑﻪ ﭘﯿﺎﻣﺒﺮي ﻣﺒﻌﻮث ﮔﺮدﯾﺪ؟ ",
        choice1: "30 سالگی ",
        choice2: "35 سالگی",
        choice3: "40 سالگی",
        choice4: "45 سالگی",
        answer: 3
    },
    {
        question: "کدام یک از دختران ﭘﯿﺎﻣﺒﺮﷺ بعد از وفات ایشان زنده ماند؟ ",
        choice1: "رقیه ",
        choice2: "فاطمه",
        choice3: "ام کلثوم",
        choice4: "زینب",
        answer: 2
    },
    {
        question: "ﮐﺪام ﯾﮏ از ﻋﺒﺎدات در ﻣﻌﺮاج ﻓﺮض ﮔﺮدﯾﺪ؟ ",
        choice1: "زکات ",
        choice2: "روزه",
        choice3: "حج",
        choice4: "  نماز های پنجگانه",
        answer: 4
    },
    {
        question: "بر انگشتر پیامبرﷺ چه چیز نقش بسته شده بود؟  ",
        choice1: "لا اله الا الله ",
        choice2: "سبحان الله",
        choice3: "محمد رسول الله",
        choice4: " الله اکبر",
        answer: 3
    },
    {
        question: " بالای رسولﷺ کی محمد نام گذاشت؟ ",
        choice1: "مادرش آمنه",
        choice2: "پدرش عبدالله",
        choice3: "کاکایش ابو طالب",
        choice4: " جدش عبدالمطلب",
        answer: 4
    },
    {
        question: "سخنان بحیرای راهب در مورد محمدﷺ چی بود؟ ",
        choice1: "گفت این سرور جهانیان است ",
        choice2: "گفت این سفیر پروردگار است",
        choice3: "گفت این کسی است که خداوند او را برای رحمت برگزیده است",
        choice4: " همه درست است",
        answer: 4
    },
    {
        question: "کیفیت روزه پیامبرﷺ قبل از واجب شدن روزه ماه رمضان چگونه بود؟  ",
        choice1: "سه روز از هر ماه را روزه میگرفت ",
        choice2: "چهار روز از هر ماه را روزه میگرفت",
        choice3: "دو روز از هر ماه را روزه میگرفت",
        choice4: "پنج روز از هر ماه را روزه میگرفت",
        answer: 1
    },
    {
        question: "خداوند زکات مال را در چه سالی واجب فرمود؟   ",
        choice1: " سال سوم هجری ",
        choice2: " سال دوم هجری ",
        choice3: " سال چهارم هجری ",
        choice4: " سال اول هجری ",
        answer: 2
    },
    {
        question: " خدیجه در هنگام ازدواج با پیامبرﷺ چند سال داشت؟",
        choice1: "30 سال ",
        choice2: "35 سال",
        choice3: "40 سال",
        choice4: "45 سال",
        answer: 3
    },
];

const CORRECT_BONUS = 2;
const MAX_QUESTION = 50;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () =>  {

if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
   localStorage.setItem("mostRecentScore", score);
     return window.location.assign("/end.html");
}

   questionCounter++;
  // questionCounterText.innerHTML = questionCounter + "/" + MAX_QUESTION;
   questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
  
  //Update the progressBar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
  
   const questionIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;
  

  choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText= currentQuestion["choice" + number];
});


 availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

};

 choices.forEach((choice) => {
   choice.addEventListener("click", (e) => {

       if(!acceptingAnswers ) return;

           acceptingAnswers = false; 
           const selectedChoice = e.target;
           const selectedAnswer = selectedChoice.dataset["number"];
   
        const classToApply = 
           selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
           if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
           }
           selectedChoice.parentElement.classList.add(classToApply);

           setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
   
        }); 
    }); 

    incrementScore = num => {
      score += num;
      scoreText.innerText = score;
    }

    show = () => {
   
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }
startGame();