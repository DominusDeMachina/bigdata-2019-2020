db.clients.drop();
db.employees.drop();
db.divisions.drop();

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

  let index = Math.floor(Math.random() * collection.length);
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

  let index = Math.floor(Math.random() * collection.length);
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

  let index = Math.floor(Math.random() * collection.length);
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

  let index = Math.floor(Math.random() * collection.length);
  return collection[index];
};

let generatePhone = function() {
  let collection = ["089", "088", "087"];

  let index = Math.floor(Math.random() * collection.length);
  let phoneBuilder = collection[index];
  for (let i = 0; i < 7; i++) {
    let n = Math.floor(Math.random() * 9);
    phoneBuilder += n;
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

  let index = Math.floor(Math.random() * collection.length);
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
  let collection = db.employees.find().toArray();
  let index = Math.floor(Math.random() * collection.length);
  let isReports = Math.round(Math.random());
  return isReports ? collection[index]._id : null;
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

  let index = Math.floor(Math.random() * collection.length);
  return collection[index];
};

let generateAccountName = function(currency) {
  let accountName;
  do {
    accountName = Math.floor(
      Math.random() * (700000000 - 30000000 + 1) + 30000000
    );
  } while (db.clients.find({ accounts: { name: accountName } }).count() > 0);
  return "BG50" + accountName + currency;
};

let generateAccount = function() {
  let collection = ["BGN", "USD", "EUR"];
  let index = Math.floor(Math.random() * collection.length);
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
  let collection = db.divisions.find().toArray();
  let index = Math.floor(Math.random() * collection.length);
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
    db.employees.insert({
      fname: fname,
      lname: lname,
      address: generateAddress(),
      cellphone: generatePhone(),
      position: generatePosition(),
      salary: generateSalary(),
      birthCountry: generateBirthCountry(),
      hireDate: generateHireDate(),
      division: generateDivisionId()
    });
    if (!!sname) {
      db.employees.update(
        { fname: fname, $and: [{ lname: lname }] },
        { $set: { sname: sname } }
      );
    }
    if (!!reportTo) {
      db.employees.update(
        { fname: fname, $and: [{ lname: lname }] },
        { $set: { reportTo: reportTo } }
      );
    }
  }

  // clients
  for (let i = 0; i < 50; i++) {
    let fname = generateFname();
    let lname = generateLname();
    let sname = generateSname();
    let accounts = [];
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
      accounts.push(generateAccount());
    }
    db.clients.insert({
      fname: fname,
      lname: lname,
      address: generateAddress(),
      cellphone: generatePhone(),
      email: generateEmail(fname + lname),
      accounts: accounts
    });
    let currentClient = db.clients.find(
      { fname: fname },
      { $and: [{ lname: lname }] }
    );
    if (!!sname) {
      db.clients.update(
        { _id: currentClient._id },
        {
          $set: { sname: sname }
        }
      );
    }
  }
};

seed();

// ================== 1 ======================
// ------------------ 1 ----------------------

db.divisions.find().forEach(function(e) {
  print(e.name);
});

// ------------------ 2 ----------------------

db.employees.find().forEach(function(e) {
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
db.employees.find({
    $or: [
      { fname: { $regex: /.*I.*/i } },
      { lname: { $regex: /.*I.*/i } },
      { sname: { $regex: /.*I.*/i } }
    ]
  }).pretty();

// ================== 2 ======================
// ------------------ 1 ----------------------
// ------------------ 2 ----------------------
// ------------------ 3 ----------------------

// ================== 3 ======================
// ------------------ 1 ----------------------
// ------------------ 2 ----------------------
// ------------------ 3 ----------------------
// ------------------ 4 ----------------------
db.employees.find({ salary: { $gt: 2000, $lt: 3000 } })
// ------------------ 5 ----------------------
db.employees.find({ salary: { $in: [ 2500, 3000, 3500, 5000] }})
// ------------------ 6 ----------------------
db.employees.find({ reportTo: { $exists: false } })
// ------------------ 7 ----------------------
db.employees.find({ hireDate: { $lt: date }, $and: [{ salary: { $gt: 5000 } }] }).sort({ fname: -1 }).pretty();
// ------------------ 8 ----------------------
db.employees.aggregate([
  {
    $sort: {
      salary: -1
    }
  }
])
// ------------------ 9 ----------------------
// ------------------ 10 ----------------------

// ================== 4 ======================
// ------------------ 1 ----------------------
db.clients.find({ accounts: { currency: { $ne: "BGN" } } }).pretty();

// ------------------ 2 ----------------------
db.clients.find({ accounts: { balance: { $eq: 0 } } }).pretty();

// ------------------ 3 ----------------------
db.clients.update(
  {},
  [
    {
      $set: {
        accounts: {
          $map: {
            input: "$accounts",
            as: "acc",
            in: {
              name: "$$acc.currency",
              currency: "$$acc.currency",
              balance: "$$acc.balance"
            }
          }
        }
      }
    }
  ],
  { multi: true }
);
