// Divisions
db.divisions.insert({
  name: "Operations"
});
db.divisions.insert({
  name: "Loan"
});
db.divisions.insert({
  name: "Deposit"
});

var generateDivision = () => {
  var collection = db.divisions.find();
  var index = Math.floor(Math.random() * (collection.length - 1) + 1);
  return collection[index]._id;
}

// generators
var generateFname = function() {
  var collection = [
    "Mihail",
    "Ivan",
    "Serioja",
    "Nikola",
    "Vladimir",
    "Anastasija",
    "Ekaterina"
  ];

  var index = Math.floor(Math.random() * (7 - 1) + 1);
  return collection[index];
};

var generateLname = function() {
  var collection = [
    "Petrov",
    "Ivanov",
    "Jozik",
    "Toskov",
    "Putin",
    "Kozareva",
    "Velika"
  ];

  var index = Math.floor(Math.random() * (7 - 1) + 1);
  return collection[index];
};

var generateSname = function() {
  var collection = [
    "Petrov",
    "Ivanov",
    "Jozik",
    "Toskov",
    "Putin",
    "Kozareva",
    "Velika"
  ];

  var index = Math.floor(Math.random() * (7 - 1) + 1);
  var hasSname = Math.round(Math.random());
  return hasSname ? collection[index] : null;
};

var generateAddress = function() {
  var collection = [
    "236, Bulgaria blvd., Plovdiv",
    "12, Vasil Aprilov st., Plovdiv",
    "178, Sredets sq., Sofia",
    "1, Gladston st., Plovdiv",
    "15, Mladezhki hylm, Plovdiv",
    "46, Svoboda blvd., Plovdiv",
    "55, Pobeda st., Plovdiv"
  ];

  var index = Math.floor(Math.random() * (7 - 1) + 1);
  return collection[index];
};

var generatePhone = function() {
  var collection = [
    "089",
    "088",
    "087"
  ];

  var index = Math.floor(Math.random() * (3 - 1) + 1);
  var phoneBuilder = collection[index];
  for (var i = 0; i < 7; i++) {
    var n = Math.floor(Math.random() * (9 - 1));
    phoneBuilder.concat(n);
  }
  return phoneBuilder;
};

var generateEmail = function(name) {
  var collection = [
    "@google.com",
    "@hotmail.com",
    "@live.com",
    "@abv.bg",
    "@mail.com",
    "@email.bg",
    "@freemail.com"
  ];

  var index = Math.floor(Math.random() * (7 - 1) + 1);
  return name + collection[index];
};

var generatePosition = function() {
  var collection = [
    "cashier",
    "accountant",
    "operator",
    "financial consultant"
  ];

  var index = Math.floor(Math.random() * (4 - 1) + 1);
  return collection[index];
};

var generateReportTo = function(name) {
  var collection = db.emplyees.find();
  var index = Math.floor(Math.random() * (collection.length - 1) + 1);
  var isReports = Math.round(Math.random());
  return isReports ? collection[index] : null
}

var generateSalary = function() {
  return Math.floor(Math.random() * (6000 - 2000 + 1) + 2000);
}

// Seeding

var seed = function() {
  for (var i = 0; i < 20; i++) {}
};

// Emplyees
db.emplyees.insert({
  fname: "Ivan",
  lname: "Dzheferov",
  sname: "S",
  address: "236, Bulgaria blvd, Plovdiv",
  cellphone: "0892345678",
  email: "ivand@mail.bg",
  position: "developer",
  reportTo: "",
  salary: 4000,
  divisions: [
    {
      division_id: "",
      beginDate: new Date("2006-11-12"),
      endDate: new Date("2019-01-01")
    },
    {
      division_id: "",
      beginDate: new Date("2019-01-01")
    }
  ],
  birthCountry: "Bulgaria",
  mother: true
});

// Clients
db.clients.insert({
  fname: "Ivan",
  lname: "Dzheferov",
  sname: "S",
  address: "236, Bulgaria blvd, Plovdiv",
  cellphone: "0892345678",
  email: "ivand@mail.bg",
  accounts: [
    {
      name: "BG50UNCR300037737",
      currency: "BGN",
      balance: 1200
    },
    {
      name: "BG50UNCR3000377US",
      currency: "USD",
      balance: 0
    }
  ]
});


// ================== 1 ======================

// ------------------ 3 ----------------------

var generateEmployeeEmail = () => {
  db.emplyees.find().forEach(function(e){
    db.emplyees.update({ _id : e._id},{
      email : e.fname.toLowerCase() + e.lname.toLowerCase() + '@bankoftomarow.bg'
    })
  })
}