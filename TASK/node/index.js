console.log("hello world")

// ! nodeJS app

var validator = require('validator');
let dateDay = "2024-11-24"
console.log(validator.isDate(dateDay)); 

//  * what is node_Modules folder?
// فولدر يحتوي علي جميع الاكواد المهمة عند تحميل اداة معينى من npm

//  * What’s package.json file? And what are the dependencies key on it?
// بنحدد من حلالة بيانات المشروع و الاسكربت الخاص بالمشروع يعتبر زي هوية المشروع
// the dependencies key اللي جواها المكتبات اللي مثتبة في المشروع 

// * What’s events in Nodejs?
// إشارات بتنطلق لما يحصل حاجة معينة في التطبيق، زي لما عملية تخلص، أو المستخدم يتفاعل، أو النظام يرد على حاجة.

// * What’s express module in node js?
// هو إطار عمل مشهور مبني على نود، يُستخدم لتطوير مواقع الويب والسيرفرات