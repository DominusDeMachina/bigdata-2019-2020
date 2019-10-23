// generators
let generateFname = function() {
  let collection = [
    "Mihail",
    "Ivan",
    "Serioja",
    "Nikola",
    "Vladimir",
    "Anastasija",
    "Ekaterina"
  ];

  let index = Math.floor(Math.random() * 7);
  return collection[index];
};

let generateLname = function() {
  let collection = [
    "Petrov",
    "Ivanov",
    "Jozik",
    "Toskov",
    "Putin",
    "Kozareva",
    "Velika"
  ];

  let index = Math.floor(Math.random() * 7);
  return collection[index];
};

let generateSname = function() {
  let collection = [
    "Petrov",
    "Ivanov",
    "Jozik",
    "Toskov",
    "Putin",
    "Kozareva",
    "Velika"
  ];

  let index = Math.floor(Math.random() * 7);
  let hasSname = Math.round(Math.random());
  return hasSname ? collection[index] : null;
};

let generateAddress = function() {
  let collection = [
    "236, Bulgaria blvd., Plovdiv",
    "12, Vasil Aprilov st., Plovdiv",
    "178, Sredets sq., Sofia",
    "1, Gladston st., Plovdiv",
    "15, Mladezhki hylm, Plovdiv",
    "46, Svoboda blvd., Plovdiv",
    "55, Pobeda st., Plovdiv"
  ];

  let index = Math.floor(Math.random() * 7);
  return collection[index];
};

let generatePhone = function() {
  let collection = ["089", "088", "087"];

  let index = Math.floor(Math.random() * 3);
  let phoneBuilder = collection[index];
  for (let i = 0; i < 7; i++) {
    let n = Math.floor(Math.random() * 9);
    phoneBuilder.concat(n);
  }
  return phoneBuilder;
};

let generateEmail = function(name) {
  let collection = [
    "@google.com",
    "@hotmail.com",
    "@live.com",
    "@abv.bg",
    "@mail.com",
    "@email.bg",
    "@freemail.com"
  ];

  let index = Math.floor(Math.random() * 7);
  return name + collection[index];
};

let generatePosition = function() {
  let collection = [
    "cashier",
    "accountant",
    "operator",
    "financial consultant"
  ];

  let index = Math.floor(Math.random() * 4);
  return collection[index];
};

let generateReportTo = function(name) {
  let collection = db.emplyees.find();
  let index = Math.floor(Math.random() * collection.count() - 1);
  let isReports = Math.round(Math.random());
  return isReports ? collection[index] : null;
};

let generateSalary = function() {
  return Math.floor(Math.random() * (6000 - 2000 + 1) + 2000);
};

let generateBirthCountry = function() {
  let collection = [
    "Bulgaria",
    "Ukraine",
    "Moldova",
    "Macedonia",
    "Spain",
    "Italy",
    "Germany"
  ];

  let index = Math.floor(Math.random() * 7);
  return collection[index];
};

let generateAccountName = function(currency) {
  let accountName;
  do {
    accountName = Math.floor(
      Math.random() * (700000000 - 30000000 + 1) + 30000000
    );
  } while (db.clients.find({ accounts: { name: accountName } }).count() > 0);
  return accountName;
};

let generateAccount = function() {
  let collection = ["BGN", "USD", "EUR"];
  let index = Math.floor(Math.random() * (3 - 1) + 1);
  let currency = collection[index];
  let accountName = generateAccountName(currency);
  return {
    name: accountName,
    currency: currency,
    balance: Math.floor(Math.random() * 700000)
  };
};

let randomDate = function(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

let generateHireDate = function() {
  return randomDate(new Date(2006, 0, 1), new Date());
};

let generateDivisionId = () => {
  let collection = db.divisions.find();
  let index = Math.floor(Math.random() * collection.count());
  return collection[index]._id;
};

// Seeding

let seed = function() {
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

  // employees
  for (let i = 0; i < 20; i++) {
    let fname = generateFname();
    let lname = generateLname();
    let sname = generateSname();
    let reportTo = generateReportTo();
    let division = generateDivisionId();
    db.employees.insert({
      fname: fname,
      lname: lname,
      address: generateAddress(),
      cellphone: generatePhone(),
      position: generatePosition(),
      salary: generateSalary(),
      birthCountry: generateBirthCountry(),
      hireDate: generateHireDate()
    });
    let currentEmployee = db.employees.find({
      $and: [{ fname: fname }, { lname: lname }]
    })[0];
    if (!!sname) {
      db.employees.update(
        { _id: currentEmployee._id },
        {
          sname: sname
        }
      );
    }
    if (!!reportTo) {
      db.employees.update(
        { _id: currentEmployee._id },
        {
          reportTo: reportTo
        }
      );
    }
  }

  // clients
  for (let i = 0; i < 50; i++) {
    let fname = generateFname();
    let lname = generateLname();
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
    let currentClient = db.clients.find({
      $and: [{ fname: fname }, { lname: lname }]
    })[0];
    if (!!sname) {
      db.clients.update(
        { _id: currentClient._id },
        {
          sname: sname
        }
      );
    }
  }
};

// ================== 1 ======================
// ------------------ 1 ----------------------

db.divisions.find().forEach(function() {
  print(e.name);
});

// ------------------ 2 ----------------------

db.employees.find().forEach(function() {
  print(e.fname + " " + e.lname + "\t" + e.salary);
});

// ------------------ 3 ----------------------
let generateEmployeeEmail = () => {
  db.employees.find().forEach(function(e) {
    db.employees.update(
      { _id: e._id },
      {
        email:
          e.fname.toLowerCase() + e.lname.toLowerCase() + "@bankoftomarow.bg"
      }
    );
  });
};

generateEmployeeEmail();

db.employees.find().forEach(function() {
  print(e.fname + " " + e.lname + "\t" + e.email);
});

// ------------------ 4 ----------------------

let date = new Date();
date.setFullYear(date.getFullYear() - 5);
db.employees.find({ hireDate: { $lt: date } }).pretty();

// ------------------ 5 ----------------------

db.employees.find({ fname: { $regex: /^S/ } }).pretty();

// ------------------ 6 ----------------------

db.employees.find({ birthCountry: { $ne: "Bulgaria" } }).pretty();

// ------------------ 7 ----------------------
db.employees
  .find({
    $or: [
      { fname: { $regex: /.*I.*/i } },
      { lname: { $regex: /.*I.*/i } },
      { sname: { $regex: /.*I.*/i } }
    ]
  })
  .pretty();

// ================== 2 ======================
// ------------------ 1 ----------------------
// ------------------ 2 ----------------------
// ------------------ 3 ----------------------

// ================== 3 ======================
// ------------------ 1 ----------------------
// ------------------ 2 ----------------------
// ------------------ 3 ----------------------

// ================== 4 ======================
// ------------------ 1 ----------------------
db.clients.find({ accounts: { currency: { $ne: "BGN" } } }).pretty();

// ------------------ 2 ----------------------
db.clients.find({ accounts: { balance: { $eq: 0 } } }).pretty();

// ------------------ 3 ----------------------
let changeAccountName = function() {
  [];
  db.clients.find().forEach(function(c) {
    for (let i = 0; i < c.accounts.length; i++) {
      let currency = c.accounts[i];
      db.clients.update(
        { $and: [{ _id: c._id }, { account }] },
        {
          $set: { "accounts.$.name": c.fname + c.lname + "account" + currency }
        },
        { multi: true }
      );
    }
  });
}.update(
  { _id: ObjectId("587e2be4411f058ab566d7dc") },
  { $set: { "body.viewed.main": true } },
  { multi: true }
);
