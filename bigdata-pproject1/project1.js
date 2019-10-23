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

var generateDivisionId = () => {
  var collection = db.divisions.find();
  var index = Math.floor(Math.random() * collection.length);
  return collection[index]._id;
};

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

  var index = Math.floor(Math.random() * 7);
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

  var index = Math.floor(Math.random() * 7);
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

  var index = Math.floor(Math.random() * 7);
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

  var index = Math.floor(Math.random() * 7);
  return collection[index];
};

var generatePhone = function() {
  var collection = ["089", "088", "087"];

  var index = Math.floor(Math.random() * 3);
  var phoneBuilder = collection[index];
  for (var i = 0; i < 7; i++) {
    var n = Math.floor(Math.random() * 9);
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

  var index = Math.floor(Math.random() * 7);
  return name + collection[index];
};

var generatePosition = function() {
  var collection = [
    "cashier",
    "accountant",
    "operator",
    "financial consultant"
  ];

  var index = Math.floor(Math.random() * 4);
  return collection[index];
};

var generateReportTo = function(name) {
  var collection = db.emplyees.find();
  var index = Math.floor(Math.random() * collection.length);
  var isReports = Math.round(Math.random());
  return isReports ? collection[index] : null;
};

var generateSalary = function() {
  return Math.floor(Math.random() * (6000 - 2000 + 1) + 2000);
};

var generateBirthCountry = function() {
  var collection = [
    "Bulgaria",
    "Ukraine",
    "Moldova",
    "Macedonia",
    "Spain",
    "Italy",
    "Germany"
  ];

  var index = Math.floor(Math.random() * 7);
  return collection[index];
};

var generateAccountName = function(currency) {
  var accountName;
  do {
    accountName = Math.floor(Math.random() * (700000000 - 30000000 + 1) + 30000000);
  } while (
    db.clients
      .find({ accounts: { name: accountName } }).count() > 0
  );
  return accountName;
};

var generateAccount = function() {
  var collection = ["BGN", "USD", "EUR"];
  var index = Math.floor(Math.random() * (3 - 1) + 1);
  var currency = collection[index];
  var accountName = generateAccountName(currency);
  return {
    name: accountName,
    currency: currency,
    balance: Math.floor(Math.random() * 700000)
  };
};

// Seeding

var seed = function() {
  // employees
  for (var i = 0; i < 20; i++) {
    var fname = generateFname();
    var lname = generateLname();
    var sname = generateSname();
    var reportTo = generateReportTo();
    var division = generateDivisionId();
    db.employees.insert({
      fname: fname,
      lname: lname,
      address: generateAddress(),
      cellphone: generatePhone(),
      position: generatePosition(),
      salary: generateSalary(),
      birthCountry: generateBirthCountry()
    });
    var currentEmployee = db.employees.find({
      $and: [{ fname: fname }, { lname: lname }]
    })[0];
    if (!!sname) {
      db.update(
        { _id: currentEmployee._id },
        {
          sname: sname
        }
      );
    }
    if (!!reportTo) {
      db.update(
        { _id: currentEmployee._id },
        {
          reportTo: reportTo
        }
      );
    }
  }

  // clients
  for (var i = 0; i < 50; i++) {
    var fname = generateFname();
    var lname = generateLname();
    db.clients.insert({
      fname: fname,
      lname: lname,
      address: generateAddress(),
      cellphone: generatePhone(),
      email: generateEmail(),
      accounts: [
        {
          name: "BG50UNCR300037737",
          currency: "BGN",
          balance: 0
        }
      ]
    });
    var currentClient = db.clients.find({
      $and: [{ fname: fname }, { lname: lname }]
    })[0];
    if (!!sname) {
      db.update(
        { _id: currentClient._id },
        {
          sname: sname
        }
      );
    }
  }
};

// ================== 1 ======================

// ------------------ 3 ----------------------

var generateEmployeeEmail = () => {
  db.emplyees.find().forEach(function(e) {
    db.emplyees.update(
      { _id: e._id },
      {
        email:
          e.fname.toLowerCase() + e.lname.toLowerCase() + "@bankoftomarow.bg"
      }
    );
  });
};
