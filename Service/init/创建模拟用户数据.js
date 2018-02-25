var path = require("path");
var fs = require("fs");
var mockjs = require("mockjs");
//必须这么写，不用管原因，这是别人发明的包：
var Random = mockjs.Random;

 
//得到要生成的文件的地址
var monishujudizhi = path.resolve(__dirname, "用户模拟数据.txt");

//先删除要得到的文件
fs.writeFileSync(monishujudizhi , "");
console.log("用户模拟数据.txt文件已经清空，下面我为你生成新的");
var Arr = ["汉族", "壮族", "满族", "回族", "苗族","维吾尔族"];
var Arr2 = ["前端工程师", "项目经理", "销售", "后台工程师", "运维", "产品经理"];
var Arr3 = ["研发一部", "产品一部", "销售部", "运维部", "研发二部", "产品二部"];
var Arr4 = ["大专", "本科", "研究生", "博士"];
var Arr5 = ["北京大学", "清华大学", "武汉大学", "复旦大学","浙江大学"];
var Arr6 = ["计算机专业", "土木工程", "广播电视学", "商务英语", "金融工程"];
var Arr7 = ["已婚", "未婚", "离异"];
var date1 = 2010;
for (let i = 0; i < 200 ; i++){
    let o = {};
    //姓名
	var str = "1234567890",id="";
	for(var d=0;d<8;d++){
        id+=str[~~(Math.random()*str.length)];
    }
	o.id=""+id;
    o.name = Random.cname();
    o.sex = Math.random() > 0.5 ? "男" : "女" ;
    o.birthdate = ""+Date.parse(new Date(new Date() - Random.integer(86400000, 86400000 * 365 * 15)));
	//Random.date()
    //手机号
    o.mobile = ""+mockjs.mock(/^1[0-9]{10}$/);
    //邮箱
    o.email = Random.email();
    //省份
    o.provicen = Random.county(true);
    o.political = Math.random() > 0.5 ? "共青团员" : "无";
    o.nation = Arr[~~(Math.random() * Arr.length)];
    o.nativeplace = mockjs.mock('@province()');
    o.position = Arr2[~~(Math.random() * Arr2.length)];
    o.competent = '无'
    o.department = Arr3[~~(Math.random() * Arr3.length)];
    // if (i.toString().length ==1){
         // o.jobid = `00${i}`
    // } else if (i.toString().length ==2){
         // o.jobid = `0${i}`
    // } else {
         // o.jobid = i
    // }
	o.jobid = ""+(i+100)
    o.education = Arr4[~~(Math.random() * Arr4.length)];
    o.school = Arr5[~~(Math.random() * Arr5.length)];
    o.major = Arr6[~~(Math.random() * Arr6.length)];
    o.entry = ""+Date.parse(new Date(new Date() - Random.integer(86400000, 86400000 * 365 * 15)));
    o.become = ""+Date.parse(new Date(new Date() - Random.integer(86400000, 86400000 * 365 * 15)));
    o.contractstart = ""+Date.parse(new Date(new Date() - Random.integer(86400000, 86400000 * 365 * 15)));
    o.contractend = ""+Date.parse(new Date(new Date() - Random.integer(86400000, 86400000 * 365 * 15)));
    o.identity = mockjs.mock(/^44[0-9]{16}$/);
    o.employ = Math.random() > 0.5 ? "劳动合同" : "劳务合同";
    o.marital = Arr7[~~(Math.random() * Arr7.length)];
	//o.age = ~~(Math.random() * 20)+19


    console.log(i.toString().length);
    
    //直接追加到文件中,末尾的那个杠n杠r表示换行
    fs.appendFileSync(monishujudizhi, JSON.stringify(o) + "\n\r");
}
console.log("模拟数据写入成功！快打开模拟数据.txt看看吧！");

 

