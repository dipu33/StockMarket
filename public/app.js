var http=require('http');
var express=require('express');
var app=express();
var mongodb=require('../node_modules/mongoDb');
const jwt=require('../node_modules/jsonwebtoken');
var mongoclient=mongodb.MongoClient;
var server=app.listen(process.env.PORT||8888,function () {
    console.log("server is listing");
});
var url="mongodb://dipak:makvana@ds141490.mlab.com:41490/stockmarket";

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.post('/register',function (req,res) {
    var username=req.query.username;
    var password=req.query.password;
    var email=req.query.email;
    var b_day=req.query.b_day;
    var token = jwt.sign({_id: username}, 'abc123');
    console.log(token);
    mongoclient.connect(url,function (err,db) {
        if(err) {
            res.send(err);
        }
        else{

            var collection=db.collection('user_register');
            collection.find({
                $or:[
                    {
                        "username":username
                    },
                    {
                        "email":email
                    }
                ]
            }).toArray(function (err,data) {
                if(err){
                    res.send(0);
                }
                else{
                    if(data.length>0)
                    {
                        res.send('3');
                    }
                    else{

                        collection.insert({
                            "username":username,
                            "password":password,
                            "email":email,
                            "b_day":b_day,
                            "token":token
                        },function (err,result) {
                            if(err){
                                res.send("0");
                            }
                            else{
                                var collection1=db.collection("UserBudget")
                                collection1.insert({
                                    "UserName":username,
                                    "UserBudget":5000000
                                },function (err,res2) {
                                    if(err){
                                        console.log(err);

                                    }
                                    else {
                                        res.send("1");

                                    }
                                });
                            }
                        });
                    }
                }
            })
        }
    })
});
app.post('/login',function (req,res) {
    var username = req.query.username;
    var password = req.query.password;
    ////console.log(username);
    ////console.log(password);
    mongoclient.connect(url, function (err, db) {
        if (err)
            res.send(404);
        else {
            var collectinon = db.collection('user_register');
            collectinon.find({
                $and: [
                    {
                        "username": username

                    },
                    {
                        "password": password
                    }
                ]
            })
                .toArray(function (err, data) {
                    if (err) {
                        //res.json(err);
                        res.send(err);
                        res.send("2")
                    }
                    else {
                        ////console.log(data.length);
                        if (data.length > 0) {
                            var token=data[0].token;
                            console.log(token);
                            var decode=jwt.verify(token,'abc123',function (err,decoded) {
                                if(err){
                                    res.send("0");
                                }
                                else{
                                    console.log(decoded+"asssssssss");
                                    res.send(token);

                                }

                            });
                        }
                        else {
                            res.send("0");
                        }
                    }
                });
        }
    })
});
app.post('/get_details',function (req,res) {
    var username = req.query.username;
    console.log(username);
    ////console.log(password);
    mongoclient.connect(url, function (err, db) {
        if (err)
            res.send(404);
        else {
            var collectinon = db.collection('user_register');
            collectinon.find({
                     "username": username
                    }
            )
                .toArray(function (err, data) {
                    if (err) {
                        //res.json(err);
                        res.send(err);
                        res.send("2")
                    }
                    else {
                        ////console.log(data.length);
                        if (data.length > 0) {
                            res.send(JSON.stringify(data));
                        }
                        else {
                            res.send("0");
                        }
                    }
                });
        }
    })
});
app.post('/update_details',function (req,res) {
    var username = req.query.username;
    var password=req.query.password;
    console.log(username);
    ////console.log(password);
    mongoclient.connect(url, function (err, db) {
        if (err)
            res.send(404);
        else {
            var collectinon = db.collection('user_register');
            collectinon.update({"username":username},{$set:{"password":password}},function (err,dt) {
                    if(err){
                        res.send("0");
                    }
                    else{
                        res.send("1");
                    }
            });

        }
    })
});
app.post("/Get_Stock_Name",function (req,res) {
   var StringStoke=req.query.StockString;
   var StockExchange=req.query.StockExchange;

    console.log(StringStoke);
    console.log(StockExchange);
    mongoclient.connect(url,function (err,db) {
      if(err){
          res.send(404);
      }
      else{
          var collection=db.collection("Equity");
          // var tempstr="/.*"+StringStoke+".*/";
            collection.find({$and:[
                {"Stock_Sym":{$regex:StringStoke}},
                    {"Stock_Trand_In":StockExchange}
                ]}).toArray(function (err,data) {
                        res.send(JSON.stringify(data));

            })
      }
   });
});
app.post("/Get_Stock_Values",function (req,res) {
    var StringStoke=req.query.StockString;
    var StockExchange=req.query.StockExchange;
    console.log(StringStoke);
    console.log(StockExchange);
    mongoclient.connect(url,function (err,db) {
        if(err){
            res.send(404);
        }
        else{
            var collection=db.collection("Equity");
            // var tempstr="/.*"+StringStoke+".*/";
            collection.find({$and:[
                {"Stock_Sym":StringStoke},
                {"Stock_Trand_In":StockExchange}
            ]}).toArray(function (err,data) {
                if(data.length!=0) {
                    res.send(JSON.stringify(data));
                }
                else{
                    res.send(404);
                }
            })
        }
    });
});
app.post('/Get_Budget',function (req,res) {
    var username=req.query.UserName;
    mongoclient.connect(url,function (err,db) {
       if(err){
           res.send(404);
       }
        else{
           var collection=db.collection("UserBudget");
           collection.find({"UserName":username}).toArray(function (err,data) {
            if(err){
                res.send(404);
            }
                else{
                res.send(JSON.stringify(data));
            }
           })
       }
    });
})
app.post('/Insert_Order',function (req,res) {
var username=req.query.UserName;
var StockName=req.query.StockName;
var StockExchange=req.query.StockExchange;
var StockQnt=req.query.StockQnt;
var StockPrice=req.query.StockPrice;
var UserBudget=req.query.FinalBudget;
console.log("..........................................");
console.log(StockQnt);
console.log(StockPrice);
console.log(StockName);
console.log(UserBudget);
    console.log("..........................................");

mongoclient.connect(url,function (err,db) {
    if(err){
        res.send(404);
    }
    else{
        var collection=db.collection("StockBroker");
        collection.insert({
            "UserName":username,
            "StockExchange":StockExchange,
            "StockName":StockName,
            "StockPrice":StockPrice,
            "StockQnt":StockQnt
        },function (err,result) {
            if(err){
                res.send(err);
            }
            else{
                var collection1=db.collection("UserBudget");
                collection1.update({"UserName":username},{$set:{"UserBudget":UserBudget}},function (err,result) {
                    if(err){
                        res.send(404);
                    }
                    else{
                        res.send("1");
                    }
                })
            }
        })

    }
})
});