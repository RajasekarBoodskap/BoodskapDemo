var Routes = function (app) {

    this.app = app;
    this.init();

};
module.exports = Routes;


Routes.prototype.init = function () {

    var self = this;

    //Session check each routes
    var sessionCheck = function (req, res, next) {
        var sessionObj = req.cookies['session_obj'];
        if (sessionObj) {
            next();
        } else {
            res.redirect('/login');
        }
    };

    //Role based session check
    var onlyAdmin = function (req, res, next) {
        var sessionObj = req.cookies['session_obj'];
        if (sessionObj) {
            var role = JSON.parse(sessionObj).user.roles;
            req.session.sessionObj = JSON.parse(sessionObj);

            if (role.indexOf('admin') !== -1 || role.indexOf('domainadmin') !== -1) {
                next();
            } else {
                console.log(new Date() + " | unauthorized access");
                res.sendStatus(401)
            }
        } else {
            res.redirect('/login');
        }
    };


    self.app.get('/', sessionCheck, function (req, res) {

        res.redirect('/dashboard');

    });

    self.app.get('/login', function (req, res) {
        var sessionObj = req.cookies['session_obj'];
        if (sessionObj) {
            res.redirect('/dashboard');
        } else {
            res.render('login.html', {layout: false});
        }
    });

    self.app.get('/dashboard', sessionCheck, function (req, res) {
        res.render('dashboard.html', {layout: ''});
    });

    /******************
     To add new routes
     ===================

     without session check
     =====================
     self.app.get('/<url_path_name>', function (req, res) {
        res.render('<html_name>.html', {layout: ''});
     });

     with session check
     ==================
     self.app.get('/<url_path_name>', sessionCheck, function (req, res) {
        res.render('<html_name>.html', {layout: ''});
     });


     ****************/

    self.app.get('/records', function (req, res) {
        res.render('records.html', {layout: ''});
    });
    self.app.get('/login', function (req, res) {
        res.render('login.html', {layout: ''});
    });
    self.app.get('/layout', function (req, res) {
        res.render('layout.html', {layout: ''});
    });
    self.app.get('/header' , function (req, res) {
        res.render('layout/header.html', {layout: ''});
    });
    self.app.get('/footer' , function (req, res) {
        res.render('layout/footer.html', {layout: ''});
    });

    self.app.get('/leftmenu' , function (req, res) {
        res.render('layout/leftmenu.html', {layout: ''});
    });

    self.app.get('/managerecord', function (req, res) {
        res.render('organizationrecord.html', {layout: ''});
    });
    self.app.get('/roledetails', function (req, res) {
        res.render('orgnizationroles.html', {layout: ''});
    });
    self.app.get('/userdetails', function (req, res) {
        res.render('organizationuserlist.html', {layout: ''});
    });
    self.app.get('/userrolelist', function (req, res) {
        res.render('orguserroles.html', {layout: ''});
    });
    // self.app.get('/organizationexample', function (req, res) {
    //     res.render('example.html', {layout: ''});
    // });
    // self.app.get('/devicelist', function (req, res) {
    //     res.render('devicelist.html', {layout: ''});
    // });
    // self.app.get('/tablesearch', function (req, res) {
    //     res.render('tablesearch.html', {layout: ''});
    // });
    // self.app.get('/organizationdetails', function (req, res) {
    //     res.render('organizationdetails.html', {layout: ''});
    // });
    // self.app.get('/homecostdetails', function (req, res) {
    //     res.render('homecost.html', {layout: ''});
    // });
    self.app.get('/employeelist', function (req, res) {
        res.render('employeelist.html', {layout: ''});
    });



    self.app.get('/404', sessionCheck, function (req, res) {
        res.render('404.html', {layout: '', userRole: req.session.role});
    });

    self.app.get('/:key', function (req, res) {
        var sessionObj = req.cookies['session_obj'];
        if (!sessionObj) {
            res.render('login.html', {layout: false});

        } else {
            res.redirect("/404");
        }

    });


};

