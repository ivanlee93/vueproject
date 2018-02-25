var express = require("express");
var app = express();
var mongoose = require("mongoose");
var fs = require("fs");
var formidable = require("formidable");
var jwt = require('jsonwebtoken');
var passport = require('passport');// 用户认证模块passport
var Strategy = require('passport-http-bearer').Strategy;// token验证模块
var config = require('./config.js');

app.use(express.static("build"));
app.use(passport.initialize());

require('./passport.js')(passport);
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true
});
var Userinfo = require("./models/Userinfo.js")
var Department = require("./models/Department.js")
var Competent = require("./models/Competent.js")
var Position = require("./models/Position.js")
var Workschedules = require("./models/Workschedules.js")
var Client = require("./models/Client.js")
var Leave = require("./models/Leave.js")

// app.use(cors({
//     origin:['http://localhost:8080'],
//     methods:['GET','POST']
// }))

//查询用户信息接口
app.post("/all",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var CHAXUTI = {};
        fields.filters.forEach(item=>{
            CHAXUTI[Object.keys(item)[0]] = item[Object.keys(item)[0]]
        });
        // console.log(fields.filters);
        if(fields.pageandsort != 'all'){
            var {
                page,
                pagesize,
                sortby,
                sortdirection
            } = fields.pageandsort;

            console.log(CHAXUTI)
            Userinfo.count(CHAXUTI, function (err, amount) {
                Userinfo.find(CHAXUTI).sort({ [sortby]: sortdirection}).skip(pagesize * (page-1)).limit(pagesize).exec(function(err,data)   {
                    res.json({
                        "amount": amount,
                        "results": data
                    })
                })
            })
        }else{
            console.log(CHAXUTI)
            Userinfo.count(CHAXUTI, function (err, amount) {
                Userinfo.find(CHAXUTI).exec(function(err,data){
                    res.json({
                        "amount": amount,
                        "results": data
                    })
                })
            })
        }
    })
    // Userinfo.find({}).exec(function (err, data) {
    //     res.json({ "result": data });
    // });
    // Userinfo.count(CHAXUTI, function (err, amount) {
    //         Userinfo.find(CHAXUTI).sort({ [sortby]: sortdirection}).skip(pagesize * (page-1)).limit(pagesize).exec(function(err,data){
    //             res.json({
    //                 "amount": amount,
    //                 "results": data
    //             })
    //         })
    //     })
})

//查询部门信息接口
app.get("/alldepartment",passport.authenticate('bearer',{session:false}),function (req, res) {
    Department.find({}).exec(function (err, docs) {
        res.json({"results" : docs});
    });
});

//查询职位信息接口
app.get("/allposition",passport.authenticate('bearer',{session:false}),function (req, res) {
    Position.find({}).exec(function (err, docs) {
        res.json({"results" : docs});
    });
});

//查询职称信息接口
app.get("/allcompetent",passport.authenticate('bearer',{session:false}),function (req, res) {
    Competent.find({}).exec(function (err, docs) {
        res.json({"results" : docs});
    });
});

//增加用户信息接口
app.post("/useradd",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var {id,name,sex,birthdate,mobile,email,provicen,political,nation,nativeplace,position,competent,department,jobid,education,school,major,entry,become,contractstart,contractend,identity,employ,marital} = fields
        Userinfo.create({
            "id":id,
            "name":name,
            "sex":sex,
            "birthdate":birthdate,
            "mobile":mobile,
            "email":email,
            "provicen":provicen,
            "political":political,
            "nation":nation,
            "nativeplace":nativeplace,
            "position":position,
            "competent":competent,
            "department":department,
            "jobid":jobid,
            "education":education,
            "school":school,
            "major":major,
            "entry":entry,
            "become":become,
            "contractstart":contractstart,
            "contractend":contractend,
            "identity":identity,
            "employ":employ,
            "marital":marital
        },(err,data) => {
            res.json({
                    "results": data
            })
        })
    })
})

//修改用户信息接口
app.patch("/userchange",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var {id,name,sex,birthdate,mobile,email,provicen,political,nation,nativeplace,position,competent,department,jobid,education,school,major,entry,become,contractstart,contractend,identity,employ,marital} = fields
        console.log(fields)
        Userinfo.update({'id':[id]},{$set:{'name':[name],'sex':[sex],'birthdate':[birthdate],'mobile':[mobile],'email':[email],'provicen':[provicen],'political':[political],'nation':[nation],'nativeplace':[nativeplace],'position':[position],'competent':[competent],'department':[department],'jobid':[jobid],'education':[education],'school':[school],'major':[major],'entry':[entry],'become':[become],'contractstart':[contractstart],'contractend':[contractend],'identity':[identity],'employ':[employ],'marital':[marital]}},(err,data) => {
            if(!err){
                Userinfo.find({'id':[id]}).exec(function(err,data){
                    console.log(data)
                    res.json({
                    "results": data
                    })
                })
            }
        })
    })
})

//删除用户信息接口
app.delete("/userdel",passport.authenticate('bearer',{session:false}),function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        Userinfo.remove({
            'id':[fields.id]
        },(err,data)=>{
            if(!err){
                console.log(fields);
                res.json({
                    "results": fields
                })
            }
        })
        console.log(fields);
    })
});

//增加组织架构信息的接口
app.post("/organizationaladd",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var {key,val} = fields;
        console.log(fields);
        if(key=="department"){
            Department.create({
                "department":val
                },(err,data) => {
                    res.json({
                        "results": data
                })
            })
        }
        if(key=="position"){
            Position.create({
                "position":val
                },(err,data) => {
                    res.json({
                        "results": data
                })
            })
        }
        if(key=="competent"){
            Competent.create({
                "competent":val
                },(err,data) => {
                    res.json({
                        "results": data
                })
            })
        }
    })
})

//删除组织架构信息的接口
app.delete("/organizationaldel",passport.authenticate('bearer',{session:false}),function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        var {key,val} = fields;
        if(key=="department"){
            Department.remove({
                'department':val
            },(err,data)=>{
                if(!err){
                    console.log(fields);
                    res.json({
                        "results": fields
                    })
                }
            })
        }
        if(key=="position"){
            Position.remove({
                'position':val
            },(err,data)=>{
                if(!err){
                    console.log(fields);
                    res.json({
                        "results": fields
                    })
                }
            })
        }
        if(key=="competent"){
            Competent.remove({
                'competent':val
            },(err,data)=>{
                if(!err){
                    console.log(fields);
                    res.json({
                        "results": fields
                    })
                }
            })
        }
    })
});

// 查询日程数据的接口
app.get("/allworkschedule",passport.authenticate('bearer',{session:false}),function (req, res) {
    var year = Number(req.query.year);
    var month = Number(req.query.month);

    var pmonth = month == 1 ? 12 : month - 1;
    var nmonth = month == 12 ? 1 : month + 1;
    var pyear = month == 1 ? year - 1 : year;
    var nyear = month == 12 ? year + 1 : year;

    function buling(n) {
        return n.toString().length > 1 ? n.toString() : '0' + n.toString();
    };
    Workschedules.find({}).exec(function (err, docs) {
        var arr = docs.filter(function(item) {
            return item.start.substr(0, 6) == `${pyear}${buling(pmonth)}` ||
                item.end.substr(0, 6) == `${pyear}${buling(pmonth)}` ||

                item.start.substr(0, 6) == `${year}${buling(month)}` ||
                item.end.substr(0, 6) == `${year}${buling(month)}` ||

                item.start.substr(0, 6) == `${nyear}${buling(nmonth)}` ||
                item.end.substr(0, 6) == `${nyear}${buling(nmonth)}`
        });
        arr.sort(function(a, b) {
            return a.start - b.start
        })
        res.json({"results": arr});
    });

})

// 增加日程数据的接口
app.post("/addworkschedule",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){
        var {id,start,end,title} = fields;
        Workschedules.create({
                "id":id,
                "start":start,
                "end":end,
                "title":title
            },(err,data) => {
                res.json({
                "results": data
            })
        })
    })
})

// 删除日程数据的接口
app.delete("/delworkschedule",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){
        // console.log(fields.id);
        Workschedules.remove({id:[fields.id]},(err,data)=>{
            if(!err){
                res.json({
                    "results": fields.id
                })
            }
        })
    })
})

// 修改日程数据的接口
app.patch("/changeworkschedule",passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){
        var {id,start,end,title} = fields;
        Workschedules.update({id:[id]},{$set:{'start':[start],'end':[end],'title':[title]}},(err,data)=>{
            if(!err){
                res.json({
                    "results":fields
                })
            }
        })
    })
})

//注册新用户的接口,注册的用户名必须是userinfo中已存在的工号
app.post('/sigunp',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){
        var {id,key} = fields;
        if(!id || !key){
            res.json({success: false, message: '请输入账号密码!'});
        }else{
            Userinfo.count({jobid:id}, function (err, amount){
                if(!err){
                    if(amount>0){
                        var newClient = new Client({
                            appid:id,
                            appkey:key
                        });
                        newClient.save((err)=>{
                            if(err){
                                res.json({success: false, message: '注册失败!'});
                            }else{
                                res.json({success: true, message: '成功创建用户!'});
                            }
                        })
                    }else{
                        return res.json({success: false, message: '注册的id未激活!'});
                    }
                }
            })
        }
    })
})

// 登陆验证接口, 检查用户名与密码并生成一个token
app.post('/accesstoken',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields){
        var {id,key} = fields
        Client.findOne({appid:[id]},(err,user)=>{
            if(err){
                throw err;
            }
            if(!user){
                res.json({success: false, message:'认证失败,用户不存在!'});
            } else if(user){
                user.comparePassword(key,(err,isMatch)=>{
                    if(isMatch && !err){
                        var token = jwt.sign({name:user.appid},config.secret,{expiresIn:10080});
                        user.token = token;
                        user.save(function(err){
                            if(err){
                                res.send(err);
                            }
                        });
                        res.json({
                            success: true,
                            message: '验证成功!',
                            token: 'Bearer ' + token,
                            appid: user.appid
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "登陆失败 , 密码错误!"
                        });
                    }
                })
            }
        })
    })
})

//增加请假单的接口
app.post('/addleave',passport.authenticate('bearer',{session:false}),function(req,res){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
            var {jobid,leavetype,name,starttime,endtime,totaltime,leavereason} = fields
            Leave.create({
                "jobid":jobid,
                "name":name,
                "leavetype":leavetype,
                "starttime":starttime,
                "endtime":endtime,
                "totaltime":totaltime,
                "leavereason":leavereason
            },(err,data) => {
                res.json({
                "results": data
            })
        })
            // res.json({result:fields})
    })
})

//查询请假单的接口
app.get('/allleave',passport.authenticate('bearer',{session:false}),function(req,res){
    Leave.find({}).exec(function (err, data) {
        res.json({"results" : data});
    });
})

//删除请假单的接口
app.post('/delleave',passport.authenticate('bearer',{session:false}),function(req,res){
    var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
        Leave.remove({_id:[fields.id]},(err,data)=>{
            if(!err){
                res.json({
                    "results": fields.id
                })
            }
        })
    })
})

//下面两个为测试用调试接口
app.get('/info',passport.authenticate('bearer',{session:false}),function(req,res){
    res.json({appid:req.user.appid});
})

app.post('/test',passport.authenticate('bearer',{session:false}),function(req,res){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
            res.json({result:fields})
    })
})


app.listen(3000,()=>{
	console.log(3000);
});

// app.patch("/userchange",function(req,res){
//     var form = new formidable.IncomingForm();
//     form.parse(req,function(err,fields){
//         var {id,name,sex,birthdate,mobile,email,provicen,political,nation,nativeplace,position,competent,department,jobid,education,school,major,entry,become,contractstart,contractend,identity,employ,marital} = fields
//         console.log(fields)
//         Userinfo.update({'id':[id]},{$set:{'name':[name],'sex':[sex],'birthdate':[birthdate],'mobile':[mobile],'email':[email],'provicen':[provicen],'political':[political],'nation':[nation],'nativeplace':[nativeplace],'position':[position],'competent':[competent],'department':[department],'jobid':[jobid],'education':[education],'school':[school],'major':[major],'entry':[entry],'become':[become],'contractstart':[contractstart],'contractend':[contractend],'identity':[identity],'employ':[employ],'marital':[marital]}},(err,data) => {
//             if(!err){
//                 Userinfo.find({'id':[id]}).exec(function(err,data){
//                     console.log(data)
//                     res.json({
//                     "results": data
//                     })
//                 })
//             }
//         })
//     })
// })